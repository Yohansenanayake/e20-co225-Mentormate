import pytest
from unittest.mock import patch, MagicMock
from chromadb import PersistentClient
from Backend1.custom_pdf_loader import CustomPDFLoader
from Backend1.chroma_db_manager import ChromaDBManager  # Assuming your class is in chroma_db_manager.py
import uuid

@pytest.fixture
def mock_chromadb_client():
    with patch.object(PersistentClient, '__init__', lambda self, path: None):
        yield PersistentClient()

@pytest.fixture
def mock_custom_pdf_loader():
    with patch.object(CustomPDFLoader, '__init__', lambda self, pdf_file: None):
        yield CustomPDFLoader()

def test_chromadb_manager_setup_collection(mock_chromadb_client):
    # Mock setup_collection method separately since it involves an existing collection
    with patch.object(ChromaDBManager, 'setup_collection', lambda self, collection_name: None):
        manager = ChromaDBManager(db_path='test_db_path', collection_name='test_collection')
        assert manager.collection_name == 'test_collection'
        assert manager.collection is not None

def test_chromadb_manager_load_documents(mock_custom_pdf_loader):
    mock_loader_instance = MagicMock()
    mock_loader_instance.load.return_value = [{'page_content': 'mocked_content', 'metadata': {'page': 1}}]

    with patch.object(CustomPDFLoader, 'load', lambda self: mock_loader_instance.load()):
        manager = ChromaDBManager(db_path='test_db_path', collection_name='test_collection')
        pages = manager.load_documents('mock_pdf_file')
        assert len(pages) == 1
        assert pages[0]['page_content'] == 'mocked_content'

def test_chromadb_manager_add_documents_to_collection(mock_chromadb_client, mock_custom_pdf_loader):
    mock_loader_instance = MagicMock()
    mock_loader_instance.load.return_value = [{'page_content': 'mocked_content', 'metadata': {'page': 1}}]

    with patch.object(CustomPDFLoader, 'load', lambda self: mock_loader_instance.load()):
        manager = ChromaDBManager(db_path='test_db_path', collection_name='test_collection')
        manager.setup_collection('test_collection')
        pages = manager.load_documents('mock_pdf_file')
        manager.add_documents_to_collection(pages)
        
        # Add assertions based on the expected behavior of add_documents_to_collection

def test_chromadb_manager_query_documents(mock_chromadb_client):
    mock_results = {'documents': [{'page_content': 'mocked_content', 'metadata': {'page': 1}}]}
    mock_collection_instance = MagicMock()
    mock_collection_instance.query.return_value = mock_results

    with patch.object(PersistentClient, 'create_collection', lambda self, name, metadata: mock_collection_instance):
        manager = ChromaDBManager(db_path='test_db_path', collection_name='test_collection')
        manager.setup_collection('test_collection')
        results = manager.query_documents(['query_text'])
        assert len(results) == 1
        assert results[0]['page_content'] == 'mocked_content'

def test_chromadb_manager_add_data_to_vectorDb(mock_chromadb_client, mock_custom_pdf_loader):
    mock_loader_instance = MagicMock()
    mock_loader_instance.load.return_value = [{'page_content': 'mocked_content', 'metadata': {'page': 1}}]

    with patch.object(CustomPDFLoader, 'load', lambda self: mock_loader_instance.load()):
        manager = ChromaDBManager(db_path='test_db_path', collection_name='test_collection')
        manager.add_data_to_vectorDb('mock_data_path')
        
        # Add assertions based on the expected behavior of add_data_to_vectorDb
