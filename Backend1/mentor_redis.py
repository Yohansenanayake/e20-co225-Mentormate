import logging
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import SQLChatMessageHistory
from langchain.schema.output_parser import StrOutputParser
from langchain_core.messages import HumanMessage, AIMessage
from langchain.memory import ConversationBufferMemory
from chroma_retriver import ChromaRetrevier
import redis
from persistant_chat_history_manager import ChatHistoryManager
from langchain.output_parsers import StructuredOutputParser, ResponseSchema
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv

# Configure Redis for message caching (chat history)
r = redis.StrictRedis(host='localhost', port=6379, db=0, decode_responses=True)

# Redis key prefix for chat history caching
CHAT_HISTORY_KEY_PREFIX = "chat_history:"


class mentorMate:
    """
    A class to manage interactions and responses for a conversational AI system. It handles user input, maintains chat history,
    and generates responses based on the chat history and context.

    Attributes:
        user_input (str): The user's input or question.
        user_email (str): The email of the user whose chat history is managed.
        redis_key (str): Redis key for caching chat history.
        chat_history_manager (ChatHistoryManager): Manager for handling chat history.
        user_name (str): The name of the user.
    
    Methods:
        get_response():
            Processes user input, manages chat history, rewrites queries, retrieves similar documents, and generates a response.
        
        rewrite_query(history):
            Reformulates the latest user question based on the chat history.
        
        generate_response(history, new_similarity_docs):
            Generates a response to the user's question using the chat history and retrieved documents.
        
        update_chat_history(history):
            Updates the chat history in Redis, keeping only the last 4 interactions.
        
        clean_text(text):
            Cleans up and formats text by removing extra whitespace and new lines.
        
        get_thread():
            Retrieves the full chat thread for the current user.
        
        is_topic_changed(history, new_user_question):
            Determines if the topic of the conversation has changed and provides a suitable title for the new topic.
    """

    def __init__(self, user_email,user_input = None ):
        """
        Initializes the mentorMate instance with user input and email. Sets up chat history management and environment variables.
        
        :param user_input: The user's input or question.
        :param user_email: The email of the user whose chat history is managed.
        """
        self.user_input = user_input if user_input is not None else ""
        self.user_email = user_email
        self.redis_key = f"{CHAT_HISTORY_KEY_PREFIX}{user_email}"
        self.chat_history_manager = ChatHistoryManager(user_email=user_email)
        self.user_name = self.chat_history_manager.user_name
        load_dotenv()

    def get_response(self):
        """
        Processes the user's input by retrieving chat history, determining if a new thread is needed, and generating a response.
        
        :return: The generated response based on the user's input and chat history.
        """
        try:
            # Retrieve the chat history from Redis
            history = r.lrange(self.redis_key, -4, -1)

            print("-------------------------------------------------------")
            print("Chat History retrived:", history)
            print("-------------------------------------------------------")
            
            # Format the history into alternating HumanMessage and AIMessage
            formatted_history = []
            for i, msg in enumerate(history):
                if i % 2 == 0:  # Even index: HumanMessage
                    formatted_history.append(HumanMessage(content=msg))
                else:  # Odd index: AIMessage
                    formatted_history.append(AIMessage(content=msg))

            # Check if the topic has changed
            topic_changed_dict = self.is_topic_changed(history=formatted_history, new_user_question=self.user_input)

            print("-------------------------------------------------------")
            print("Topic Changed Dict:", topic_changed_dict)
            print("-------------------------------------------------------")

            # If the topic has changed, create a new thread or if this is a new conversation
            if topic_changed_dict["topic_changed"] or topic_changed_dict["new_conversation"]:
                # Create a new thread in the chat history
                new_thread = self.chat_history_manager.create_thread(title=topic_changed_dict["new_topic_title"])
                # Add the current user input to the chat history
                formatted_history.append(HumanMessage(self.user_input))
                # Save the current user input to MySQL
                self.chat_history_manager.save_interaction(message_content=self.user_input, message_type="human", thread_id=new_thread)
            
            # No change in topic, use the existing thread
            else:
                # Add the current user input to the chat history
                formatted_history.append(HumanMessage(self.user_input))
                print("formatted_history:", formatted_history)

                # Getting the latest thread
                latest_thread = self.chat_history_manager.get_latest_thread()

                # Save the current user input to MySQL in the latest thread
                self.chat_history_manager.save_interaction(message_content=self.user_input, message_type="human", thread_id=latest_thread.id)        

            # Rewriting the query based on chat history
            re_written_query = self.rewrite_query(formatted_history)

            print("-------------------------------------------------------")
            print("Re-written Query:", re_written_query)
            print("-------------------------------------------------------")

            # Retrieve similar documents using the rewritten query
            pdf_retriever = ChromaRetrevier(db_path="vectorDb", collection_name="PDFCollection")
            print(pdf_retriever.collection.count())
            new_similarity_docs = pdf_retriever.query_documents(re_written_query)

            print("Similarity Docs:", new_similarity_docs)

            # Get the bot's response using the updated chat history and new documents
            print("-------------------------------------------------------")      

            response = self.generate_response(formatted_history, new_similarity_docs)

            if topic_changed_dict["topic_changed"] or topic_changed_dict["new_conversation"]:
                # Add the bot's response to the chat history
                formatted_history.append(AIMessage(response))
                # Save the bot's response to MySQL with the new thread
                self.chat_history_manager.save_interaction(message_content=response, message_type="ai", thread_id=new_thread)

            # No change in topic, use the existing thread
            else:
                # Add the bot's response to the chat history
                formatted_history.append(AIMessage(response))

                latest_thread_ai = self.chat_history_manager.get_latest_thread()

                # Save the bot's response to MySQL in the latest thread
                self.chat_history_manager.save_interaction(message_content=response, message_type="ai", thread_id=latest_thread_ai.id)

            print("Chat History after response:", formatted_history)
            print("-------------------------------------------------------")

            # Update the chat history in Redis - cache the last 4 interactions
            self.update_chat_history(history=formatted_history, redis_key=self.redis_key)

            print("Chat History updated in Redis:", formatted_history)
            print("-------------------------------------------------------")
            
            return response
        
        except Exception as e:
            print(f"An error occurred: {e}")
            return "An error occurred. Please try again later."
        
        finally:
            self.chat_history_manager.close()

    def rewrite_query(self, history):
        """
        Reformulates the latest user question based on the chat history.
        
        :param history: The formatted chat history.
        :return: The reformulated question to be used for document retrieval.
        """
        llm = ChatGroq(temperature=0.4, max_tokens=3000, model="Llama3-8b-8192", streaming=True)

        query_rewrite_template = """Given a chat history and the latest user question 
            which might reference context in the chat history, formulate a standalone question 
            which can be understood without the chat history. Do NOT answer the question, 
            just reformulate it if needed and otherwise return it as it is. Try to keep the original question's meaning.
            only reformulate the question if it is necessary to understand it without the context of the chat history.
            finally, this reformulated question will be used to search for similar content in a vector database.

            Refer to the following example for more clarity: 
            chat history: [HumanMessage(content='tell me about protein'), AIMessage(content="**Proteins**\n\nProteins are complex biomolecules that play a crucial role in various cellular processes. According to the content, proteins are made up of amino acids, which are the building blocks of proteins. There are 20 different amino acids involved in the formation of proteins, and each amino acid has a unique structure)]
            latest user question: "what are the importances if it"
            reformulated question: "what are the importances of proteins?"
            End of example.
            
            chat history: {chat_history}
            latest user question: {latest_user_question}
            only output the reformulated question as the response. nothing else.
            """
        query_rewrite_prompt = ChatPromptTemplate.from_template(query_rewrite_template)
        query_rewrite_chain = query_rewrite_prompt | llm | StrOutputParser()
        return query_rewrite_chain.invoke({"chat_history": history, "latest_user_question": self.user_input})

    def generate_response(self, history, new_similarity_docs):
        """
        Generates a response to the user's question using the chat history and retrieved documents.
        
        :param history: The formatted chat history.
        :param new_similarity_docs: The documents retrieved based on the rewritten query.
        :return: The generated response.
        """
        llm = ChatGroq(temperature=0.2, max_tokens=3000, model="llama-3.1-8b-instant", streaming=True)
        system = """
            you are a helpful personal tutor. Your task is to answer questions about biology solely based on the content provided.
            Your scope is limited to the content provided. You're answering to an advanced level high school student.
            Answer solely using the following content: {content}
            Only use the factual information from the content to answer the question. Never answer outside of the content. Do not add any new information outside the content. Never reference from outside sources.
            If you feel like you don't have enough information to answer, say "I don't have enough information to answer this question."
            Your answer should be detailed and informative. First give a short answer using 2-3 sentences, then provide more details and explanations.
            Always refer to the content provided when answering questions. This content is your primary knowledge base.
            You're supposed to consider previous interactions with the user when answering questions. Be personalized and engaging.
            Name of the student: {student_name}

            **Instructions for Formatting:**
            - Mainly use paragraphs in your response.
            - Paragraphs should be detailed and informative.
            - Use bullet points for lists where appropriate.
            - Use numbers for ordered steps.
            - Highlight key points in **bold**.
            - Use headings to organize the content.
            """
        chat_template = ChatPromptTemplate.from_messages([
            ("system", system),
            MessagesPlaceholder(variable_name="history"),
            ("human", "{question}")
        ])

        chain = chat_template | llm | StrOutputParser()

        return chain.invoke({
            "question": self.user_input, 
            "content": new_similarity_docs, 
            "student_name": self.user_name, 
            "history": history
        })

    def update_chat_history(self, history,redis_key,K=4):
        """
        Updates the chat history in Redis, keeping only the last K(4) interactions.
        
        :param history: The formatted chat history to be stored.
        """
        # Convert history to string format to store in Redis
        r.delete(redis_key)  # Clear old history
        for message in history[-K:]:  # Keep only the last K(4) interactions
            r.rpush(redis_key, message.content)

    def clean_text(self, text):
        """
        Cleans up and formats text by removing extra whitespace and new lines.
        
        :param text: The text to be cleaned.
        :return: The cleaned text.
        """
        text = text.replace('\n', ' ')
        text = ' '.join(text.split())
        return text

    def get_thread(self):
        """
        Retrieves the full chat thread for the current user.
        
        :return: The full chat thread.
        """
        return self.chat_history_manager.get_chat_thread()
    
    def is_topic_changed(self, history, new_user_question):
        """
        Determines if the topic of the conversation has changed and provides a suitable title for the new topic.
        
        :param history: The formatted chat history.
        :param new_user_question: The latest user question.
        :return: A dictionary indicating if the topic has changed, if this is a new conversation, and the titles for the new and old topics.
        """
        try:
            llm = ChatGroq(temperature=0.6, max_tokens=3000, model="Llama3-8b-8192", streaming=True)

            response_schemas = [
                ResponseSchema(name="topic_changed", type="boolean", description="a boolean value indicating if the topic has changed or not."),
                ResponseSchema(name="new_conversation", type="boolean", description="a boolean value indicating if this is a new conversation or not."),
                ResponseSchema(name="new_topic_title", type="string", description="a string value indicating the title of the new topic of the conversation if the topic_changed is True or new_conversation is True. Otherwise, it should be None."),
                ResponseSchema(name="Summary_topic_title", type="string", description="a string value indicating the title of the old topic of the conversation if the topic_changed is True. Otherwise, it should be None.")
            ]

            output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
            format_instructions = output_parser.get_format_instructions()

            detect_topic_change_template = """Given a chat history, determine if the topic of the conversation has changed. Do not consider minor deviations from the topic. If the topic and new user question can be put into one section of biology, then treat as the topic not changed. You can use the chat history to determine if the topic has changed. If the topic has changed, also create a suitable title for the new topic of the conversation by considering the new user question. Think ahead what the user might ask following the new user question and create a new topic suitable. If the chat history is empty and only the new user question is present, assume this is a new conversation and create a suitable title for the new topic of the conversation by thinking ahead what the user might ask following the new user question. You also need to create a summary topic title which will summarize solely the chat history in the event of a topic change detected. This summary topic should be descriptive and should be able to summarize the old conversation. Do not provide any Python code or any other code to solve the problem. Only provide the response in the format mentioned below. Do not output any reasoning or explanation. Only output the requested JSON Object in the response.
                new user question: {new_user_question}
                chat history: {chat_history} 

                format instructions: {format_instructions}
                """
            
            prompt = PromptTemplate(
                template=detect_topic_change_template,
                input_variables=["chat_history"],
                partial_variables={"format_instructions": format_instructions}
            )
            chain = prompt | llm | output_parser
            response = chain.invoke({"chat_history": history, "new_user_question": new_user_question})
            return response
        except Exception as e:
            print(f"Topic changed detection error occurred: {e}")
            logging.error(f"Topic changed detection error occurred: {e}")

            return {"topic_changed": False, "new_conversation": False, "new_topic_title": None, "Summary_topic_title": None}
        

    def review_question(self , unit_question,unit_no,question_no ,student_answer=None,sample_answer=None):
        try:
            student_answer = student_answer if student_answer is not None else ""
            sample_answer = sample_answer if sample_answer is not None else ""
            student_name = self.user_name
            print("student_name",student_name)


            # retrive chat history for the specific user , specific unit and specific question
            UNIT_QUESTIONS_CHAT_HISTORY_KEY = f"unit_questions_chat_history:{unit_no}:{question_no}:{self.user_email}"
            history = r.lrange(UNIT_QUESTIONS_CHAT_HISTORY_KEY, -4, -1)

            print("-------------------------------------------------------")
            print("Chat History retrived:", history)
            print("-------------------------------------------------------")
                
            # Format the history into alternating HumanMessage and AIMessage
            formatted_history = []
            for i, msg in enumerate(history):
                if i % 2 == 0:  # Even index: HumanMessage
                    formatted_history.append(HumanMessage(content=msg))
                else:  # Odd index: AIMessage
                    formatted_history.append(AIMessage(content=msg))

            # Add student's answer to the chat history
            print("formatted_history:", formatted_history)
            formatted_history.append(HumanMessage(student_answer))
            print("formatted_history_after_student_answer:", formatted_history)

            # generating response for the user question
            llm = ChatGroq(temperature=0.2, max_tokens=3000, model="llama-3.1-8b-instant", streaming=True)
        # llm = ChatGroq(temperature=0.3, max_tokens=3000, model="Llama3-8b-8192", streaming=True)

            # Retrieve similar documents using the rewritten query
            pdf_retriever = ChromaRetrevier(db_path="vectorDb", collection_name="PDFCollection")

            if unit_question:
                reviewing_content = pdf_retriever.query_documents(unit_question)
                print('reviewing conetent',reviewing_content)
            else:
                reviewing_content = ""

            content = f"Reference Answer : {sample_answer}. Relevant Content from curriculum: {reviewing_content}"

            system = """
    You are a helpful personal tutor assisting your student with unit-based questions from their Biology curriculum. Your task is to review the student's answer and provide personalized, detailed feedback, helping them understand the concepts better. Use the student's name to make your feedback more engaging and encouraging.

    Task:
    1)If the student has answered the question, assess their response.
    1.1)If the answer is correct, provide positive feedback and reinforce their understanding.
    1.2)If the answer can be improved, offer constructive feedback, explain the concept in detail, and fill in any missing information.
    1.3)If the answer is incorrect, give the correct answer, explain why it is correct, and guide the student through the reasoning process.
    2)If the student has not answered the question, begin your response with "The question is about..." and then provide a detailed explanation and answer using the relevant content. Address the student by name to make the response more personal and encouraging.

    Input Variables:
    Student's Name: {student_name}
    Has the student answered the question?: {is_student_answered}
    Student's Answer: {student_answer}
    Unit Question: {unit_question}
    Relevant Content: {Task1_content}

    Guidelines for Reviewing:
    Always refer to the relevant content when reviewing the student's answer.
    Ensure your feedback is personalized, detailed, and informative.
    For correct answers, provide encouragement and reinforce key points.
    For partial answers, clarify concepts, address gaps, and expand explanations.
    For incorrect answers, provide the correct response, explain the underlying concepts, and guide the student through understanding.

    Formatting Instructions:
    Use paragraphs for detailed explanations.
    Use bullet points for lists where appropriate.
    Use numbers for ordered steps.
    Highlight key points with bold text.
    Use headings to organize feedback clearly.
    Use personal headings, use pronouns in headings where necessary.
    Include the student's name throughout your feedback to make it personal.
                """

            chat_template = ChatPromptTemplate.from_messages([
                ("system", system),
    ])
            chain = chat_template | llm | StrOutputParser()

            response =  chain.invoke({   
                "Task1_content": content,
                "student_answer": student_answer,
                "unit_question": unit_question,
                "is_student_answered": bool(student_answer),
                "student_name": student_name
            })

            # Add bot response to the chat history
            formatted_history.append(AIMessage(response))

            self.update_chat_history(history=formatted_history, redis_key=UNIT_QUESTIONS_CHAT_HISTORY_KEY)
            print("-------------------------------------------------------")
            print("Chat History updated in Redis:", formatted_history)
            print("-------------------------------------------------------")
            
            print("Response: ", response)
            return response
        
        except Exception as e:
            print(f"An error occurred: {e}")
            return "An error occurred. Please try again later."
        


    def answer_student_unit_question(self,unit_no,question_no):
        try:
            student_question = self.user_input
            UNIT_QUESTIONS_CHAT_HISTORY_KEY = f"unit_questions_chat_history:{unit_no}:{question_no}:{self.user_email}"
            history = r.lrange(UNIT_QUESTIONS_CHAT_HISTORY_KEY, -4, -1)

            print("-------------------------------------------------------")
            print("Chat History retrived:", history)
            print("-------------------------------------------------------")
                    
            # Format the history into alternating HumanMessage and AIMessage
            formatted_history = []
            for i, msg in enumerate(history):
                if i % 2 == 0:  # Even index: HumanMessage
                    formatted_history.append(HumanMessage(content=msg))
                else:  # Odd index: AIMessage
                    formatted_history.append(AIMessage(content=msg))

            print("formatted_history:", formatted_history)
            
            llm = ChatGroq(temperature=0.2, max_tokens=3000, model="llama-3.1-8b-instant", streaming=True)

            # Rewriting the query based on chat history
            re_written_query = self.rewrite_query(formatted_history)


            print("-------------------------------------------------------")
            print("Re-written Query:", re_written_query)
            print("-------------------------------------------------------")

            # Retrieve similar documents using the rewritten query
            pdf_retriever = ChromaRetrevier(db_path="vectorDb", collection_name="PDFCollection")
            new_similarity_docs = pdf_retriever.query_documents(re_written_query)
            print("Similarity Docs:", new_similarity_docs)

            response = self.generate_response(formatted_history, new_similarity_docs)
            print("Response: ", response)

            formatted_history.append(AIMessage(response))
            self.update_chat_history(history=formatted_history, redis_key=UNIT_QUESTIONS_CHAT_HISTORY_KEY)
            print("-------------------------------------------------------")
            print("Chat History updated in Redis:", formatted_history)

            return response
        
        except Exception as e:
            print(f"An error occurred: {e}")
            return "An error occurred. Please try again later."
        

    def grade_student_answers(self,student_answer,question,reference_answer):

        try:
            llm = ChatGroq(temperature=0.2, max_tokens=3000, model="llama-3.1-8b-instant", streaming=True)
            template = """
    You are a knowledgeable tutor tasked with evaluating student answers for structured-type questions on biology. You will be given the question, student's answer, a reference answer, and relevant content from the curriculum. Your task is to assess the student's answer based on the following criteria:

    1)Accuracy: Check if the student's core response matches the reference answer. Do not penalize for any additional correct details.

    2)Relevance: Ensure the student directly answers the question. Additional relevant information is allowed, but the core response must be clear.

    3)Completeness: Determine whether the student has provided the key points expected in the answer.

    3.1)For point-form answers, check if the main points are listed. If the relevant content from curriculum has more ponits than what is expected in the original question, do not penalize the student for not including all the points from the curriculum.
    3.2)For short sentence answers, check if the core idea is fully covered.

    4)Clarity: Assess if the essential response is easy to understand. Ignore minor clarity issues caused by extra details.

    5)Use of Terminology: Check if the student has used the correct terms related to the subject matter.

    6)Consistency with Curriculum: Ensure the student's answer aligns with the concepts and terms from the curriculum provided.

    While you should focus on the core aspects of the student's answer, do not penalize for additional correct information. Provide a score (between 100 and 0) based on the overall correctness of the response and a brief explanation for the grade.The formating instructions for your response will be given.
    Refer to the following example scenarios.
    Example Scenarios:
    //Start of Example Scenarios //
    Example Scenario 1: Definition-Type Answer

    Question: "What is adaptation?"
    Reference Answer: "Structural, physiological, and behavioral changes that support the survival and reproduction of an organism in accordance with the specific environment in which it lives."
    Student Answer: "Adaptation is changes that help organisms survive and reproduce in their environment."

    Evaluation:
    Accuracy: The student's answer is mostly correct but lacks the specific types of changes (structural, physiological, and behavioral).
    Relevance: The answer addresses the question but is missing some key details.
    Completeness: The response is incomplete since it doesn't specify the types of changes (structural, physiological, behavioral).
    Clarity: The answer is clear and understandable.
    Use of Terminology: The student correctly uses the term "adaptation" but omits the more specific terminology.
    Consistency with Curriculum: The answer aligns with the curriculum but is missing expected details.

    Score: 75
    Explanation: The answer is accurate but not as detailed as the reference answer, particularly regarding the types of changes involved in adaptation.

    Example Scenario 2: Single-Fact Answer

    Question: "What percentage of the human body is made up of the four main elements?"
    Reference Answer: "96.3% (C, H, O, N)."
    Student Answer: "96.3%."

    Evaluation:
    Accuracy: The student's answer is fully accurate.
    Relevance: The answer directly addresses the question.
    Completeness: The student gives the correct percentage but omits the element names.
    Clarity: The answer is clear and concise.
    Use of Terminology: The student doesn’t mention "C, H, O, N" but gives the exact percentage.
    Consistency with Curriculum: The answer is consistent with the curriculum content.

    Score: 90
    Explanation: The student's answer is accurate but would be complete with the mention of the elements involved (C, H, O, N).

    Example Scenario 3: Point-Form Answer

    Question: "What are some examples of monosaccharides based on carbon atoms?"
    Reference Answer:"3C - Triose (e.g., glyceraldehyde) (Phosphoglyceraldehyde is a derivative of Triose), 4C - Tetroses (e.g., Erythrose) (rare in nature), 5C - Pentoses (e.g., ribose, deoxyribose, ribulose) (RUBP is a derivative of ribulose), 6C - Hexoses (e.g., glucose, fructose, galactose)."
    Student Answer:"3C - Triose, 5C - Pentoses, 6C - Hexoses."

    Evaluation:
    Accuracy: The student's answer is partially accurate but omits examples and the 4C category.
    Relevance: The answer is relevant to the question, though it lacks detail.
    Completeness: The answer is incomplete because it misses the 4C example and specific examples for each category.
    Clarity: The answer is clear, but more detail is expected.
    Use of Terminology: The terminology is used correctly but is incomplete.
    Consistency with Curriculum: The answer aligns with the curriculum but omits key details.

    Score: 70
    Explanation: The student's answer provides some correct points but lacks completeness and specific examples that are expected in the reference answer.

    Example Scenario 4: Short-Answer with Multiple Figures

    Question: "Who were the key figures in developing the Cell Theory?"
    Reference Answer:"Robert Hooke (1665): First used the term 'cell' to describe the basic units of cork, Anton van Leeuwenhoek (1650): First observed and described living single-celled organisms like Euglena and bacteria, Matthias Schleiden (1831): Concluded that all plants are made up of cells, Theodore Schwann (1839): Concluded that animal tissues are also made up of cells, Rudolf Virchow (1855): Demonstrated that all cells arise from preexisting cells."
    Student Answer:"Hooke discovered cells, Schwann worked on animals, Virchow showed cells come from other cells."

    Evaluation:
    Accuracy: The answer is accurate but lacks details and omits other key figures like Anton van Leeuwenhoek and Matthias Schleiden.
    Relevance: The answer is relevant and includes some important points.
    Completeness: The answer is incomplete since it only mentions three figures and lacks detailed descriptions.
    Clarity: The answer is clear, though brief.
    Use of Terminology: The terminology is appropriate but minimal.
    Consistency with Curriculum: The response is aligned with the curriculum, but key information is missing.

    Score: 60
    Explanation: The student included some key figures but omitted two major contributors and provided minimal details. More elaboration is required.

    Example Scenario 5: Full Marks Answer

    Question: "What is the main principle of artificial classification?"
    Reference Answer: "Grouping based on a few easily observable features, regardless of evolutionary relationships."
    Student Answer: "Artificial classification groups organisms based on a few easily observable features, without considering their evolutionary relationships."

    Evaluation:
    Accuracy: The student's answer perfectly matches the reference answer.
    Relevance: The answer is directly relevant to the question.
    Completeness: The student's answer is complete and covers the key aspects of artificial classification.
    Clarity: The answer is clear and easy to understand.
    Use of Terminology: The student correctly uses the terms "artificial classification," "observable features," and "evolutionary relationships."
    Consistency with Curriculum: The answer fully aligns with the curriculum content on artificial classification.

    Score: 100
    Explanation: The student's answer is fully accurate, relevant, and complete. It demonstrates a clear understanding of the concept without any missing information or errors, deserving full marks.

    Example Scenario 6: Point-Form Answer Expecting Multiple Points.

    Question: "Describe three methods for sustainable food production based on biological knowledge."
    Reference Answer:"1. Production of disease-resistant plant and animal varieties. 2. Crop rotation to maintain soil fertility. 3. Use of biological pest control."
    Student Answer: "Disease-resistant crops."

    Evaluation:
    Accuracy: The student's answer, "disease-resistant crops," partially matches the reference answer, which includes "Production of disease-resistant plant and animal varieties." However, it only covers one part of the full answer.
    Relevance: The student's answer directly addresses the question, which asks for methods of sustainable food production. The method mentioned is relevant, but only partially fulfills the question's requirement for three methods.
    Completeness: The student's answer is incomplete as it only mentions one method instead of the three expected. The missing methods are "crop rotation" and "use of biological pest control."
    Clarity: The student's answer is clear and easy to understand, despite being incomplete.
    Use of Terminology: The student has correctly used the term "disease-resistant crops," which is relevant to the subject matter.
    Consistency with Curriculum: The student's answer is consistent with the curriculum, which covers the concept of producing disease-resistant crops. However, the missing methods (crop rotation and biological pest control) are also part of the curriculum and should have been included.

    Score: 30
    Explanation: The student's answer is accurate and relevant but incomplete, as it mentions only one out of three expected methods. While the clarity and terminology are good, the missing methods significantly impact the completeness of the answer. Given that only one out of three required points was provided, the score is reduced to 30%. 
    
    Example Scenario 7: Full Marks Answer 

    Question: "Mention three methods that can be used based on biological knowledge for sustainable food production."
    Reference Answer:"Production of high-yielding plant and animal varieties, Production of disease-resistant plant and animal varieties, Development of post-harvest technology."
    Student Answer:"Creating plant and animal breeds that produce higher yields ,Breeding crops and animals that are resistant to diseases, Improving methods to handle and store crops after they are harvested."
    Evaluation:
    Accuracy: The student's answer is accurate and covers all three methods with different wording.
    Relevance: The student's response directly addresses the question, providing the expected three methods for sustainable food production.
    Completeness: The student provides all three methods, as the question asks for, without any omissions.
    Clarity: The answer is clear and easy to understand, even though it uses different terminology.
    Use of Terminology: The student uses appropriate terms like "higher yields," "disease-resistant," and "handle and store crops," which convey the same meaning as the reference terms.
    Consistency with Curriculum: The response fully aligns with the curriculum content, despite the rephrasing.
    
    Score: 100
    Explanation: The student provided three methods, which the question asked for, and all three methods are correct. Although the student rephrased the reference answer, the meaning remains the same. The answer is complete, accurate, and clearly demonstrates an understanding of the key concepts and methods for sustainable food production, deserving full marks.
    //End of Example scenarios//

    Inputs:
    question: "{question}."
    Student's Answer: "{student_answer}."
    Reference Answer: "{reference_answer}."
    Curriculum Content: {content}

    Refer to these formating instructions:
    format_instructions : {format_instructions}

    """

            response_schemas = [
                ResponseSchema(name='score',type='string',description="Final score for the student's answer,"),
                ResponseSchema(name='Explanation' , type='string',description="Explanation for the studnet's score,"),
                ResponseSchema(name='Reasoning' , type='string',description="Your reasoning and evaluation details for the student's answer.")
            ]
            output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
            format_instructions = output_parser.get_format_instructions()
            # Retrieve similar documents using the rewritten query
            pdf_retriever = ChromaRetrevier(db_path="vectorDb", collection_name="PDFCollection")
            content = pdf_retriever.query_documents(question)

            #chat_template = ChatPromptTemplate.from_template(template)
            #chain = chat_template | llm | StrOutputParser()

            prompt = PromptTemplate(
                template=template,
                input_variables=["student_answer","reference_answer","content","question"],
                partial_variables={"format_instructions":format_instructions}
            )

            chain = prompt | llm | output_parser

            response = chain.invoke({
                "student_answer":student_answer,
                "reference_answer":reference_answer,
                "content": content,
                "question":question
            
            })

            return response
        except Exception as e:
            print(f"An error occurred: {e}")
            return {'score':'Error Occured','Explanation':'An internal error occured during grading. please try again later','Reasoning':'Error occured'}

            






