// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, VStack, Heading, Alert, AlertIcon } from '@chakra-ui/react';
import { z } from 'zod';
import apiServices from '../services/apiServices';

// Zod schema for validation
const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(2, { message: "Username must be at least 2 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Path of error
});

const SignUp = () => {
  const { register, handleSubmit, formState: { errors , isValid } } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const [error,setError]=useState(null)
  const onSubmit = (data) => {
    console.log(data);
    //send data to the backend
    apiServices.post('/signup', data).then(response => {
      console.log('Signup successful!');
      // Redirect to the login page
      window.location.href = '/login';
    }).catch(error => {
      console.error('Signup error:', error);
      setError(error.response.data.message);
    });

  };

  return (
  
   <Box display='felx' alignContent='center' bg="blue.700" minH={'100vh'} py="20">
      {error && (<Alert status="error" mb="4" textAlign='center'variant='top-accent'flexDirection='column'alignItems='center'justifyContent='center'>
                   <AlertIcon />
                    {error}
                </Alert>)
      }
      <Heading as="h1" size="xl" textAlign="center" mb="6" color="gray.300" fontWeight="bold" textShadow="4px 4px 10px rgba(0, 0, 0, 0.8)">
        Sign Up | MentorMate
      </Heading>
    <Box w="90%" maxW='md' mx="auto"  p='8' bgColor="gray.200" borderRadius={20}>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="4">
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" borderColor={'gray.400'} {...register('email')} />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.username}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input id="username" type="text" borderColor={'gray.400'} {...register('username')} />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" type="password" borderColor={'gray.400'} {...register('password')} />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.confirmPassword}>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input id="confirmPassword" type="password" borderColor={'gray.400'} {...register('confirmPassword')} />
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>

          <Button colorScheme="blue" type="submit" width="full" disabled={!isValid}>Sign Up</Button>
          <Box textAlign="center">Already have an account? <a href="/login" style={{color: 'blue'}}>Login</a></Box>
        </VStack>
      </form>
    </Box>
  </Box>
  );
};

export default SignUp;
