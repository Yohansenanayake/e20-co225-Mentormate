import logging
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import SQLChatMessageHistory
from langchain.schema.output_parser import StrOutputParser
from langchain_core.messages import HumanMessage , AIMessage
from langchain.memory import ConversationBufferMemory
from chroma_retriver import ChromaRetrevier
from dotenv import load_dotenv

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

pdf_retriver = ChromaRetrevier(db_path="vectorDb", collection_name="PDFCollection")
print(pdf_retriver.collection.count())


#Global varibles to store short term chat history to rewrit the query
history = []

class mentorMate:
    """
    A class used to represent the MentorMate, a personalized tutor application.

    Attributes:
        user_input (str): The user's question or input.
        similarity_doc (str): The content document used for answering the user's question.
        user_name (str): The name of the user.
    """

    def __init__(self, user_input, user_name):
        """
        Initializes the mentorMate class with user input, similarity document, and user name.

        Args:
            user_input (str): The user's question or input.
            similarity_doc (str): The content document used for answering the user's question.
            user_name (str): The name of the user.
        """
        self.user_input = user_input
        
        self.user_name = user_name
        
        load_dotenv()
        

    def get_response(self):
        """
        Generates a response to the user's question based on the provided content and the user's previous interactions.

        The method sets up a chat template and initializes a chain with a language model (ChatGroq) and a message history.
        It then invokes the chain to get a response.

        Returns:
            str: The response generated by the language model.

        Raises:
            Exception: If an error occurs during the response generation.
        """
        try:
            llm = ChatGroq(temperature=0.2, max_tokens=3000, model="Llama3-8b-8192", streaming=True)
            system = """
            your are a helpful personal tutor. Your task is to answer questions about biology solely based on the content provided.
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

            query_rewrite_template = """Given a chat history and the latest user question 
            which might reference context in the chat history, formulate a standalone question 
            which can be understood without the chat history. Do NOT answer the question, 
            just reformulate it if needed and otherwise return it as it is. Try to keep the original question's meaning.
            only refomulate the question if it is necessary to understand it without the context of the chat history.
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

            history.append(HumanMessage(self.user_input))
            query_rewrite_humman_msg = history[0]

            query_rewrite_prompt = ChatPromptTemplate.from_template(query_rewrite_template)
            query_rewrite_chain = query_rewrite_prompt | llm | StrOutputParser()

            re_written_query = query_rewrite_chain.invoke(
                {"chat_history": history, "latest_user_question": self.user_input}
            )

            new_similarity_docs = pdf_retriver.query_documents(re_written_query)
            

            print("----------------------------------------------")
            print("Re-written query: ", re_written_query)
            print("----------------------------------------------")
            print("Similarity Docs: ", new_similarity_docs)

            chat_template = ChatPromptTemplate.from_messages([
                ("system", system),
                MessagesPlaceholder(variable_name="history"),
                ("human", "{question}")
            ])

            
            
            chain =  chat_template | llm | StrOutputParser()
           
            response = chain.invoke(
                {"question": self.user_input, "content": new_similarity_docs, "student_name": self.user_name , "history": history},
                
            )

            
            history.append(AIMessage(response))
            query_rewrite_AI_msg = history[1]

            if len(history) > 4:
                prev_humman_msg = history.pop(0)
                prev_AI_msg = history.pop(0)

            print()
            print("history: ", history)
            print("Query rewrite humman msg: ", query_rewrite_humman_msg)
            print("Query rewrite AI msg: ", query_rewrite_AI_msg)
            print()
            try:
                if prev_humman_msg:  # or you can use `if my_variable is not None:`
                
                    print("prev_humman_msg: ", prev_humman_msg) 

            except NameError:
                # Logic if the variable is not set
                print("Variable is not set.")

            print()

            return response
        
        except Exception as e:
            logger.error("An error occurred while getting response: %s", e)
            return "An error occurred. Please try again later."

    def clean_text(self, text):
        """
        Cleans the provided text by removing extra spaces and newline characters.

        Args:
            text (str): The text to be cleaned.

        Returns:
            str: The cleaned text.
        """
        text = text.replace('\n', ' ')
        text = ' '.join(text.split())
        return text
