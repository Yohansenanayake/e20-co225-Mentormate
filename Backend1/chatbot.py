from mentor_redis import mentorMate
from password_manager import PasswordManager
from persistant_chat_history_manager import ChatHistoryManager

class ChatBot:
    def __init__ (self,user_input,user_email):
        self.user_input = user_input
        self.user_email = user_email                                                               
        self.password_manager = PasswordManager()
        self.chat_history_manager = ChatHistoryManager(user_email=user_email)

    def generate_response(self):
        # Retrieve the chat history from Redis
        user_name = self.chat_history_manager.get_user_name()
        