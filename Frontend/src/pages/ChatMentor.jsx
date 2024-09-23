import React, { useState, useEffect } from 'react';
import { Grid, GridItem, Box, Spinner, useDisclosure } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import apiServices from '../services/apiServices';

const ChatMentor = () => {
  const [threads, setThreads] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // State for managing drawer
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  }, []);

  const handleSelectThread = (thread) => {
    setLoading(true);
    onClose(); // Close sidebar drawer
    apiServices.get(`/threads/${thread.id}/messages`)
      .then(response => {
        
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
      templateColumns={{ base: '1fr', md: '250px 1fr' }} // Sidebar in drawer for mobile, normal layout for larger screens
      height="100vh"
    >
      {/* Sidebar component as a Drawer in mobile view */}
      <Sidebar
        threads={threads}
        onSelectThread={handleSelectThread}
        isOpen={isOpen}
        onClose={onClose}
      />
      <GridItem>
        {error && (
          <Box bg="red.500" color="white" p={3} borderRadius="md" mb={4}>
            Error: {error}
          </Box>
        )}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%" bg="gray.800">
            <Spinner size="xl" color="blue.300" emptyColor="gray.200" />
          </Box>
        ) : (
          <ChatContainer
            messages={messages}
            onSendMessage={handleSendMessage}
            onToggleSidebar={onOpen} // Trigger sidebar drawer
          />
        )}
      </GridItem>
    </Grid>
  );
};

export default ChatMentor;
