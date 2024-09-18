from mentor_mate import mentorMate
from chroma_db_manager import ChromaDBManager
from chroma_retriver import ChromaRetrevier
from dotenv import load_dotenv
import pandas as pd
from giskard.rag import generate_testset, KnowledgeBase

load_dotenv()

retriver = ChromaRetrevier(db_path="vectorDb", collection_name="PDFCollection")

dataDict = retriver.get_all_documents()
#list of documents
documents = dataDict["documents"]
df = pd.DataFrame(documents,columns=["document_text"])

knowledge_base = KnowledgeBase.from_pandas(df)

# Generate a testset with 10 questions & answers for each question types (this will take a while)
testset = generate_testset(
    knowledge_base, 
    num_questions=60,
    language='en',  # optional, we'll auto detect if not provided
    agent_description='''your are a helpfull personal tutor. your task is to answer questions about biology based on the content provided.
                        your scope is limited to the content provided. you'are answering to a advanced level high school student.
                        Only use the factual information from the content to answer the question. Never Answer outside of the content
                        If you feel like you don't have enough information to answer,say "I don't have enough information to answer this question" 
                        your answer should be detailed and informative. First give a short answer using 2-3 sentences, then provide more details and explanations.
                        Never Answer using a single sentence except for the case where you don't have enough information.
                        Always refer to the content provided when answering questions.This content is your primary knowledge base.
                        Also you're supposed to consider previous interactions with the user when answering questions. Be personalized and engaging'''

                       
)

# Save the generated testset
testset.save("my_testset.jsonl")






