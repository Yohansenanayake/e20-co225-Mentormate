import React from "react";
import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import SubCardBio from "../components/SubCardBio";
import SubCardPhy from "../components/SubCardPhy";
import SubCardMath from "../components/SubCardMath";
import SubCardChem from "../components/SubCardChem";

function Subject() {

    const navigate = useNavigate();

    const handleNavigation = (subjectName) => {
    navigate(`/explore/selectmode/${subjectName}`);
  };

  return (
    <>
      <Navbar className="navbar-sub" />
      <Box 
        
        minHeight="100vh"// Ensure the background covers the entire viewport
        bg='#ABC8E4'
        //bgGradient="linear(to-r, #858e96, #2b7ccd)" // Gradient background
        paddingTop="80px"
        
        
        >
        {/* Main Header */}
        <Heading 
          as="h1" 
          fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }} 
          color="#0D1626" 
          textShadow="2px 2px 8px rgba(0, 0, 0, 0.5)"
          letterSpacing="widest" 
          top="70px" 
          textAlign="center"
          textTransform="capitalize"
          fontFamily="Poppins, sans-serif"
          fontWeight="bold"
        >
          SUBJECTS
        </Heading>

        {/* Card Container */}
        <Flex 
          wrap="wrap" 
          gap="20px" 
          marginTop="130px" // Space below the header
          marginLeft="20px" // Align with the header
          justifyContent="start"
          
        >
          <Box flex="1 1 calc(25% - 20px)" minW="250px" onClick={() => handleNavigation('biology')}>
            <SubCardBio />
          </Box>
          <Box flex="1 1 calc(25% - 20px)" minW="250px" onClick={() => handleNavigation('physics')}>
            <SubCardPhy />
          </Box>
          <Box flex="1 1 calc(25% - 20px)" minW="250px" onClick={() => handleNavigation('math')}>
            <SubCardMath />
          </Box>
          <Box flex="1 1 calc(25% - 20px)" minW="250px" onClick={() => handleNavigation('chemistry')}>
            <SubCardChem />
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Subject;
