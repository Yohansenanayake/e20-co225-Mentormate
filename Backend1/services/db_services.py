
from db.models import User, ChatThread, Message
from db.database import get_session

def get_user_threads(user_email):
    """
    Retrieve all chat threads associated with a user's email.
    
    :param user_email: The email of the user whose threads are being fetched.
    :return: A list of dictionaries representing the threads.
    """
    session = get_session()
    try:
        user = session.query(User).filter_by(email=user_email).first()
        if not user:
            return []

        threads = session.query(ChatThread).filter_by(user_id=user.id).all()

        return [
            {
                'id': thread.id,
                'title': f"Chat created at {thread.created_at}" if thread.thread_title is None else thread.thread_title,
                'created_at': thread.created_at
            } for thread in threads
        ]
    finally:
        session.close()

def get_thread_messages(thread_id, user_email):
    """
    Retrieve all messages for a specific thread, ensuring the user owns the thread.
    
    :param thread_id: The ID of the thread whose messages are being fetched.
    :param user_email: The email of the user who owns the thread.
    :return: A list of dictionaries representing the messages.
    """
    session = get_session()
    try:
        user = session.query(User).filter_by(email=user_email).first()
        if not user:
            return []

        # Ensure the thread belongs to the user
        thread = session.query(ChatThread).filter_by(id=thread_id, user_id=user.id).first()
        if not thread:
            return []

        messages = session.query(Message).filter_by(thread_id=thread.id).all()
        return [
            {
                'id': message.id,
                'content': message.message_content,
                'type': message.message_type,
                'timestamp': message.timestamp
            } for message in messages
        ]
    finally:
        session.close()
