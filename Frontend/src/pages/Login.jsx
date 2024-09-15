import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import apiServices from '../services/apiServices';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Prepare the login data
    const loginData = {
      email: email,
      password: password,
    };

    // Send login request to the backend
    apiServices.post('/login', loginData)
      .then(response => {
        // On success, store the JWT token and set it in the Authorization header
        const token = response.data.token; // Adjust according to your backend response structure
        apiServices.setAuthToken(token);
        console.log('Login successful!');

        // Redirect to the chat page
        navigate('/chat'); // Use navigate to redirect to the chat page
      })
      .catch(error => {
        // On error, display an error message
        setError('Login failed. Please check your credentials and try again.');
        console.error('Login error:', error);
      });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg="blue.700"
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color="gray.300" fontWeight="bold" textShadow="4px 4px 10px rgba(0, 0, 0, 0.8)">
            Login | MentorMate
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
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  borderColor={'gray.600'}
                />
              </FormControl>
              {error && <Box color="red.500">{error}</Box>}
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
                  Log in
                </Button>
              </Stack>
              <Box textAlign="center" mt={'3'}>Don't have an account? <a href="/signup" style={{color: 'blue'}}>Sign Up</a></Box>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
