import { Box, VStack } from '@chakra-ui/react';
import MarkdownRenderer from './MarkdownRenderer';
import ErrorBoundary from './ErrorBoundary';

const MessageList = ({ messages = [] }) => {
  return (
    <Box
      overflowY="auto"
      flex="1"
      p="4"
      mb="4"
      paddingBottom="80px"  // Ensure last message is visible
    >
      <VStack spacing="4" align="stretch">
        {messages.map((message, index) => (
          <Box
            key={index}
            bg={message.type === 'human' ? 'blue.500' : 'gray.700'}
            p="4"
            borderRadius="md"
            alignSelf={message.type === 'human' ? 'flex-end' : 'flex-start'}
            color="white"
            maxW={message.type === 'human' ? '60%' : '100%'}
            wordBreak="break-word"  // Handle long words properly
          >
            <ErrorBoundary>
              <MarkdownRenderer content={message.content} />
            </ErrorBoundary>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default MessageList;
