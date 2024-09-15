import React from 'react';
import { Card, CardHeader, CardBody, Heading, Text, CardFooter, Button, Box, Radio, RadioGroup, Stack, HStack } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

function Mcq({ question, questionId, options, isLocked, onAnswerChange, correctAnswer, userAnswer }) {
  const handleCheckboxChange = (value) => {
    let updatedAnswer;
    if (userAnswer.includes(value)) {
      // If value is already selected, remove it
      updatedAnswer = userAnswer.filter((answer) => answer !== value);
    } else {
      // Otherwise, add it to the selected values
      updatedAnswer = [...userAnswer, value];
    }
    onAnswerChange(questionId, updatedAnswer);  // Update the selected values
  };
  const isCorrect = correctAnswer.includes(userAnswer);


  return (
    <>
      <Card border="1px solid black" borderColor="black" bg="gray.400">
        <CardHeader>
          <Heading size="md" borderBottom="1px solid black" pb={2}>
            {typeof question === 'string' && question.includes('<')
              ? <Text fontSize="lg" mb={4} dangerouslySetInnerHTML={{ __html: question }} />
              : <Text fontSize="lg" mb={4}>{question}</Text>}
          </Heading>
        </CardHeader>

        <CardBody align="start">
          <Box>
          <RadioGroup onChange={(value) => onAnswerChange(questionId, value)} value={userAnswer || ""}>
              <Stack spacing={4}>
                {options.map((option, index) => (
                  <HStack alignItems="start" key={index}>
                    <Radio
                    value={option.value}
                    isDisabled={isLocked}  // Disable if the question is locked
                    />
                    {typeof option.label === 'string' && option.label.includes('<')
                      ? <span dangerouslySetInnerHTML={{ __html: option.label }} />
                      : <Box>{option.label}</Box>}
                  </HStack>
                ))}
              </Stack>
            </RadioGroup>
          </Box>
        </CardBody>

        {isLocked && (
          <CardFooter>
            <Text>
              Correct Answer: {correctAnswer} <br />
              Your Answer: {userAnswer} <br />
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </Text>
            <Button justifyContent="flex-end" ml="auto"
            colorScheme={isCorrect ? "green" : "red"} 
          >
            {isCorrect ? 'Correct' : 'Incorrect'}
          </Button>
          <Button colorScheme="green" justifyContent="flex-end">Review</Button>

          </CardFooter>
        )}

      </Card>
    </>
  );
}

export default Mcq;
