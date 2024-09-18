import pytest
from unittest.mock import patch, MagicMock
from Backend1.mentor_mate import mentorMate, RunnableWithMessageHistory

def test_mentor_mate_initialization():
    user_input = "What is life?"
    similarity_doc = ["Some relevant content from PDF"]
    user_name = "test_user"

    mentor = mentorMate(user_input, similarity_doc, user_name)
    
    assert mentor.user_input == user_input
    assert mentor.similarity_doc == similarity_doc
    assert mentor.user_name == user_name

@patch('Backend1.mentor_mate.SQLChatMessageHistory')
@patch('Backend1.mentor_mate.StrOutputParser')
@patch('Backend1.mentor_mate.ChatPromptTemplate')
@patch('Backend1.mentor_mate.ChatGroq')
def test_mentor_mate_get_response(mock_chatgroq, mock_chatprompttemplate, mock_stroutputparser, mock_sqlchatmessagehistory):        
    user_input = "What is life?"
    similarity_doc = ["Some relevant content from PDF"]
    user_name = "test_user"

    mentor = mentorMate(user_input, similarity_doc, user_name)

    # Mock the behavior of the LLM and related components
    mock_llm_instance = MagicMock()
    mock_llm_instance.invoke.return_value = "This is a mocked response."

    mock_chatgroq.return_value = mock_llm_instance

    mock_chain = MagicMock()
    mock_chain.invoke.return_value = "This is a mocked response."

    mock_chatprompttemplate.from_messages.return_value = mock_chain
    mock_stroutputparser.return_value = mock_chain
    mock_sqlchatmessagehistory.return_value = MagicMock()

    # Mock the RunnableWithMessageHistory behavior
    mock_runnable_with_history = MagicMock(spec=RunnableWithMessageHistory)
    mock_runnable_with_history.invoke.return_value = "This is a mocked response."

    # Patch the RunnableWithMessageHistory to return our mock instance
    with patch.object(RunnableWithMessageHistory, '__new__', return_value=mock_runnable_with_history):
        # Invoke the method to test
        response = mentor.get_response()

    assert response == "This is a mocked response."

@patch('Backend1.mentor_mate.SQLChatMessageHistory')
@patch('Backend1.mentor_mate.StrOutputParser')
@patch('Backend1.mentor_mate.ChatPromptTemplate')
@patch('Backend1.mentor_mate.ChatGroq')
def test_mentor_mate_get_response_exception(mock_chatgroq, mock_chatprompttemplate, mock_stroutputparser, mock_sqlchatmessagehistory):
    user_input = "What is life?"
    similarity_doc = ["Some relevant content from PDF"]
    user_name = "test_user"

    mentor = mentorMate(user_input, similarity_doc, user_name)

    # Mock the behavior to raise an exception
    mock_llm_instance = MagicMock()
    mock_llm_instance.invoke.side_effect = Exception("Mocked exception")

    mock_chatgroq.return_value = mock_llm_instance

    mock_chain = MagicMock()
    mock_chain.invoke.side_effect = Exception("Mocked exception")

    mock_chatprompttemplate.from_messages.return_value = mock_chain
    mock_stroutputparser.return_value = mock_chain
    mock_sqlchatmessagehistory.return_value = MagicMock()

    # Mock the RunnableWithMessageHistory behavior
    mock_runnable_with_history = MagicMock(spec=RunnableWithMessageHistory)
    mock_runnable_with_history.invoke.side_effect = Exception("Mocked exception")

    # Patch the RunnableWithMessageHistory to return our mock instance
    with patch.object(RunnableWithMessageHistory, '__new__', return_value=mock_runnable_with_history):
        # Invoke the method to test exception handling
        response = mentor.get_response()

    assert response == "An error occurred. Please try again later."
