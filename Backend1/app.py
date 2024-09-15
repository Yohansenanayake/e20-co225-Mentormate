from flask import Flask, render_template, request, jsonify
from mentor_redis import mentorMate
from chroma_retriver import ChromaRetrevier
import markdown

#pdf_retriver = ChromaRetrevier(db_path="vectorDb", collection_name="PDFCollection")
#print(pdf_retriver.collection.count())

app = Flask(__name__)

# Route to render the index.html template
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle form submissions
@app.route('/submit_message', methods=['POST'])
def submit_message():
    message = request.form['message']
    user_email = request.form['user_email']  # Retrieve username from form data
    print("User Message:", message)
    print("User email:", user_email)
    # Process the message (e.g., interact with your chatbot backend)
    
    #similarity_docs = pdf_retriver.query_documents(message)
    #print("Similarity Docs:", similarity_docs)
 

    mentor = mentorMate(user_input=message, user_email=user_email)

    bot_response = mentor.get_response()
    # Log bot_response value to console 
    print("Bot Response:", bot_response)
    if bot_response=="":
        bot_response = "Sorry, Servers are down. Please try again later."
        
    bot_response_html = markdown.markdown(bot_response)
          
    return jsonify({'bot_response': bot_response_html})

if __name__ == '__main__':
    app.run(debug=True)
