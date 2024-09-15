import React, { useState } from 'react'
import Mcq from "../components/mcq";
import Navbar from '../components/Navbar';
import InstructioncardBio from '../components/instructioncardBio';
import { ChakraProvider } from '@chakra-ui/react';
// import q31_1 from '../assets/paper22/q31_1.png';
// import q31_2 from '../assets/paper22/q31_2.png';
// import q31_3 from '../assets/paper22/q31_3.png';
// import q31_4 from '../assets/paper22/q31_4.png';
// import q31_5 from '../assets/paper22/q31_5.png';
// import q36 from '../assets/paper22/q36.png';
import { Button, Stack,Text,Box } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons';


function BioPaper2020() {

  const [isLocked, setIsLocked] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});

  const correctAnswers = { 1: ['3'], 2: ['2'], 3: ['5'],4:['3'],5:['2'],6:['1'],7:['5'],8:['1'],9:['3'],10:['4'],11:['3'],12:['2','4'],13:['5'],14:['4'],15:['5'],16:['2'],17:['1'],18:['3'],19:['3'],20:['4'],21:['1'],22:['5'],23:['4'],24:['5'],25:['3'],26:['1'],27:['3'],28:['4'],29:['1','2','3','4','5'],30:['4'],31:['4'],32:['1'],33:['2'],34:['3'],35:['1','2','3','4','5'],36:['1'],37:['4'],38:['4'],39:['2'],40:['5'],41:['4'],42:['3'],43:['2'],44:['2'],45:['5'],46:['5'],47:['2'],48:['3'], 49: ['1'], 50: ['5'] }; 
  const [marks, setMarks] = useState({
    correct: 0,
    incorrect: 0,
    unanswered: 0
  }); 

  const handleAnswerChange = (questionId, selectedValue) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedValue,
    }));
  };


  const handleSubmit = () => {
    setIsLocked(true);

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    // Iterate through all questions
    Object.keys(correctAnswers).forEach((questionId) => {
      const correctAnswerArray = correctAnswers[questionId]; // Correct answers
      const userAnswer = userAnswers[questionId]; // User's selected answer

      if (userAnswer === undefined || userAnswer === "") {
        // Question was not answered
        unansweredCount += 1;
      } else if (correctAnswerArray.includes(userAnswer)) {
        // Correct answer
        correctCount += 1;
      } else {
        // Incorrect answer
        incorrectCount += 1;
      }
    });

    setMarks({
      correct: correctCount,
      incorrect: incorrectCount,
      unanswered: unansweredCount
    });
  };
  return (
    <>
    <Navbar/>
        <br></br>
        <br></br>
        <br></br>
        <Mcq
        question="1."
        questionId={1}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) " },
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[1]}
          userAnswer={userAnswers[1]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 2. "
        questionId={2}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) " },
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[2]}
          userAnswer={userAnswers[2]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 3. "
        questionId={3}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) " },
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[3]}
          userAnswer={userAnswers[3]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 4. "
        questionId={4}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) " },
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[4]}
          userAnswer={userAnswers[4]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="5. "
        questionId={5}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) " },
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[5]}
          userAnswer={userAnswers[5]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 6. "
        questionId={6}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) " },
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[6]}
          userAnswer={userAnswers[6]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="7. "
        questionId={7}
        options={[
          { value: "1", label: "(1)  " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) " },
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[7]}
          userAnswer={userAnswers[7]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="8. "
        questionId={8}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) " },
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[8]}
          userAnswer={userAnswers[8]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 9. "
        questionId={9}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) " },
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[9]}
          userAnswer={userAnswers[9]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 10. "
        questionId={10}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) " },
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[10]}
          userAnswer={userAnswers[10]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="11. "
        questionId={11}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) " },
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[11]}
          userAnswer={userAnswers[11]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 12."
        questionId={12}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) " },
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[12]}
          userAnswer={userAnswers[12]}

      />
        
         <br></br>
        <br></br>
        <Mcq
        question=" 13. "
        questionId={13}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) " },
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[13]}
          userAnswer={userAnswers[13]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 14. "
        questionId={14}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) " },
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[14]}
          userAnswer={userAnswers[14]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="15. "
        questionId={15}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) " },
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[15]}
          userAnswer={userAnswers[15]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="16. "
        questionId={16}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) " },
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[16]}
          userAnswer={userAnswers[16]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 17. "
        questionId={17}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) "},
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[17]}
          userAnswer={userAnswers[17]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 18. "
        questionId={18}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) " },
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[18]}
          userAnswer={userAnswers[18]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 19. "
        questionId={19}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) "},
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[19]}
          userAnswer={userAnswers[19]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="20. "
        questionId={20}
        options={[
          { value: "1", label: "(1) " },
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) "},
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[20]}
          userAnswer={userAnswers[20]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 21. "
        questionId={21}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[21]}
          userAnswer={userAnswers[21]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="22. "
        questionId={22}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[22]}
          userAnswer={userAnswers[22]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="23. "
        questionId={23}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[23]}
          userAnswer={userAnswers[23]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 24. "
        questionId={24}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[24]}
          userAnswer={userAnswers[24]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 25. "
        questionId={25}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[25]}
          userAnswer={userAnswers[25]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 26. "
        questionId={26}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[26]}
          userAnswer={userAnswers[26]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="27. "
        questionId={27}
        options={[
          { value: "1", label: "(1) "},
          { value: "2", label: "(2) " },
          { value: "3", label: "(3) "},
          { value: "4", label: "(4) " },
          { value: "5", label: "(5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[27]}
          userAnswer={userAnswers[27]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="28. "
        questionId={28}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[28]}
          userAnswer={userAnswers[28]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="29. "
        questionId={29}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[29]}
          userAnswer={userAnswers[29]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="30. "
        questionId={30}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[30]}
          userAnswer={userAnswers[30]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="31. "
        questionId={31}
        options={[
          { value: "1", label: ""  },
          { value: "2", label:"" },
          { value: "3", label:""},
          { value: "4", label: ""},
          { value: "5", label: "" },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[31]}
          userAnswer={userAnswers[31]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="32. "
        questionId={32}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[32]}
          userAnswer={userAnswers[32]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="33. "
        questionId={33}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[33]}
          userAnswer={userAnswers[33]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="34. "
        questionId={34}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[34]}
          userAnswer={userAnswers[34]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="35. "
        questionId={35}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[35]}
          userAnswer={userAnswers[35]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=""
        questionId={36}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[36]}
          userAnswer={userAnswers[36]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="37. "
        questionId={37}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[37]}
          userAnswer={userAnswers[37]}

      />

        <br></br>
        <br></br>
        <Mcq
        question= " 38. "
        questionId={38}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[38]}
          userAnswer={userAnswers[38]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 39. "
        questionId={39}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[39]}
          userAnswer={userAnswers[39]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="40. "
        questionId={40}
        options={[
          { value: "1", label: " (1) " },
          { value: "2", label: " (2) " },
          { value: "3", label: " (3) "},
          { value: "4", label: " (4) " },
          { value: "5", label: " (5) " },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[40]}
          userAnswer={userAnswers[40]}

      />
      {/* bio paper instructions */}
      <InstructioncardBio/>

        <br></br>
        <br></br>
        <Mcq
        question="41. "
        questionId={41}
        options={[
            { value: "1", label: " (1) " },
            { value: "2", label: " (2) " },
            { value: "3", label: " (3) "},
            { value: "4", label: " (4) " },
            { value: "5", label: " (5) " },
          ]}
          isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[41]}
          userAnswer={userAnswers[41]}
      />

<br></br>
        <br></br>
        <Mcq
        question="42. "
        questionId={42}
        options={[
            { value: "1", label: " (1) " },
            { value: "2", label: " (2) " },
            { value: "3", label: " (3) "},
            { value: "4", label: " (4) " },
            { value: "5", label: " (5) " },
          ]}
          isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[42]}
          userAnswer={userAnswers[42]}
      />

<br></br>
        <br></br>
        <Mcq
        question="43. "
        questionId={43}
        options={[
            { value: "1", label: " (1) " },
            { value: "2", label: " (2) " },
            { value: "3", label: " (3) "},
            { value: "4", label: " (4) " },
            { value: "5", label: " (5) " },
          ]}
          isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[43]}
          userAnswer={userAnswers[43]}
      />

        <br></br>
        <br></br>
        <Mcq
        question="44. "
        questionId={44}
        options={[
            { value: "1", label: " (1) " },
            { value: "2", label: " (2) " },
            { value: "3", label: " (3) "},
            { value: "4", label: " (4) " },
            { value: "5", label: " (5) " },
          ]}
          isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[44]}
          userAnswer={userAnswers[44]}
      />

        <br></br>
        <br></br>
        <Mcq
        question="45. "
        questionId={45}
        options={[
            { value: "1", label: " (1) " },
            { value: "2", label: " (2) " },
            { value: "3", label: " (3) "},
            { value: "4", label: " (4) " },
            { value: "5", label: " (5) " },
          ]}
          isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[45]}
          userAnswer={userAnswers[45]}
      />

        <br></br>
        <br></br>
        <Mcq
        question="46. "
        questionId={46}
        options={[
            { value: "1", label: " (1) " },
            { value: "2", label: " (2) " },
            { value: "3", label: " (3) "},
            { value: "4", label: " (4) " },
            { value: "5", label: " (5) " },
          ]}
          isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[46]}
          userAnswer={userAnswers[46]}
      />

        <br></br>
        <br></br>
        <Mcq
        question="47. "
        questionId={47}
        options={[
            { value: "1", label: " (1) " },
            { value: "2", label: " (2) " },
            { value: "3", label: " (3) "},
            { value: "4", label: " (4) " },
            { value: "5", label: " (5) " },
          ]}
          isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[47]}
          userAnswer={userAnswers[47]}
      />

        <br></br>
        <br></br>
        <Mcq
        question="48. "
        questionId={48}
        options={[
            { value: "1", label: " (1) " },
            { value: "2", label: " (2) " },
            { value: "3", label: " (3) "},
            { value: "4", label: " (4) " },
            { value: "5", label: " (5) " },
          ]}
          isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[48]}
          userAnswer={userAnswers[48]}
      />

        <br></br>
        <br></br>
        <Mcq
        question="49. "
        questionId={49}
        options={[
            { value: "1", label: " (1) " },
            { value: "2", label: " (2) " },
            { value: "3", label: " (3) "},
            { value: "4", label: " (4) " },
            { value: "5", label: " (5) " },
          ]}
          isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[49]}
          userAnswer={userAnswers[49]}
      />

        <br></br>
        <br></br>
        <Mcq
        question="50. "
        questionId={50}
        options={[
            { value: "1", label: " (1) " },
            { value: "2", label: " (2) " },
            { value: "3", label: " (3) "},
            { value: "4", label: " (4) " },
            { value: "5", label: " (5) " },
          ]}
          isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[50]}
          userAnswer={userAnswers[50]}
      />
      <br></br>
      <br></br>
      
      <Stack direction='row' spacing={4}>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme='teal'
            variant='outline'
            onClick={handleSubmit}
            isDisabled={isLocked}
          >
            Submit Biology First Part
          </Button>
          <br></br>
          
          
        </Stack>

        {isLocked && (
          
          <Box mt={4}>
          <Text fontSize="xl">Your Results:</Text>
          <Text>Correct Answers: {marks.correct}</Text>
          <Text>Incorrect Answers: {marks.incorrect}</Text>
          <Text>Unanswered Questions: {marks.unanswered}</Text>
          <Text fontSize="lg" mt={2}>
            Total Marks: {marks.correct} / {Object.keys(correctAnswers).length}
          </Text>

          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme='teal'
            variant='outline'
            // onClick={handleSubmit}
          >
            Go to paper menu
          </Button>
          
        </Box>
        )}
    </>
  )
}

export default BioPaper2020;