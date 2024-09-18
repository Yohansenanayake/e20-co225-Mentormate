import React, { useState } from 'react';
import { Box,Button,Flex,FormControl,FormLabel,Heading,Input,Stack, useColorModeValue} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import apiServices from '../services/apiServices'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Send password reset request
    apiServices.post('/forgotpassword', { email })
      .then(response => {
        setMessage('A password reset link has been sent to your email.');
      })
      .catch(error => {
        setError('Error sending password reset email. Please try again.');
        console.error('Password reset error:', error);
      });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bgGradient='linear(to-br, #189AB4 0%, #05445E 50%, #0D1626 100%)'
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color="#D4F1F4" fontWeight="bold" textShadow="4px 4px 10px rgba(0, 0, 0, 0.8)">
            Forgot Your Password?
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('gray.300', 'gray.800')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  borderColor={'gray.600'}
                />
              </FormControl>
              {error && <Box color="red.500">{error}</Box>}
              {message && <Box color="green.500">{message}</Box>}
              <Stack spacing={10}>
                <Button
                  bg={'blue.500'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  mt={'4'}
                >
                  Send Reset Link
                </Button>
              </Stack>
              <Box textAlign="center" mt={'3'}>Remember your password? <a href="/login" style={{color: 'blue'}}>Log In</a></Box>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default ForgotPassword;
