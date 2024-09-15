import React from 'react'
import { Card, CardHeader, CardBody, Heading, Text, CardFooter, Button,Textarea} from '@chakra-ui/react';

function qUnitText({ question }) {
  return (
    <>
      <Card border="1px solid" borderColor="gray.200" bg="gray.500">
        <CardHeader>
          <Heading size="md" borderBottom="1px solid black" pb={2}>
          {typeof question === 'string' && question.includes('<')
            ? <Text fontSize="lg" mb={4} dangerouslySetInnerHTML={{ __html: question }} />
            : <Text fontSize="lg" mb={4}>{question} </Text>}
          </Heading>
        </CardHeader>

        <CardBody >
          <Textarea 
            placeholder="Type your answer here..." 
            size="md" 
            resize="none" // Optional: Prevents resizing of the textarea
          />
          
        </CardBody>

        <CardFooter ml="auto" display="flex" justifyContent="flex-end" gap={2}>
          <Button colorScheme="blue" bg="blue.400" borderRadius="5px" color="white">
            Submit
          </Button>
          <Button colorScheme="green" bg="green.600" borderRadius="5px" color="white">
            Review
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default qUnitText;
