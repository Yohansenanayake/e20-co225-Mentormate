from flask import Flask, request, jsonify
from mentor_redis import mentorMate
from flask_cors import CORS
import markdown

app = Flask(__name__)
CORS(app)
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json

    # Get input and email from the request
    user_input = data.get('input')
    user_email = data.get('email')

    if not user_input or not user_email:
        return jsonify({'error': 'Input and email are required'}), 400

    # Process the input with the mentorMate
    mentor = mentorMate(user_input=user_input, user_email=user_email)
    response = mentor.get_response()

    if not response:
        response = "Sorry, Servers are down. Please try again later."

    #html_response = markdown.markdown(response)  
    print("Response: ", response) 
    # Return the raw Markdown response
    return jsonify({'message': response})

if __name__ == '__main__':
    app.run(debug=True)
