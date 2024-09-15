// src/components/MessageInput.jsx
import { Box, Input, Button, InputGroup, InputRightElement ,IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { ArrowRightIcon } from '@chakra-ui/icons';


const MessageInput = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <Box p="4" bg="gray.800" width="100%">
      <InputGroup size="md">
        <Input
          placeholder="Type your message..."
          pr="4.5rem"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          bg="gray.700"
          color="white"
          borderRadius="md"
        />
        <InputRightElement width="4.5rem">
            <IconButton
                aria-label="send"
                icon={<ArrowRightIcon />}
                isRound={true}
                variant={'solid'}
                colorScheme='gary'
                onClick={handleSendMessage}
                h={'1.75rem'}

            />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default MessageInput;
