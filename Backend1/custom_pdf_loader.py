from langchain_community.document_loaders import PyPDFLoader

class CustomPDFLoader(PyPDFLoader):
    """
    A custom PDF loader class that extends PyPDFLoader to clean text in loaded documents.

    Methods:
        load(extract_images=True): Loads and cleans the text of the documents.
        load_and_split(): Loads, splits, and cleans the text of the documents.
        clean_text(text): Cleans the text content of a document.
        get_page(page_number): Gets the cleaned text content of a specific page number.
    """

    def __init__(self, path):
        """
        Initializes the CustomPDFLoader class with the path to the PDF file.

        Args:
            path (str): The path to the PDF file.
        """
        super().__init__(path)

    def load(self, extract_images=True):
        """
        Loads and cleans the text of the documents.

        Args:
            extract_images (bool, optional): Whether to extract images from the PDF. Defaults to True.

        Returns:
            list: A list of Document objects with cleaned text.
        """
        documents = super().load()

        # Cleaning text after loading
        for doc in documents:
            doc.page_content = self.clean_text(doc.page_content)
        return documents
    
    def load_and_split(self):
        """
        Loads, splits, and cleans the text of the documents.

        Returns:
            list: A list of Document objects with cleaned text.
        """
        documents = super().load_and_split()

        # Cleaning text after loading
        for doc in documents:
            doc.page_content = self.clean_text(doc.page_content)
        return documents
    
    def clean_text(self, text):
        """
        Cleans the text content of a document.

        Args:
            text (str): The text content to be cleaned.

        Returns:
            str: The cleaned text.
        """
        text = text.replace('\n', ' ')
        text = ' '.join(text.split())
        return text
    
    def get_page(self, page_number):
        """
        Gets the cleaned text content of a specific page number.

        Args:
            page_number (int): The page number to retrieve.

        Returns:
            str: The cleaned text content of the specified page.

        Raises:
            ValueError: If the page number is not found.
        """
        pages = self.load()
        for page in pages:
            if page.metadata['page'] == page_number:
                return page.page_content
        print("Page not found")
        return None
