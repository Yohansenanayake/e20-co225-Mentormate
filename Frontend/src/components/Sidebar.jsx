// src/components/Sidebar.jsx
import { Box, VStack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Sidebar = ({ threads, onSelectThread }) => {
  return (
    <Box
      width="250px"
      bg="gray.900"
      color="white"
      height="100vh"
      p="4"
      overflowY="auto"  // Handle overflow
    >
      <VStack align="start" spacing="4">
        <Text fontSize="xl" mb="4">Chat Threads</Text>

        {threads.map((thread) => (
          <Box
            key={thread.id}
            p="1"
            bg="gray.800"
            width="100%"
            borderRadius="md"
            _hover={{ bg: 'gray.600' }}
            cursor="pointer"
            onClick={() => onSelectThread(thread)}
          >
            {thread.title || `Chat created at ${new Date(thread.created_at).toLocaleString()}`}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
