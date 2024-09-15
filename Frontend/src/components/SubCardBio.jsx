import React from 'react';
import { Box, Image, Heading, Text } from '@chakra-ui/react';
import BiologyPicture from '../assets/Biology.png'; // Import your image

function SubjectCardBio() {
  return (
    <Box 
      
      borderWidth="2px"
      borderRadius="lg"
      borderColor="gray.400"
      boxShadow="2xl"
      padding="20px"
      margin="10px"
      textAlign="center"
      maxWidth="250px"
      height="340px"
      display="inline-block"
      cursor="pointer"
      transition="transform 0.2s, background 0.2s"
      _hover={{ background: "green.200", transform: "scale(1.02)" }}
    >
      <Image 
        src={BiologyPicture} 
        alt="biology picture" 
        borderRadius="15%" 
        marginBottom="5px"
      />
      <Heading as="h2" size="lg" fontWeight="bold" marginBottom="10px">
        BIOLOGY
      </Heading>
      <Text fontSize="md">
        Get started on A/L Biology journey now.
      </Text>
    </Box>
  );
}

export default SubjectCardBio;
