//BioMainUnit.jsx - Main biology page containing all the units

import React from 'react';
import { Box, Flex, Image, Text, SimpleGrid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

//import images
import unit1 from '../assets/unit1.png';
import unit2 from '../assets/unit2.jpg';
import unit3 from '../assets/unit3.jpg';
import unit4 from '../assets/unit4.jpg';
import unit5 from '../assets/unit5.jpg';
import unit6 from '../assets/unit6.jpg';
import unit7 from '../assets/unit7.jpg';
import unit8 from '../assets/unit8.jpg';
import unit9 from '../assets/unit9.jpg';
import unit10 from '../assets/unit10.jpg';
import paper from '../assets/paper.jpg';

/**
 * UnitCard component to render individual units as clickable cards.
 * Props:
 * - imageSrc: The image source for the card
 * - text: The text label for the unit
 * - onClick: Callback function when the card is clicked
 */

const UnitCard = ({ imageSrc, text, onClick }) => (
  <Box
    as="button"
    marginTop="60px"
    onClick={onClick}
    borderRadius="lg"
    overflow="hidden"
    borderWidth="1px"
    maxW="250px"
    _hover={{ transform: 'scale(1.05)', transition: '0.2s ease-in-out' }}
  >
    <Image src={imageSrc} alt={text} boxSize="250px" objectFit="cover" />
    <Box p="5" boxShadow="lg" bg="gray.300" color="indigo.200" fontWeight="bold"  >
      <Text textAlign="center">{text}</Text>
    </Box>
  </Box>
);

/**
 * BioMainUnit component to display the main biology unit selection screen.
 * It includes a grid of clickable units, each leading to its respective unit page.
 */
function BioMainUnit() {
  const navigate = useNavigate();

  const handleNavigation = (unitNumber) => {
    navigate(`/explore/selectmode/biology/biomainunit/unit/${unitNumber}`);
  };
  

  return (
    <>
      <Navbar />
      
      <Box 
      p="4"
      bg="gray.400"
      >
        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing="40px">
          <UnitCard
            imageSrc={unit1}
            text="Unit 01: Introduction to Biology"
            onClick={() => handleNavigation(1)}
          />
          <UnitCard 
            imageSrc={unit2} 
            text="Unit 02: Chemical and Cellular basis of life" 
            onClick={() => handleNavigation(2)}
          />
          <UnitCard 
            imageSrc={unit3} 
            text="Unit 03: Evolution and diversity of organisms" 
            onClick={() => handleNavigation(3)}
          />
          <UnitCard 
            imageSrc={unit4} 
            text="Unit 04: Plant form and function" 
            onClick={() => handleNavigation(4)}
          />
          <UnitCard 
            imageSrc={unit5} 
            text="Unit 05: Animal form and function" 
            onClick={() => handleNavigation(5)}
          />
          <UnitCard 
            imageSrc={unit6} 
            text="Unit 06: Genetics" 
            onClick={() => handleNavigation(6)}
          />
          <UnitCard 
            imageSrc={unit7} 
            text="Unit 07: Molecular Biology" 
            onClick={() => handleNavigation(7)}
          />
          <UnitCard 
            imageSrc={unit8} 
            text="Unit 08: Environmental Biology" 
            onClick={() => handleNavigation(8)}
          />
          <UnitCard 
            imageSrc={unit9} 
            text="Unit 09: Microbiology" 
            onClick={() => handleNavigation(9)}
          />
          <UnitCard 
            imageSrc={unit10} 
            text="Unit 10: Applied Biology" 
            onClick={() => handleNavigation(10)}
          />
          
          <UnitCard imageSrc={paper} text="A/L 2022 paper" onClick={() => navigate('/paper2022')} />
          <UnitCard imageSrc={paper} text="A/L 2021 paper" onClick={() => navigate('/paper2021')} />
          <UnitCard imageSrc={paper} text="A/L 2020 paper" onClick={() => navigate('/paper2020')} />
        </SimpleGrid>
      </Box>
    </>
  );
}

export default BioMainUnit;
