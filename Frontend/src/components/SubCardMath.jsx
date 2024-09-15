import React from 'react';
import { Box, Image, Heading, Text } from '@chakra-ui/react';
import MathPicture from '../assets/Maths.png'; // Import your image

function SubjectCardMath() {
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
      _hover={{ background: "blue.600", transform: "scale(1.02)" }}
    >
      <Image 
        src={MathPicture} 
        alt="phy picture" 
        borderRadius="15%" 
        marginBottom="5px"
      />
      <Heading as="h2" size="lg" fontWeight="bold" marginBottom="5px">
        COMBINED MATHS
      </Heading>
      <Text fontSize="md">
      Get ready for exciting maths.
      </Text>
    </Box>
  );
}

export default SubjectCardMath;
