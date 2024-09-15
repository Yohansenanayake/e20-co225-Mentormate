import React from 'react';
import { Box, Button, Heading, Flex, Text } from '@chakra-ui/react';
import Navbar from '../components/Navbar'; // Assuming you still want to keep the Navbar
import { useNavigate } from 'react-router-dom';

function Explore() {

  const navigate = useNavigate();  //Initialize the navigate function


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
              onClick={() => navigate('/login')}
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
