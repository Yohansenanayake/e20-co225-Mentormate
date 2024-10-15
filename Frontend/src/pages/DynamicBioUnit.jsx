import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QUnitText from "../components/qUnitText";
import Navbar from '../components/Navbar';
import apiServices from '../services/apiServices';
import { Box, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Text, ModalFooter } from '@chakra-ui/react';

/* DynamicBioUnit component 
  - Displays a set of questions for a selected unit dynamically by fetching from the backend.
*/
function DynamicBioUnit() {
  const { unitId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchQuestions = () => {
      setLoading(true);
      apiServices.get(`/questions?unit_id=${unitId}`)
        .then(response => {
          setQuestions(response.data.questions);
          setLoading(false);
        })
        .catch(error => {
          setError(error.response?.data?.error || "An error occurred");
          setLoading(false);
          onOpen();  // Open the error modal
        });
    };

    fetchQuestions();
  }, [unitId, onOpen]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="gray.800"
        color="white"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <br/><br/><br/>
      {questions.map((q) => (
        <div key={q.question_no}>
          <QUnitText 
            question={`${q.question_no}. ${q.question_text}`} 
            UnitNo={q.unit_no} 
            QuestionNo={q.question_no} 
            QuestionID={q.question_id} 
          />
          <br/>
        </div>
      ))};

      {/* Error Modal */}
      {error && (<Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="gray.800">
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay  bg='blackAlpha.600' backdropFilter='blur(10px) hue-rotate(90deg)'/>
        <ModalContent bg={'red.100'} >
          <ModalHeader color={'red.600'}>Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color="red.600" >{error}</Text>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
      )}

    </>
  );
}

export default DynamicBioUnit;
