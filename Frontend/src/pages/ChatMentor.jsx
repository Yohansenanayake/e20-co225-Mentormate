import React, { useState, useEffect } from 'react';
import { Grid, GridItem, Box, Text, Spinner } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import apiServices from '../services/apiServices';

const ChatMentor = () => {
  const [threads, setThreads] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load threads after user login
  useEffect(() => {
    setLoading(true);
    apiServices.get('/threads')
      .then(response => {
        setThreads(response.data.threads);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // Empty dependency array to run once on mount

  const handleSelectThread = (thread) => {
    console.log('Selected thread:', thread.name);
    setLoading(true);
    // Load messages for the selected thread
    apiServices.get(`/threads/${thread.id}/messages`)
      .then(response => {
        // Directly use the messages as they are from the backend
        setMessages(response.data.messages);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleSendMessage = (message) => {
    const userMessage = { content: message, type: 'human' };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    apiServices.post('/chat', { input: message })
      .then(response => {
        const assistantMessage = { content: response.data.message, type: 'ai' };
        setMessages(prevMessages => [...prevMessages, assistantMessage]);
      })
      .catch(error => {
        setError(error.message);
      });
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
        />
      </GridItem>
      <GridItem>
        {error && (
          <Box bg="red.500" color="white" p={3} borderRadius="md" mb={4}>
            <Text>Error: {error}</Text>
          </Box>
        )}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%" bg={'gray.800'}>
            <Spinner size="xl" color="blue.300" emptyColor='gray.200'/>
          </Box>
        ) : (
          <ChatContainer messages={messages} onSendMessage={handleSendMessage} />
        )}
      </GridItem>
    </Grid>
  );
};

export default ChatMentor;
