import { Box, Flex, Text, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useNavigate } from 'react-router-dom';

const ChatContainer = ({ messages, onSendMessage, onToggleSidebar }) => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };

  // Detect if view is mobile
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex direction="column" height="100vh" bg="gray.800">
      <Flex
        align="center"
        justify={isMobile ? 'space-between' : 'flex-start'}
        p="4"
        position="relative"
      >
        {isMobile && (
          <IconButton
            icon={<HamburgerIcon />}
            onClick={onToggleSidebar} // Trigger sidebar toggle
            aria-label="Open sidebar"
            color="white"
            bg="gray.800"
            _hover={{ bg: 'gray.700' }}
            zIndex="1000"
          />
        )}
        <Text
          onClick={handleLogoClick}
          cursor="pointer"
          color="gray.300"
          fontSize="2xl"
          textAlign={isMobile ? 'center' : 'left'}
          flex={isMobile ? '1' : '0'}
        >
          MentorMate
        </Text>
      </Flex>

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
