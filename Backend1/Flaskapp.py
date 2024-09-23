"""
This module defines the API endpoints for the Mentormate project using Flask. 
It includes routes for user registration, login, retrieving chat threads, 
retrieving messages within a thread, and interacting with the chat service. 

The module integrates with various services such as authentication, database operations, 
and Redis-based chat functionalities. CORS is enabled to allow cross-origin requests.
"""

from flask import Flask, request, jsonify
from mentor_redis import mentorMate
from flask_cors import CORS
from auth import create_jwt, decode_jwt, authenticate_user, create_user, check_user_exists
from services.db_services import get_user_threads, get_thread_messages

app = Flask(__name__)
# Enable Cross-Origin Resource Sharing (CORS) for the application
CORS(app)
@app.route('/')
def index():
    return 'Hello Flask'
@app.route('/api/signup', methods=['POST'])
def signup():
    """
    Endpoint for user registration.
    
    Expects a JSON payload with 'email', 'password', and 'username'. 
    Checks if the user already exists, creates a new user if not, 
    and returns a success or error message.
    
    :return: JSON response indicating success or failure.
    """
    data = request.json
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')

    # Ensure all required fields are provided
    if not email or not password or not username:
        return jsonify({'message': 'Email, username, and password are required'}), 400

    # Check if the user already exists
    if check_user_exists(email):
        return jsonify({'message': 'User already exists'}), 400

    # Create a new user in the database
    if create_user(email, password, username):
        return jsonify({'message': 'User created successfully'})
    else:
        return jsonify({'message': 'Error creating user'}), 400

@app.route('/api/login', methods=['POST'])
def login():
    """
    Endpoint for user login.
    
    Expects a JSON payload with 'email' and 'password'. 
    Authenticates the user and returns a JWT token if successful, 
    or an error message if authentication fails.
    
    :return: JSON response containing the JWT token or an error message.
    """
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Ensure both email and password are provided
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    # Authenticate the user and generate a JWT token if valid
    if authenticate_user(email, password):
        token = create_jwt(email)
        return jsonify({'token': token})
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@app.route('/api/threads', methods=['GET'])
def get_threads():
    """
    Endpoint to retrieve all chat threads for the authenticated user.
    
    Requires a valid JWT token in the Authorization header. 
    Returns a list of chat threads for the user.
    
    :return: JSON response containing the list of chat threads.
    """
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Authorization header missing'}), 401

    # Extract the token from the Authorization header
    token = auth_header.split(" ")[1]
    user_data = decode_jwt(token)
    if not user_data:
        return jsonify({'error': 'Invalid or expired token'}), 401

    user_email = user_data.get('email')
    threads = get_user_threads(user_email)

    return jsonify({'threads': threads})

@app.route('/api/threads/<int:thread_id>/messages', methods=['GET'])
def get_messages(thread_id):
    """
    Endpoint to retrieve all messages for a specific thread.
    
    Requires a valid JWT token in the Authorization header. 
    Returns a list of messages for the specified thread if the user owns the thread.
    
    :param thread_id: The ID of the thread whose messages are being retrieved.
    :return: JSON response containing the list of messages.
    """
    print("Thread ID: ", thread_id)
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Authorization header missing'}), 401

    # Extract the token from the Authorization header
    token = auth_header.split(" ")[1]
    user_data = decode_jwt(token)
    if not user_data:
        return jsonify({'error': 'Invalid or expired token'}), 401

    user_email = user_data.get('email')
    messages = get_thread_messages(thread_id, user_email)
    print("Messages: ", messages)

    return jsonify({'messages': messages})

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Endpoint for interacting with the chat service.
    
    Requires a valid JWT token in the Authorization header. 
    Processes user input through the chat service and returns the response.
    
    :return: JSON response containing the chat service's reply.
    """
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        print("Authorization header missing")
        return jsonify({'error': 'Authorization header missing'}), 401

    # Extract the token from the Authorization header
    token = auth_header.split(" ")[1]
    user_data = decode_jwt(token)
    if not user_data:
        print("Invalid or expired token")
        return jsonify({'error': 'Invalid or expired token'}), 401

    user_email = user_data.get('email')
    print("User Email: ", user_email)
    data = request.json
    user_input = data.get('input')

    # Ensure user input is provided
    if not user_input:
        print("Input is required")
        return jsonify({'error': 'Input is required'}), 400

    # Process user input through the chat service
    mentor = mentorMate(user_input=user_input, user_email=user_email)
    response = mentor.get_response()

    # Handle cases where the response is not available
    if not response:
        response = "Sorry, Servers are down. Please try again later."

    print("Response: ", response)
    return jsonify({'message': response})

if __name__ == '__main__':
    app.run(host='0.0.0.0' , port=5000)
