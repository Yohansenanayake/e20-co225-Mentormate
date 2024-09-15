import React from 'react';
import { Box, Image, Heading, Text } from '@chakra-ui/react';
import PhyPicture from '../assets/Physics.png'; // Import your image

function SubjectCardPhy() {
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
      _hover={{ background: "purple.400", transform: "scale(1.02)" }}
    >
      <Image 
        src={PhyPicture} 
        alt="phy picture" 
        borderRadius="15%" 
        marginBottom="5px"
      />
      <Heading as="h2" size="lg" fontWeight="bold" marginBottom="4px">
        PHYSICS
      </Heading>
      <Text fontSize="md">
      Start now to be a Physics hero.
      </Text>
    </Box>
  );
}

export default SubjectCardPhy;
