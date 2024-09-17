import React from 'react';
import { Box, Button, Heading, Flex, Text } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import apiServices from '../services/apiServices'; // Import the ApiServices

function Explore() {
  const navigate = useNavigate(); // Initialize the navigate function

  // Check if the user is logged in by verifying the JWT token using ApiServices
  const isLoggedIn = () => {
    const token = apiServices.getAuthToken();
    console.log(token); // Log the token to the console for debugging
    if (!token) {
      console.log('No token found'); // Log a message if no token is found
      return false;
    }

    // Optionally, add more robust validation (like token expiration check)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      console.log(payload); // Log the payload to the console for debugging
      return payload.exp > currentTime; // Check if token is expired
    } catch (error) {
      return false; // Invalid token format
    }
  };

  // Function to handle the Ask Now button click
  const handleAskNowClick = () => {
    if (isLoggedIn()) {
      console.log('User is logged in'); // Log a message if user is logged in
      navigate('/chat'); // User is logged in, proceed to chat
    } else {
      alert('Please log in to continue'); // Prompt to log in
      navigate('/login'); // Redirect to login page
    }
  };

  return (
    <>
      <Navbar className="navbar-sub" />
      
      <Flex 
        direction="column"
        justify="center"
        align="center"
        minHeight="100vh"
        width="100vw"
        bg="gray.400"
      >
        <Box textAlign="center" mb={8}>
          <Heading
            as="h1" 
            size="2xl" 
            color="gray.700"
            letterSpacing="widest"
            textShadow="2px 2px 8px rgba(0, 0, 0, 0.5)"
          >
            SELECT MODE
          </Heading>
        </Box>
        
        <Flex 
          justify="space-between" 
          minHeight="400px"  // Set a minimum height
          height={{ base: "auto", lg: "400px" }}  // Dynamic height with a fixed value for larger screens
          width={{ base: "90%", md: "80%", lg: "70%" }}
          borderRadius="20px"
          overflow="hidden"
          bgGradient="linear(to-r, #96bfe8, #68b3f5)"
        >
          <Flex 
            flex="1"
            direction="column"
            justify="center"
            align="center"
            p={10}
            bg="#96bfe8"
            textAlign="center"
          >
            <Heading as="h2" size="xl" color="gray.700" mb={4}>
              Test Your Knowledge
            </Heading>
            <Text fontSize="lg" color="gray.700" mb={6}>
              by answering model questions
            </Text>
            <Button 
              colorScheme="blackAlpha" 
              size="lg" 
              variant="solid"
              onClick={() => navigate('/explore/selectmode/biology/biomainunit')}
              _hover={{ transform: 'scale(1.05)', transition: 'all .3s' }}
            >
              Start Now
            </Button>
          </Flex>

          <Flex 
            flex="1"
            direction="column"
            justify="center"
            align="center"
            p={10}
            bg="#68b3f5"
            textAlign="center"
          >
            <Heading as="h2" size="xl" color="gray.700" mb={4}>
              Ask Your Questions
            </Heading>
            <Text fontSize="lg" color="gray.700" mb={6}>
              from our AI-powered personal tutor
            </Text>
            <Button 
              colorScheme="blackAlpha" 
              size="lg" 
              variant="solid"
              onClick={handleAskNowClick}  // Call the function to check login status
              _hover={{ transform: 'scale(1.05)', transition: 'all .3s' }}
            >
              Ask Now
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Explore;
