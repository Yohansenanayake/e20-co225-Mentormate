"""
This module handles user authentication and management for the Mentormate project.
It includes functions for generating and decoding JWT tokens, authenticating users,
creating new users, and checking if a user already exists. 

The module utilizes JWT for secure token-based authentication and integrates with
SQLAlchemy to interact with the user database. Password management is handled
through a separate PasswordManager class to ensure secure password hashing and checking.
"""

import jwt
import datetime
from werkzeug.security import check_password_hash
from db.models import User
from db.database import get_session
from password_manager import PasswordManager

# Initialize the PasswordManager instance for handling password operations
password_manager = PasswordManager()

# Secret key used for encoding and decoding JWT tokens
SECRET_KEY = 'your_secret_key_here'  # Replace with your actual secret key

def create_jwt(email):
    """
    Generate a JWT token for the specified email.
    
    :param email: The email of the user for whom the token is generated.
    :return: The encoded JWT token as a string.
    """
    # Define the payload with email and expiration time
    payload = {
        'email': email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)  # Token expiration time set to 24 hours
    }
    # Encode the payload using the secret key and HS256 algorithm
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def decode_jwt(token):
    """
    Decode the JWT token and return the payload.
    
    :param token: The JWT token to be decoded.
    :return: The decoded payload if the token is valid; otherwise, None.
    """
    try:
        # Decode the token using the secret key and HS256 algorithm
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return decoded_token
    except jwt.ExpiredSignatureError:
        # Token has expired
        return None
    except jwt.InvalidTokenError:
        # Token is invalid
        return None

def authenticate_user(email, password):
    """
    Authenticate a user by checking the provided email and password.
    
    :param email: The email of the user to authenticate.
    :param password: The password to verify.
    :return: True if authentication is successful; otherwise, False.
    """
    # Obtain a new database session
    session = get_session()
    # Query the User table to find the user with the given email
    user = session.query(User).filter_by(email=email).first()
    session.close()
    
    # Check if the user exists and if the password matches the hashed password
    if user and password_manager.check_password(password=password, hashed_password=user.password_hash):
        return True
    return False

def create_user(email, password, username):
    """
    Create a new user with the provided email, username, and password.
    
    :param email: The email of the new user.
    :param password: The password for the new user.
    :param username: The username for the new user.
    :return: True if the user is created successfully; otherwise, False.
    """
    try:
        # Obtain a new database session
        session = get_session()
        # Create a new User object with the provided details
        user = User(email=email, password_hash=password_manager.hash_password(password), user_name=username)
        session.add(user)  # Add the user to the session
        session.commit()   # Commit the transaction
        session.close()   # Close the session
        return True
    except Exception as e:
        # Print the error message if there is an exception
        print("Error creating user: ", e)
        return False

def check_user_exists(email):
    """
    Check if a user with the specified email already exists.
    
    :param email: The email to check.
    :return: True if a user with the email exists; otherwise, False.
    """
    # Obtain a new database session
    session = get_session()
    # Query the User table to find if a user with the given email exists
    user = session.query(User).filter_by(email=email).first()
    session.close()
    # Return True if the user exists; otherwise, False
    if user:
        return True
    return False
