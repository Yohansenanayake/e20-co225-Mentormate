import React from 'react';
import { Box, Image, Heading, Text } from '@chakra-ui/react';
import ChemPicture from '../assets/Chemistry.png'; // Import your image

function SubjectCardChem() {
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
      _hover={{ background: "orange.700", transform: "scale(1.02)" }}
    >
      <Image 
        src={ChemPicture} 
        alt="phy picture" 
        borderRadius="15%" 
        marginBottom="5px"
      />
      <Heading as="h2" size="lg" fontWeight="bold" marginBottom="10px">
        CHEMISTRY
      </Heading>
      <Text fontSize="md">
      Chemistry is fun.
      </Text>
    </Box>
  );
}

export default SubjectCardChem;
