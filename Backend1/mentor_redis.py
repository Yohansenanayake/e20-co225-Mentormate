import logging
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import SQLChatMessageHistory
from langchain.schema.output_parser import StrOutputParser
from langchain_core.messages import HumanMessage , AIMessage
from langchain.memory import ConversationBufferMemory
from chroma_retriver import ChromaRetrevier
import redis
from persistant_chat_history_manager import ChatHistoryManager
from dotenv import load_dotenv

# Configure Redis for message caching (chat history)
r = redis.StrictRedis(host='localhost', port=6379, db=0, decode_responses=True)

# Redis key prefix for chat history caching
CHAT_HISTORY_KEY_PREFIX = "chat_history:"

class mentorMate:
    def __init__(self, user_input, user_name):
        self.user_input = user_input
        self.user_name = user_name
        self.redis_key = f"{CHAT_HISTORY_KEY_PREFIX}{user_name}"
        self.chat_history_manager = ChatHistoryManager(user_name=user_name)
        load_dotenv()

    def get_response(self):
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

            # Add the current user input to the chat history
            formatted_history.append(HumanMessage(self.user_input))
            print("formatted_history:", formatted_history)

            # Save the current user input to MySQL
            self.chat_history_manager.save_interaction(self.user_input, message_type="human")

            # Rewriting the query based on chat history
            re_written_query = self.rewrite_query(formatted_history)
            print("-------------------------------------------------------")
            print("Re-written Query:", re_written_query)
            print("-------------------------------------------------------")

            # Retrieve similar documents using the rewritten query
            pdf_retriver = ChromaRetrevier(db_path="vectorDb", collection_name="PDFCollection")
            new_similarity_docs = pdf_retriver.query_documents(re_written_query)
            print("Similarity Docs:", new_similarity_docs)

            # Get the bot's response using the updated chat history and new documents
            print("-------------------------------------------------------")         
            response = self.generate_response(formatted_history, new_similarity_docs)

            # Add the bot's response to the chat history
            formatted_history.append(AIMessage(response))

            # Save the bot's response to MySQL
            self.chat_history_manager.save_interaction(response, message_type="ai")

            print("Chat History after response:", formatted_history)
            print("-------------------------------------------------------")

            # Update the chat history in Redis
            self.update_chat_history(formatted_history)
            print("Chat History updated in Redis:", formatted_history)
            print("-------------------------------------------------------")
            

            return response
        
        except Exception as e:
            print(f"An error occurred: {e}")
            return "An error occurred. Please try again later."
        
        finally:
            self.chat_history_manager.close()

    def rewrite_query(self, history):
        llm = ChatGroq(temperature=0.4, max_tokens=3000, model="Llama3-8b-8192", streaming=True)

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
        query_rewrite_prompt = ChatPromptTemplate.from_template(query_rewrite_template)
        query_rewrite_chain = query_rewrite_prompt | llm | StrOutputParser()
        return query_rewrite_chain.invoke({"chat_history": history, "latest_user_question": self.user_input})

    def generate_response(self, history, new_similarity_docs):

        llm = ChatGroq(temperature=0.2, max_tokens=100, model="Llama3-8b-8192", streaming=True)
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

    def update_chat_history(self, history):
        # Convert history to string format to store in Redis
        r.delete(self.redis_key)  # Clear old history
        for message in history[-4:]:  # Keep only the last 4 interactions
            r.rpush(self.redis_key, message.content)

    def clean_text(self, text):
        text = text.replace('\n', ' ')
        text = ' '.join(text.split())
        return text

    def get_thread(self):
        #return thr full chat thread
        return self.chat_history_manager.get_chat_thread()
    