import chromadb
from custom_pdf_loader import CustomPDFLoader
import uuid

class ChromaDBManager:
    """
    A class to manage interactions with ChromaDB for storing and querying documents.

    Attributes:
        chroma_client (PersistentClient): The ChromaDB client instance.
        collection (Collection): The collection instance in ChromaDB.
        pages (list): The loaded pages from a document.
        collection_name (str): The name of the collection.
    """

    def __init__(self, db_path, collection_name):
        """
        Initializes the ChromaDBManager class with a database path and collection name.

        Args:
            db_path (str): The path to the ChromaDB database.
            collection_name (str): The name of the collection.
        """
        self.chroma_client = chromadb.PersistentClient(path=db_path)
        self.collection = None
        self.pages = None  # Initialize pages attribute
        self.collection_name = collection_name
        self.setup_collection(collection_name=collection_name)

    def setup_collection(self, collection_name):
        """
        Sets up a collection in ChromaDB. If the collection exists, it deletes and recreates it.

        Args:
            collection_name (str): The name of the collection.
        """
        try:
            self.chroma_client.delete_collection(name=collection_name)
        except Exception as e:
            if "does not exist" not in str(e):
                raise e  # Reraise unexpected Exception
            # Collection doesn't exist, continue
            pass

        self.collection = self.chroma_client.create_collection(
            name=collection_name,
            metadata={"hnsw:space": "cosine"}
        )

    def load_documents(self, pdf_file):
        """
        Loads documents from a PDF file using a custom PDF loader.

        Args:
            pdf_file (str): The path to the PDF file.

        Returns:
            list: The loaded pages from the PDF file.
        """
        loader = CustomPDFLoader(pdf_file)
        self.pages = loader.load()  # Store loaded pages in self.pages
        return self.pages
    
    def add_documents_to_collection(self, pages):
        """
        Adds documents to the collection in ChromaDB.

        Args:
            pages (list): The list of pages to add to the collection.

        Raises:
            ValueError: If the collection is not set up.
        """
        if not self.collection:
            raise ValueError("Collection is not set up. Call setup_collection() first.")
        
        for page in pages:
            unique_id = str(uuid.uuid4())
            self.collection.add(
                documents=[page.page_content],
                ids=[unique_id],
                metadatas=[page.metadata]
            )

    def query_documents(self, query_texts, n_results=4):
        """
        Queries the collection in ChromaDB with the provided texts.

        Args:
            query_texts (list): The list of query texts.
            n_results (int, optional): The number of results to return. Defaults to 4.

        Returns:
            list: The documents that match the query.
        
        Raises:
            ValueError: If the collection is not set up.
        """
        if not self.collection:
            raise ValueError("Collection is not set up. Call setup_collection() first.")
        
        results = self.collection.query(
            query_texts=query_texts,
            n_results=n_results
        )
        return results['documents']

    def add_data_to_vectorDb(self, data_path):
        """
        Adds data to the vector database from the specified path.

        Args:
            data_path (str): The path to the data file.
        """
        documents = self.load_documents(data_path)
        self.add_documents_to_collection(documents)
