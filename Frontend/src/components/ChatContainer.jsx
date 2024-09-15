import { Box, Flex, Text } from '@chakra-ui/react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useNavigate } from 'react-router-dom';

const ChatContainer = ({ messages, onSendMessage }) => {
  const navigate = useNavigate();
  const handleLogoClick = ()=>{
    navigate('/');
  }
  return (
    <Flex direction="column" height="100vh" bg="gray.800">
      <Text onClick={handleLogoClick} cursor='pointer' color="gray.300" fontSize="2xl" p="4">
        Mentor Mate
      </Text>
      <Flex direction="column" flex="1" overflow="hidden">
        <MessageList messages={messages} />
        <Box
          position="relative"
          bottom="0"
          width="100%"
          bg="gray.800"
          p="4"
          borderTop="0px"
          borderColor="gray.600"
        >
          <MessageInput onSendMessage={onSendMessage} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default ChatContainer;
