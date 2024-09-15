import jwt
import datetime
from werkzeug.security import check_password_hash
from db.models import User
from db.database import get_session
from password_manager import PasswordManager

password_manager = PasswordManager()
# Secret key for JWT encoding/decoding
SECRET_KEY = 'your_secret_key_here'  # Replace with your actual secret key

def create_jwt(email):
    """Generate a JWT token with the user's email."""
    payload = {
        'email': email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)  # Token expiration time
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def decode_jwt(token):
    """Decode the JWT token and return the payload."""
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return decoded_token
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def authenticate_user(email, password):
    """Authenticate user by checking the email and password."""
    session = get_session()
    user = session.query(User).filter_by(email=email).first()
    session.close()
    
    if user and password_manager.check_password(password=password, hashed_password=user.password_hash):
        return True
    return False

def create_user(email, password,username):
    """Create a new user with the given email,username and password."""
    try:
        session = get_session()
        user = User(email=email, password_hash=password_manager.hash_password(password),user_name=username)  
        session.add(user)
        session.commit()
        session.close()
        return True
    except Exception as e:
        print("Error creating user: ", e)
        return False

def check_user_exists(email):
    """Check if a user with the given email already exists."""
    session = get_session()
    user = session.query(User).filter_by(email=email).first()
    session.close()
    if user:
        return True
    return False
