from sqlalchemy.orm import sessionmaker
from db.database import get_session
from db.models import User, ChatThread, Message
from datetime import datetime, timedelta

class ChatHistoryManager:
    def __init__(self, user_email):
        self.user_email = user_email
        self.session = get_session()
        self.user = self.session.query(User).filter_by(email=user_email).first()
        if not self.user:
            raise ValueError("User not found")
        self.user_name = self.user.user_name

    def create_thread(self, title=None):
        new_thread = ChatThread(user_id=self.user.id, thread_title=title)
        self.session.add(new_thread)
        self.session.commit()
        return new_thread.id
    
    def get_latest_thread(self):
        # Retrieve the latest thread associated with the user, ordered by creation time
        latest_thread = self.session.query(ChatThread)\
            .filter_by(user_id=self.user.id)\
            .order_by(ChatThread.created_at.desc())\
            .first()
        
        return latest_thread

    def save_interaction(self, message_content, message_type , thread_id = None):
        if not thread_id:
            thread_id = self.create_thread() # Create a new thread if not provided explicitly

        new_message = Message(
            thread_id=thread_id,
            user_id=self.user.id,
            message_content=message_content,
            message_type=message_type
        )
        self.session.add(new_message)
        self.session.commit()

    def should_create_thread(self, thread_id=None):
        if thread_id:
            # Check the last message timestamp of the given thread
            last_message = self.session.query(Message).filter_by(thread_id=thread_id).order_by(Message.timestamp.desc()).first()
            if last_message:
                # Define a time threshold for creating a new thread (e.g., 1 hours)
                time_threshold = timedelta(hours=1)
                now = datetime.utcnow()
                if now - last_message.timestamp > time_threshold:
                    return True
        else:
            # No thread_id provided, assume a new thread should be created
            return True

        return False
    
    def create_thread_if_requested(self, manual_creation=False, title=None):
        if manual_creation:
            # Create a new thread as requested by the user
            return self.create_thread(title=title)
        else:
            # Otherwise, use the existing logic to determine if a new thread should be created
            all_threads = self.session.query(ChatThread).filter_by(user_id=self.user.id).all()
            if not all_threads or self.should_create_thread(thread_id=all_threads[-1].id):
                return self.create_thread(title='New Conversation')
            else:
                return all_threads[-1]  # Return the existing thread
            

    def get_chat_thread(self, thread_id):
        return self.session.query(Message).filter_by(thread_id=thread_id).order_by(Message.timestamp).all()

    def get_all_threads(self):
        return self.session.query(ChatThread).filter_by(user_id=self.user.id).all()

    def get_recent_interactions(self, thread_id, limit=4):
        return self.session.query(Message).filter_by(thread_id=thread_id).order_by(Message.timestamp.desc()).limit(limit).all()
    
    def get_user_name(self):
        return self.session.query(User).filter_by(email=self.user_email).first().user_name
    
    def get_user_id(self):
        return self.session.query(User).filter_by(email=self.user_email).first().id

    def close(self):
        self.session.close()
