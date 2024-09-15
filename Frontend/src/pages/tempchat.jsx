// src/pages/ChatMentor.jsx
import React, { useState } from 'react';
import { Grid, GridItem, Box, Text } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import apiServices from '../services/apiServices';

const ChatMentor = () => {
  const [threads, setThreads] = useState([
    { name: 'Chat 1' },
    { name: 'Chat 2' },
    { name: 'Chat 3' },
  ]);
  const [messages, setMessages] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSelectThread = (thread) => {
    console.log('Selected thread:', thread.name);
    // Load messages for the selected thread (implement as needed)
  };

  const handleSendMessage = (message) => {

    // Append user message to state variable
    const userMessage = { text: message, isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    // Sending request to the backend server
    apiServices.post('/chat', { input: message })
      .then(response => {
        // Append bot message to message state
        setMessages(prevMessages => [
          ...prevMessages,
          { text: response.data.message, isUser: false }
        ]);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleEmailSubmit = (email) => {
    setUserEmail(email);
    console.log('Email submitted:', email);
    // Here, you can send the email to the backend or perform any needed actions
  };

  return (
    <Grid
      templateColumns="250px 1fr"
      height="100vh"
      templateRows="1fr"
      gap="0"
    >
      <GridItem>
        <Sidebar
          threads={threads}
          onSelectThread={handleSelectThread}
          onEmailSubmit={handleEmailSubmit}
        />
      </GridItem>
      <GridItem>
        {error && (
          <Box bg="red.500" color="white" p={3} borderRadius="md" mb={4}>
            <Text>Error: {error}</Text>
          </Box>
        )}
        <ChatContainer messages={messages} onSendMessage={handleSendMessage} />
      </GridItem>
    </Grid>
  );
};

export default ChatMentor;