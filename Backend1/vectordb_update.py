#This script is used to update the vector database with the data from the pdf files in the testData folder
#The script uses the ChromaDBManager class from chroma_db_manager.py to vreate chroma client andadd data to the vector database

from chroma_db_manager import ChromaDBManager

# creating chromaDB client to access (add data to) the vector database
vectorDB_client_pdf = ChromaDBManager(db_path="Backend1/vectorDb",collection_name="PDFCollection")
# adding data to the vector database using chroma client
#vectorDB_client_pdf.add_data_to_vectorDb('Backend1/testData/IntroToBio.pdf')
#print("1 done")
#vectorDB_client_pdf.add_data_to_vectorDb('Backend1/testData/chapter2.pdf')
#print("2 done")

vectorDB_client_pdf.add_data_to_vectorDb('Backend1/testData/BioResFull.pdf')
print("Full book done")
embeddings_count =vectorDB_client_pdf.collection.count()
print("embeddings count",embeddings_count)