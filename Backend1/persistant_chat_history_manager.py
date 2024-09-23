from sqlalchemy.orm import sessionmaker
from db.database import get_session
from db.models import User, ChatThread, Message
from datetime import datetime, timedelta

class ChatHistoryManager:
    """
    A class for managing chat history for a specific user. This includes creating and retrieving chat threads,
    saving interactions, and determining whether new threads should be created based on user activity.

    Attributes:
        user_email (str): The email of the user whose chat history is managed.
        session (Session): SQLAlchemy session for interacting with the database.
        user (User): The User object associated with the provided email.
        user_name (str): The name of the user associated with the provided email.

    Methods:
        create_thread(title=None):
            Creates a new chat thread for the user with an optional title.

        get_latest_thread():
            Retrieves the latest chat thread for the user, ordered by creation time.

        save_interaction(message_content, message_type, thread_id=None):
            Saves a new message to the specified thread or creates a new thread if none is specified.

        should_create_thread(thread_id=None):
            Determines whether a new chat thread should be created based on the timestamp of the last message.

        create_thread_if_requested(manual_creation=False, title=None):
            Creates a new thread either manually or based on existing logic if no explicit request is made.

        get_chat_thread(thread_id):
            Retrieves all messages for a specific chat thread, ordered by timestamp.

        get_all_threads():
            Retrieves all chat threads for the user.

        get_recent_interactions(thread_id, limit=4):
            Retrieves recent interactions (messages) for a specific chat thread, limited to a specified number.

        get_user_name():
            Retrieves the user's name based on the email provided.

        get_user_id():
            Retrieves the user's ID based on the email provided.

        close():
            Closes the database session.
    """

    def __init__(self, user_email):
        """
        Initializes the ChatHistoryManager for the specified user.
        
        :param user_email: The email of the user whose chat history is managed.
        :raises ValueError: If no user is found with the provided email.
        """
        self.user_email = user_email
        self.session = get_session()
        self.user = self.session.query(User).filter_by(email=user_email).first()
        if not self.user:
            raise ValueError("User not found")
        self.user_name = self.user.user_name

    def create_thread(self, title=None):
        """
        Create a new chat thread for the user with an optional title.
        
        :param title: The title of the new chat thread (optional).
        :return: The ID of the newly created thread.
        """
        new_thread = ChatThread(user_id=self.user.id, thread_title=title)
        self.session.add(new_thread)
        self.session.commit()
        return new_thread.id
    
    def get_latest_thread(self):
        """
        Retrieve the latest chat thread associated with the user, ordered by creation time.
        
        :return: The latest ChatThread object for the user.
        """
        latest_thread = self.session.query(ChatThread)\
            .filter_by(user_id=self.user.id)\
            .order_by(ChatThread.created_at.desc())\
            .first()
        
        return latest_thread

    def save_interaction(self, message_content, message_type, thread_id=None):
        """
        Save a new message to the specified thread or create a new thread if none is specified.
        
        :param message_content: The content of the message to save.
        :param message_type: The type of the message (e.g., "human", "ai").
        :param thread_id: The ID of the thread to save the message in (optional).
        """
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
        """
        Determine if a new chat thread should be created based on the timestamp of the last message.
        
        :param thread_id: The ID of the thread to check (optional).
        :return: True if a new thread should be created, False otherwise.
        """
        if thread_id:
            # Check the last message timestamp of the given thread
            last_message = self.session.query(Message).filter_by(thread_id=thread_id).order_by(Message.timestamp.desc()).first()
            if last_message:
                # Define a time threshold for creating a new thread (e.g., 1 hour)
                time_threshold = timedelta(hours=1)
                now = datetime.utcnow()
                if now - last_message.timestamp > time_threshold:
                    return True
        else:
            # No thread_id provided, assume a new thread should be created
            return True

        return False
    
    def create_thread_if_requested(self, manual_creation=False, title=None):
        """
        Create a new chat thread either manually or based on existing logic if no explicit request is made.
        
        :param manual_creation: Whether the thread creation was requested manually.
        :param title: The title of the new chat thread (optional).
        :return: The newly created or existing ChatThread object.
        """
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
        """
        Retrieve all messages for a specific chat thread, ordered by timestamp.
        
        :param thread_id: The ID of the thread to retrieve messages from.
        :return: A list of Message objects for the specified thread.
        """
        return self.session.query(Message).filter_by(thread_id=thread_id).order_by(Message.timestamp).all()

    def get_all_threads(self):
        """
        Retrieve all chat threads for the user.
        
        :return: A list of ChatThread objects for the user.
        """
        return self.session.query(ChatThread).filter_by(user_id=self.user.id).all()

    def get_recent_interactions(self, thread_id, limit=4):
        """
        Retrieve recent interactions (messages) for a specific chat thread, limited to a specified number.
        
        :param thread_id: The ID of the thread to retrieve messages from.
        :param limit: The maximum number of recent interactions to retrieve.
        :return: A list of Message objects for the specified thread, limited by the specified number.
        """
        return self.session.query(Message).filter_by(thread_id=thread_id).order_by(Message.timestamp.desc()).limit(limit).all()
    
    def get_user_name(self):
        """
        Retrieve the user's name based on the email provided.
        
        :return: The name of the user.
        """
        return self.session.query(User).filter_by(email=self.user_email).first().user_name
    
    def get_user_id(self):
        """
        Retrieve the user's ID based on the email provided.
        
        :return: The ID of the user.
        """
        return self.session.query(User).filter_by(email=self.user_email).first().id

    def close(self):
        """
        Close the database session.
        """
        self.session.close()
