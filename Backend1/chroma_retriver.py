import chromadb

class ChromaRetrevier:
    """
    A class to retrieve documents from ChromaDB.

    Attributes:
        collection_name (str): The name of the collection.
        ret_client (PersistentClient): The ChromaDB client instance.
        collection (Collection): The collection instance in ChromaDB.
    """

    def __init__(self, db_path, collection_name):
        """
        Initializes the ChromaRetrevier class with a database path and collection name.

        Args:
            db_path (str): The path to the ChromaDB database.
            collection_name (str): The name of the collection.
        """
        self.collection_name = collection_name
        self.ret_client = chromadb.PersistentClient(db_path)
        self.collection = self.ret_client.get_collection(self.collection_name)

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

    def get_all_documents(self):
        """
        Retrieves all documents from the collection with a limit of 20.

        Returns:
            list: The documents from the collection.
        """
        return self.collection.get(include=["documents"], limit=20)
