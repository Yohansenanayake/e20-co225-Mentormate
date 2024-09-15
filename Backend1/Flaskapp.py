from flask import Flask, request, jsonify
from mentor_redis import mentorMate
from flask_cors import CORS
from auth import create_jwt, decode_jwt, authenticate_user , create_user, check_user_exists
from services.db_services import get_user_threads, get_thread_messages

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Hello!'

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')

    if not email or not password or not username:
        return jsonify({'message': 'Email,username and password are required'}), 400

    if check_user_exists(email):
        return jsonify({'message': 'User already exists'}), 400

    # Add user to the database
    if create_user(email, password,username):
        return jsonify({'message': 'User created successfully'})
    else:
        return jsonify({'message': 'Error creating user'}), 400

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    if authenticate_user(email, password):
        token = create_jwt(email)
        return jsonify({'token': token})
    else:
        return jsonify({'error': 'Invalid email or password'}), 401
        
    
@app.route('/api/threads', methods=['GET'])
def get_threads():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Authorization header missing'}), 401

    token = auth_header.split(" ")[1]
    user_data = decode_jwt(token)
    if not user_data:
        return jsonify({'error': 'Invalid or expired token'}), 401

    user_email = user_data.get('email')
    threads = get_user_threads(user_email)

    return jsonify({'threads': threads})


@app.route('/api/threads/<int:thread_id>/messages', methods=['GET'])
def get_messages(thread_id):
    print("Thread ID: ", thread_id)
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Authorization header missing'}), 401

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
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        print("Authorization header missing")
        return jsonify({'error': 'Authorization header missing'}), 401

    token = auth_header.split(" ")[1]
    user_data = decode_jwt(token)
    if not user_data:
        print("Invalid or expired token")
        return jsonify({'error': 'Invalid or expired token'}), 401

    user_email = user_data.get('email')
    print("User Email: ", user_email)
    data = request.json
    user_input = data.get('input')

    if not user_input:
        print("Input is required")
        return jsonify({'error': 'Input is required'}), 400

    mentor = mentorMate(user_input=user_input, user_email=user_email)
    response = mentor.get_response()

    if not response:
        response = "Sorry, Servers are down. Please try again later."

    print("Response: ", response)
    return jsonify({'message': response})

if __name__ == '__main__':
    app.run(debug=True)
