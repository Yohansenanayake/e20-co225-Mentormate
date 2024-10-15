
from db.models import User, ChatThread, Message , Unit , Question , SampleAnswer
from db.database import get_session
from datetime import datetime

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

# Function to get questions for a given unit
def get_questions_by_unit(unit_id: int):
    """
    Fetch questions for a specific unit from the database.
    
    :param unit_id: The ID of the unit for which questions need to be fetched.
    :return: A list of dictionaries, each containing question_no, question_text, and unit_no.
    """
    session = get_session()
    try:
        questions = session.query(Question).filter_by(unit_id=unit_id).all()

        if not questions:
            return []

        # Format the response data
        question_list = [
            {
                'question_id': question.id,
                'question_no': question.question_no,  # Assuming id is the question number
                'question_text': question.question_text,
                'unit_no': question.unit_id
            }
            for question in questions
        ]
        
        return question_list
    except Exception as e:
        print(e)
    finally:
        session.close()

# Function to get answers for a given question
def get_answers_by_question_id(question_id: int):
    """
    Fetch answers for a specific question from the database.
    
    :param question_id: The ID of the question for which answers need to be fetched.
    :return: A dictionary, containing answer_id and answer_text
    """
    session = get_session()
    try:
        answer_db = session.query(SampleAnswer).filter_by(question_id=question_id).first()  # Use `first()` instead of `all()`
        
        if not answer_db:
            return {}
        
        # Format the response data
        answer = {'answer_id': answer_db.id, 'answer_text': answer_db.answer_text}
        
        return answer
    except Exception as e:
        print(e)
    finally:
        session.close()

