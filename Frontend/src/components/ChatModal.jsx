import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure } from '@chakra-ui/react';
import MessageList from './MessageList'; // Your MessageList component
import MessageInput from './MessageInput'; // Your MessageInput component
import apiServices from '../services/apiServices';

const ChatModal = ({ question, answer,unit_no,question_no , question_id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const [messages, setMessages] = useState([]);

  // This useEffect ensures that the answer and question are rendered when the modal opens
  useEffect(() => {
    if (isOpen) {
      // Only populate messages when the modal is opened to reset them
      setMessages([
        { type: 'ai', content: `Question: ${question}` },
        { type: 'human', content: `Your answer: ${answer}` },
      ]);
    }
  }, [isOpen, question, answer]);


  const handleSendMessage = (message) => {
    setMessages(prevMessages => [
      ...prevMessages, 
      { type: 'human', content: message }
    ]);

    // Placeholder: Process chatbot response here...
    apiServices.post('/QA',{unit_no:unit_no, question_no:question_no, student_question: message ,question_id:question_id})
      .then(response => {
        const assistantMessage = { content: response.data.message, type: 'ai' };
        setMessages(prevMessages => [...prevMessages, assistantMessage]);
      })
      .catch(error => {
        console.log(error);
      });
  };
   
    const handleReviewClick = () => {
        // open modal
        onOpen();
        console.log(question);
        // Review the answer
        apiServices.post('/review_question',{student_answer: answer, unit_question: question,unit_no:unit_no, question_no:question_no ,question_id:question_id})
        .then(response => {
          const assistantMessage = { content: response.data.message, type: 'ai' };
          setMessages(prevMessages => [...prevMessages, assistantMessage]);
        })
        .catch(error => {
          console.log(error);
        });
    }
  return (
    <>
      <Button onClick={handleReviewClick} colorScheme="green" bg="green.600" borderRadius="5px" color="white">
        Review
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent bg={'gray.800'}>
          <ModalHeader color={'white'}>MentorMate Review</ModalHeader>
          <ModalCloseButton color={'white'} />
          <ModalBody>
            {/* Display the messages in the chat */}
            <MessageList messages={messages} />
          </ModalBody>

          <ModalFooter>
            {/* Input for sending new messages */}
            <MessageInput onSendMessage={handleSendMessage} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatModal;
