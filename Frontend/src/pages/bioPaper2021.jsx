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


function BioPaper2021() {

  const [isLocked, setIsLocked] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});

  const correctAnswers = { 1: ['5'], 2: ['2'], 3: ['2','5'],4:['4'],5:['3'],6:['3'],7:['4'],8:['1'],9:['5'],10:['2'],11:['5'],12:['2'],13:['5'],14:['5'],15:['5'],16:['1'],17:['3'],18:['3'],19:['4'],20:['4'],21:['1'],22:['5'],23:['5'],24:['1'],25:['3'],26:['4'],27:['4'],28:['4'],29:['3'],30:['4'],31:['1'],32:['2'],33:['3'],34:['3'],35:['1'],36:['5'],37:['2'],38:['1'],39:['1'],40:['2'],41:['1','5'],42:['3'],43:['3'],44:['2'],45:['5'],46:['4'],47:['4'],48:['2','5'], 49: ['1'], 50: ['4'] }; 
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
        question="1.Which of the following is a non-reducing sugar?"
        questionId={1}
        options={[
          { value: "1", label: "(1) Ribose" },
          { value: "2", label: "(2) Lactose" },
          { value: "3", label: "(3) Maltose" },
          { value: "4", label: "(4) Galactose" },
          { value: "5", label: "(5) Sucrose" },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[1]}
          userAnswer={userAnswers[1]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 2. Which of the following statements regarding plasma membrane is correct?"
        questionId={2}
        options={[
          { value: "1", label: "(1) It is mainly composed of carbohydrates, phospholipids and proteins." },
          { value: "2", label: "(2) Phospholipid molecules are movable and provide a fluid nature to the membrane." },
          { value: "3", label: "(3) Peripheral proteins are tightly attached to the outer surface of the membrane." },
          { value: "4", label: "(4) Phospholipid bilayer enables nearby cells to communicate with each other." },
          { value: "5", label: "(5) Hydrophobic tails of phospholipids attach to cytoskeletal fibers and help to maintain the shape of the cell." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[2]}
          userAnswer={userAnswers[2]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 3. Select the correct ‘subcellular component - function” combination."
        questionId={3}
        options={[
          { value: "1", label: "(1) Glyoxysomes - Transport of residue materials out of the cell" },
          { value: "2", label: "(2) Smooth endoplasmic reticulum - Production of transport vesicles" },
          { value: "3", label: "(3) Rough endoplasmic reticulum - Metabolism of carbohydrates" },
          { value: "4", label: "(4) Nucleus - Synthesis of glycoproteins" },
          { value: "5", label: "(5) Peroxisomes - Photorespiration" },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[3]}
          userAnswer={userAnswers[3]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 4. Four events of meiosis are given below.<br/>
                      A - Centrosomes move towards opposite poles forming spindle.<br/>
                      B - Formation of synaptonemal complex<br/>
                      C - Pairs of homologous chromosomes arrange on metaphase plate.<br/>
                      D - Crossing over of chromatids<br/>
                      Which one of the following is the correct sequence of occurrence of above events?"
        questionId={4}
        options={[
          { value: "1", label: "(1) A, B, D, C" },
          { value: "2", label: "(2) A, C, B, D" },
          { value: "3", label: "(3) B, C, A, D" },
          { value: "4", label: "(4) B, D, A, C" },
          { value: "5", label: "(5) B, D, C, A" },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[4]}
          userAnswer={userAnswers[4]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="5. Which of the following statements regarding photosynthetic pigments is correct?"
        questionId={5}
        options={[
          { value: "1", label: "(1) Chlorophylls absorb yellow and blue light and reflect green light." },
          { value: "2", label: "(2) Chlorophyll b prevents the formation of reactive oxidative molecules." },
          { value: "3", label: "(3) Chlorophylis and carotenoids are located on the membrane system of thylakoids." },
          { value: "4", label: "(4) Carotenoids and chlorophyll a absorb light corresponding to the same wave lengths." },
          { value: "5", label: "(5) According to action spectrum, chlorophyll b is more effective for blue and red light." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[5]}
          userAnswer={userAnswers[5]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 6. In the light dedependant reaction of photosynthesis,"
        questionId={6}
        options={[
          { value: "1", label: "(1) cyclic electron flow occurs in photosystem II." },
          { value: "2", label: "(2) both linear and cyclic electron flows produce ATP and NADPH." },
          { value: "3", label: "(3) Primary electron acceptor of photosystem I reduces NADP and yields NADPH" },
          { value: "4", label: "(4) photosystem I gets electrons from splitting of water in the linear electron flow." },
          { value: "5", label: "(5) excited electrons at primary electron acceptor of photosystem I pass through an electron transport chain to photosystem II." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[6]}
          userAnswer={userAnswers[6]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="7. Which of following statements is most important in explaining the Darwin-Wallace theory?"
        questionId={7}
        options={[
          { value: "1", label: "(1) Organisms acquire suitable adaptations according to the needs of the environment during their lifetime." },
          { value: "2", label: "(2) Adaptations acquired during the lifetime are passed on to the next generation." },
          { value: "3", label: "(3) Favourable characters are passed to offspring through genetic factors." },
          { value: "4", label: "(4) Each species produce more offspring than the environment can accommodate." },
          { value: "5", label: "(5) Adaptations result in changes in genetic material." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[7]}
          userAnswer={userAnswers[7]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="8. Three genera with circular chromosomes, histones associated with DNA and several kinds of RNA polymerases are respectively"
        questionId={8}
        options={[
          { value: "1", label: "(1) <i>Thermococcus, Amoeba and Methanococcus.</i>" },
          { value: "2", label: "(2) <i>Methanococcus, Halobacteria and Nitrosomonas.</i>" },
          { value: "3", label: "(3) <i>Anabaena, Salmonella and Obelia.</i>" },
          { value: "4", label: "(4) <i>Halobacteria, Cycas and Nostoc.</i>" },
          { value: "5", label: "(5) <i>Pseudomonas, Anabaena and Cycas.</i>" },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[8]}
          userAnswer={userAnswers[8]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 9. Consider the statements A and B given below.<br/>
                      A - Seedless vascular plants are cvolutionarily closer to homworts than to mosses.<br/>
                      B - Seedless vascular plants bear spores.<br/>
                      Which of the following is correct regarding the above statements?"
        questionId={9}
        options={[
          { value: "1", label: "(1) A is correct and B is incorrect." },
          { value: "2", label: "(2) A is incorrect and B is correct." },
          { value: "3", label: "(3) Both A and B are incorrect." },
          { value: "4", label: "(4) Both A and B are correct and A is supported by B." },
          { value: "5", label: "(5) Both A and B are correct and A is not supported by B." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[9]}
          userAnswer={userAnswers[9]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 10. Four structures present in protists are as follows:<br/>
                      A - Multicellular thallus<br/>
                      B - Contractile vacuole<br/>
                      C - Pellicle<br/>
                      D - Cell wall<br/>
                      Organisms having A, B, C and D are respectively"
        questionId={10}
        options={[
          { value: "1", label: "(1) <i>Sargassum, diatoms, Amoeba and Ulva.</i>" },
          { value: "2", label: "(2) <i>Ulva, Euglena, Paramecium and Gelidium.</i>" },
          { value: "3", label: "(3) <i>Gelidium, Amoeba, Ulva and diatoms.</i>" },
          { value: "4", label: "(4) <i>Sargassum, Paramecium, Amoeba and Gelidium.</i>" },
          { value: "5", label: "(5) <i>Ulva, Euglena, Sargassum and diatoms.</i>" },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[10]}
          userAnswer={userAnswers[10]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="11. Which of the following indicate two features found in the organisms of the same phylum?<br/>
                    A : Heart absent; endoskeleton present.<br/>
                    B : Heart absent; jointed legs present.<br/>
                    C : Anus absent; tentacles present around the mouth.<br/>
                    D : Anus absent; show asexual reproduction.
                      "
        questionId={11}
        options={[
          { value: "1", label: "(1) A and B only." },
          { value: "2", label: "(2) A and C only." },
          { value: "3", label: "(3) A and D only." },
          { value: "4", label: "(4) A, B and C only." },
          { value: "5", label: "(5) A, C and D only." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[11]}
          userAnswer={userAnswers[11]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 12.Which of the following statements regarding companion cells is correct?"
        questionId={12}
        options={[
          { value: "1", label: "(1) They are dead at maturity." },
          { value: "2", label: "(2) They help in phloem unloading." },
          { value: "3", label: "(3) They connect with adjacent cells by desmosomes." },
          { value: "4", label: "(4) They are present alongside each sieve tube element in gymnosperms and angiosperms." },
          { value: "5", label: "(5) Their cytoplasm is reduced and present as a thin layer close to the cell wall." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[12]}
          userAnswer={userAnswers[12]}

      />
        
         <br></br>
        <br></br>
        <Mcq
        question=" 13. Select the correct statement regarding plant leaves."
        questionId={13}
        options={[
          { value: "1", label: "(1) Leaves are vertically arranged in some plants to capture light efficiently in low light conditions." },
          { value: "2", label: "(2) In monocot leaves, chloroplasts are more abundant in palisade mesophyll cells than in spongy mesophyll cells." },
          { value: "3", label: "(3) Angiosperms can be identified due to net-like venation of leaves." },
          { value: "4", label: "(4) Arrangement of leaves on the stem is called leaf orientation." },
          { value: "5", label: "(5) Plants inhabiting very cold environments bear smallest leaves." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[13]}
          userAnswer={userAnswers[13]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 14. Some events that occur at the source during phloem translocation of angiosperms according to pressure flow hypothesis are as follows,<br/>
                      A : Flow of water into sieve tube from xylem<br/>
                      B : Generation of positive pressure inside the sieve tube<br/>
                      C : Reduction of water potential inside the sieve tube<br/>
                    Correct sequence of the above events is  "
        questionId={14}
        options={[
          { value: "1", label: "(1) A, B and C." },
          { value: "2", label: "(2) A, C and B." },
          { value: "3", label: "(3) B, A and C." },
          { value: "4", label: "(4) B, C and A." },
          { value: "5", label: "(5) C, A and B." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[14]}
          userAnswer={userAnswers[14]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="15. Atmospheric air is the only source for which of the following elements required by plants?"
        questionId={15}
        options={[
          { value: "1", label: "(1) Chlorine" },
          { value: "2", label: "(2) Nitrogen" },
          { value: "3", label: "(3) Hydrogen" },
          { value: "4", label: "(4) Oxygen" },
          { value: "5", label: "(5) Carbon" },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[15]}
          userAnswer={userAnswers[15]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="16. Some characteristics of two species of plants are given below.<br/>
                    Species A : Sporophyte is dominant; gametophyte is reduced; sporophyte and gametophyte are photosynthetic and independent.<br/>
                    Species B : Sporophyte is dominant and photosynthetic; gametophyte is reduced and partially dependent on sporophyte.<br/>
                  Species A and B are respectively "
        questionId={16}
        options={[
          { value: "1", label: "(1) <i>Nephrolepis</i> sp. and <i>Selaginella</i> sp." },
          { value: "2", label: "(2) <i>Pogonatum</i> sp. and <i>Nephrolepis</i> sp." },
          { value: "3", label: "(3) <i>Selaginella</i> sp. and <i>Cycas</i> sp." },
          { value: "4", label: "(4) <i>Selaginella</i> sp. and <i>Nephrolepis</i> sp." },
          { value: "5", label: "(5) <i>Nephrolepis</i> sp. and <i>Cycas</i> sp." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[16]}
          userAnswer={userAnswers[16]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 17. Release of which of the following hormones in plants is stimulated by water deficit?"
        questionId={17}
        options={[
          { value: "1", label: "(1) Auxins" },
          { value: "2", label: "(2) Gibberellins" },
          { value: "3", label: "(3) Abscisic acid"},
          { value: "4", label: "(4) Cytokinins" },
          { value: "5", label: "(5) Ethylene" },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[17]}
          userAnswer={userAnswers[17]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 18. Which of the following ‘tissue - location’ combinations is correct regarding the human body?"
        questionId={18}
        options={[
          { value: "1", label: "(1) <b>Tissue</b>-Loose connective tissue  <b>Location</b>-Tendons" },
          { value: "2", label: "(2) <b>Tissue</b>-Adipose tissue  <b>Location</b>-Lining of the mouth" },
          { value: "3", label: "(3) <b>Tissue</b>-Stratified squamous epithelium  <b>Location</b>-Anus" },
          { value: "4", label: "(4) <b>Tissue</b>-Simple cuboidal epithelium  <b>Location</b>-Intestine" },
          { value: "5", label: "(5) <b>Tissue</b>-Pseudostratified epithelium  <b>Location</b>-Kidney tubules" },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[18]}
          userAnswer={userAnswers[18]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 19. In which of the following, will the release of (i) result in the stimulation of (ii)?<br/>
                      A : (i) Gastrin  (ii) Production of gastric juice<br/> 
                      B : (i) Cholecystokinin  (ii) Secretion of gastric juice<br/>
                      C : (i) Secretin  (ii) Release of bicarbonate ions from pancreas<br/> "
        questionId={19}
        options={[
          { value: "1", label: "(1) In A only" },
          { value: "2", label: "(2) In C only" },
          { value: "3", label: "(3) In A and B only"},
          { value: "4", label: "(4) In A and C only" },
          { value: "5", label: "(5) In B and C only" },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[19]}
          userAnswer={userAnswers[19]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="20. Which of the following is most likely to happen if tricuspid valve of the human heart does not close properly?"
        questionId={20}
        options={[
          { value: "1", label: "(1) Right atrium will not completely empty during atrial systole." },
          { value: "2", label: "(2) Left atrium will not completely empty during atrial systole." },
          { value: "3", label: "(3) Amount of blood that flows into right atrium will be reduced."},
          { value: "4", label: "(4) Amount of blood that flows into lungs will be reduced." },
          { value: "5", label: "(5) Some amount of blood will flow into left atrium from left ventricle during ventricular systole." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[20]}
          userAnswer={userAnswers[20]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 21.  which of the following, is (ii) caused by (i) during the homeostatic control of breathing of man? <br/>
                      A: (i) Carbon dioxide level in tissues increases.<br/>
                        (ii) Blood pH decreases.<br/>
                      B: (i) Medulla oblongata detects decreasing pH of cerebrospinal fluid.<br/>
                        (ii) Depth of ventilation of lungs decreases.<br/>
                      C: (i) Sensors in aorta detects high concentration of carbon dioxide in blood.<br/>
                        (ii) Medulla oblongata receives signals from aorta."
        questionId={21}
        options={[
          { value: "1", label: " (1) In A only." },
          { value: "2", label: " (2) In A and B only." },
          { value: "3", label: " (3) In A and C only."},
          { value: "4", label: " (4) In B and C only" },
          { value: "5", label: " (5) In A,B AND C." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[21]}
          userAnswer={userAnswers[21]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="22. B lymphocytes of humans"
        questionId={22}
        options={[
          { value: "1", label: " (1) complete the development in thymus." },
          { value: "2", label: " (2) are mainly responsible for cell mediated immunity" },
          { value: "3", label: " (3) are not involved in naturally acquired active immunity."},
          { value: "4", label: " (4) can differentiate into natural killer cells and helper cells." },
          { value: "5", label: " (5) contain antigen receptors on plasma membrane." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[22]}
          userAnswer={userAnswers[22]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="23. Excretory structures of crustaceans, annelids and flat worms are respectively"
        questionId={23}
        options={[
          { value: "1", label: " (1) green glands, body surface and flame cells." },
          { value: "2", label: " (2) salt glands, body surface and nephridia." },
          { value: "3", label: " (3) green glands, nephridia and body surface."},
          { value: "4", label: " (4) salt glands, flame cells and nephridia." },
          { value: "5", label: " (5) green glands, nephridia and flame cells." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[23]}
          userAnswer={userAnswers[23]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 24. Select the correct statement regarding human brain."
        questionId={24}
        options={[
          { value: "1", label: " (1) Brain stem is developed from embryonic mid brain and hind brain." },
          { value: "2", label: " (2) Frontal lobes of the cerebral cortex contain visual sensory areas." },
          { value: "3", label: " (3) Mid brain contains the fourth ventricle of the brain."},
          { value: "4", label: " (4) Corpus callosum connects the two hemispheres of the cerebellum." },
          { value: "5", label: " (5) Thalamus regulates the sleep and awake cycles." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[24]}
          userAnswer={userAnswers[24]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 25. Events that occur after the membrane potential of a neuron is changed above the threshold value are given below.<br/>
                      A : K<sup>+</sup> channels open and K<sup>+</sup>  outflow.<br/>
                      B : Na<sup>+</sup>  channels open and Na<sup>+</sup>  inflow.<br/>
                      C : Membrane becomes repolarized.<br/>
                      D : Membrane becomes depolarized.<br/>
                    Select the correct sequence of above events."
        questionId={25}
        options={[
          { value: "1", label: " (1) A,D,B,C" },
          { value: "2", label: " (2) B,C,A,D" },
          { value: "3", label: " (3) B,D,A,C"},
          { value: "4", label: " (4) C,A,D,B" },
          { value: "5", label: " (5) D,B,C,A" },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[25]}
          userAnswer={userAnswers[25]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 26. Select the response with the correct match of the hormone and its main function."
        questionId={26}
        options={[
          { value: "1", label: " (1) Adrenalin - mediates long term stress responses" },
          { value: "2", label: " (2) Prolactin - stimulates milk ejection" },
          { value: "3", label: " (3) Melatonin - regulates innate immunity"},
          { value: "4", label: " (4) Thyroxin - increases metabolic rate" },
          { value: "5", label: " (5) LH - stimulates spermatogenesis" },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[26]}
          userAnswer={userAnswers[26]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="27. In women, meiotic division of the secondary oocyte released at ovulation is arrested at"
        questionId={27}
        options={[
          { value: "1", label: "(1) prophase I."},
          { value: "2", label: "(2) metaphase I." },
          { value: "3", label: "(3) prophase II"},
          { value: "4", label: "(4) metaphase II" },
          { value: "5", label: "(5) anaphase I" },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[27]}
          userAnswer={userAnswers[27]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="28.  human development, amnion"
        questionId={28}
        options={[
          { value: "1", label: " (1) produces hCG." },
          { value: "2", label: " (2) becomes the main fetal portion of placenta." },
          { value: "3", label: " (3) protects the fetus from mother’s immune responses."},
          { value: "4", label: " (4) entirely surrounds the embryo." },
          { value: "5", label: " (5) serves as the source of primodial germ cells in the developing gonads of the fetus." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[28]}
          userAnswer={userAnswers[28]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="29. After birth, anteriorly convex curvatures of the vertebral column of humans are developed in the "
        questionId={29}
        options={[
          { value: "1", label: " (1) thoracic and sacral regions. " },
          { value: "2", label: " (2) thoracic and lumbar regions " },
          { value: "3", label: " (3) cervical and lumbar regions."},
          { value: "4", label: " (4) cervical and sacral regions." },
          { value: "5", label: " (5) lumbar and sacral regions." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[29]}
          userAnswer={userAnswers[29]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="30. Select the correct statement regarding human skeleton."
        questionId={30}
        options={[
          { value: "1", label: " (1) Articulation of axis vertebra with the occipital bone permits nodding movements of the head." },
          { value: "2", label: " (2) All carel bones in the upper limb contribute to form the wrist joint." },
          { value: "3", label: " (3) Osteoarthritis is a condition associated with reduction in bone density."},
          { value: "4", label: " (4) Patella articulates with the lower end of femur." },
          { value: "5", label: " (5) Maxilla is the only movable bone in the skull." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[30]}
          userAnswer={userAnswers[30]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="31. Certain plants of a paticular species bear purple flowers while other plants of the same species bear white flowers. To explain the inheritance of the flower colour of this plant species"
        questionId={31}
        options={[
          { value: "1", label:"(1) a monohybrid cross is sufficient."  },
          { value: "2", label:"(2) a dihybrid cross is sufficient." },
          { value: "3", label:"(3) a monohybrid cross and a dihybrid cross are necessary."},
          { value: "4", label:"(4) knowledge of incomplete dominance is necessary."},
          { value: "5", label:"(5) knowledge of gene linkage is necessary." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[31]}
          userAnswer={userAnswers[31]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="32. Non coding sequences and DNA segments without any identified function in the chromosomes of eukaryotes are respectively"
        questionId={32}
        options={[
          { value: "1", label: " (1) heterochromatin and introns." },
          { value: "2", label: " (2) introns and intergenic DNA." },
          { value: "3", label: " (3) heterochromatin and intergenic DNA."},
          { value: "4", label: " (4) euchromatin and introns." },
          { value: "5", label: " (5) euchromatin and intergenic DNA." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[32]}
          userAnswer={userAnswers[32]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="33. Select the correct statement regarding the synthesis of polypeptides."
        questionId={33}
        options={[
          { value: "1", label: " (1) Except for having U in mRNA instead of T in DNA, the base sequences of DNA template and its mRNA molecule are similar." },
          { value: "2", label: " (2) An mRNA molecule of a prokaryote cannot code a polypeptide in an eukaryote." },
          { value: "3", label: " (3) Start codon of an mRNA molecule is AUG and it provides the code for methionine."},
          { value: "4", label: " (4) There are 64 codons and 62 of them provide codes for amino acids." },
          { value: "5", label: " (5) The first triplet of bases in a tRNA molecule is AUG." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[33]}
          userAnswer={userAnswers[33]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="34. Restriction maps are mostly important in"
        questionId={34}
        options={[
          { value: "1", label: " (1) identifying multiple copies of genes in a genome." },
          { value: "2", label: " (2) determining evolutionary relationships of different species." },
          { value: "3", label: " (3) constructing cloning vectors."},
          { value: "4", label: " (4) diagnosing cancers." },
          { value: "5", label: " (5) paternity testing." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[34]}
          userAnswer={userAnswers[34]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="35. Three animals that live in tundra are"
        questionId={35}
        options={[
          { value: "1", label: " (1) caribou, wolf and bear." },
          { value: "2", label: " (2) siberian tiger, fox and brown bear." },
          { value: "3", label: " (3) reindeer, tiger and moose."},
          { value: "4", label: " (4) reindeer, siberian tiger and bear." },
          { value: "5", label: " (5) musk oxen, fox and moose." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[35]}
          userAnswer={userAnswers[35]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="36. Select the response that indicates a relict species and a species endemic to Sri Lanka respectively."
        questionId={36}
        options={[
          { value: "1", label: " (1) <i>Acanthus ilicifolius and Dipterocarpus zeylanicus</i>" },
          { value: "2", label: " (2) <i>Panicum maximum and Garcinia quaesita</i>" },
          { value: "3", label: " (3) <i>Ichthyophis sp. and Salacia reticulata</i>"},
          { value: "4", label: " (4) <i>Crudia zeylanica and Puntius nigrofasciatus</i>" },
          { value: "5", label: " (5) <i>Lingula sp. and Loris tardigradus</i>" },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[36]}
          userAnswer={userAnswers[36]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="37. Three gases that contribute to acid rain, global warming and ozone layer depletion are respectively"
        questionId={37}
        options={[
          { value: "1", label: " (1) carbon dioxide, perfluorocarbon and helene." },
          { value: "2", label: " (2) sulphur dioxide, hydrofluorocarbon and methyl bromide (MeBr)." },
          { value: "3", label: " (3) nitrous oxide, methane and carbon monoxide."},
          { value: "4", label: " (4) nitric oxide, helene and chlorofiuorocarbon." },
          { value: "5", label: " (5) nitrogen dioxide, sulphur hexafluoride and methane." },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[37]}
          userAnswer={userAnswers[37]}

      />

        <br></br>
        <br></br>
        <Mcq
        question= " 38. Which of the following antibiotics inhibits the synthesis of DNA/RNA in bacteria?"
        questionId={38}
        options={[
          { value: "1", label: " (1) Rifampin" },
          { value: "2", label: " (2) Daptomycin" },
          { value: "3", label: " (3) Penicillin"},
          { value: "4", label: " (4) Erythromycin" },
          { value: "5", label: " (5) Tetracycline" },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[38]}
          userAnswer={userAnswers[38]}

      />

        <br></br>
        <br></br>
        <Mcq
        question=" 39. Which of the following statements regarding microorganisms is correct?"
        questionId={39}
        options={[
          { value: "1", label: " (1) Pathogenic fungi in a rhizosphere obtain nutrients from compounds exuded from plant roots." },
          { value: "2", label: " (2) Some bacteria secrete alkaline compounds that contribute to release of phosphorus to soil solution." },
          { value: "3", label: " (3) Actinomycetes carry out composting more efficiently under anaerobic conditions."},
          { value: "4", label: " (4) Rhizobia form symbiotic associations with both leguminous plants and Azolla." },
          { value: "5", label: " (5) Vitamin C can be produced by <i>Azotobacter spp.</i>" },
        ]}
        isLocked={isLocked}
          onAnswerChange={handleAnswerChange}
          correctAnswer={correctAnswers[39]}
          userAnswer={userAnswers[39]}

      />

        <br></br>
        <br></br>
        <Mcq
        question="40. Which of the following is a step in the primary treatment of purification of industrial waste water?"
        questionId={40}
        options={[
          { value: "1", label: " (1) Spraying over a bed of rocky material" },
          { value: "2", label: " (2) Removal of oil and grease" },
          { value: "3", label: " (3) Mechanical aeration"},
          { value: "4", label: " (4) Anaerobic decomposition" },
          { value: "5", label: " (5) Disinfection" },
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
        question="41. Which of the following is/are common to both ethyl alcohol fermentation and lactic fermantation?<br/>
                      (A) One molecule of glucose is converted to two molecules of pyruvate.<br/>
                      (B) Two molecules of ATP and two molecules of NADH are released.<br/>
                      (C) NADH is used to reduce acetaldehyde.<br/>
                      (D) Final hydrogen acceptor is an organic compound.<br/>
                      (E) One molecule of carbon dioxide is released."
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
        question="42. During the primary growth of roots,<br/>
                    (A) root apical meristem produces new cells to both sides.<br/>
                    (B) the cells produced outward by the root apical meristem form root cap.<br/>
                    (C) vascular tissues are produced by vascular cambium.<br/>
                    (D) some cells produced outward by the root apical meristem elongate and push the root through soil.<br/>
                    (E) epidermis splits due to being pushed outward."
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
        question="43. Which of the following statements is/are correct regarding blood circulation of vertebrates?<br/>
                    (A) Animals with single circulation do not have lungs.<br/>
                    (B) In single circulation, blood flows from respiratory organs to other organs under a reduced pressure.<br/>
                    (C) Animals with single circulation have two or three chambers in the heart.<br/>
                    (D) In double circulation, blood flows through lungs twice during a complete circulation through the body.<br/>
                    (E) Myoglobin is not present in the muscles of animals having a single circulation."
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
        question="44. Sensory receptors<br/>
                  (A) are connected with the nervous system.<br/>
                  (B) include specialized glands designed to receive specific stimuli.<br/>
                  (C) show sensory adaptation.<br/>
                  (D) can amplify the sensory signal.<br/>
                  (E) detect the stimuli that arise only in the external environment."
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
        question="45. Leydig cells<br/>
                    (A) secrete testosterone.<br/>
                    (B) produce the fluid required for transport of sperm.<br/>
                    (C) nourish the cells in different stages of spermatogenesis.<br/>
                    (D) are located in the connective tissue among seminiferous tubules.<br/>
                    (E) provide attachment for cells in different stages of spermatogenesis."
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
        question="46. Which of the following could be the reason/reasons for cystic fibrosis?<br/>
                      (A) Y-linked inheritance<br/>
                      (B) X-linked recessive inheritance<br/>
                      (C) Pleiotropy<br/>
                      (D) Autosomal recessive inheritance<br/>
                      (E) Autosomal dominant inheritance  "
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
        question="47. Which of the following ecological pyramids could be inverted?<br/>
                     (A) Pyramid of biomass in a forest<br/>
                     (B) Pyramid of numbers in the ocean<br/>
                     (C) Pyramid of biomass in the ocean<br/>
                     (D) Pyramid of numbers in a parasitic system<br/>
                     (E) Pyramid of biomass in a parasitic system"
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
        question="48.Select the response/responses with the correct match of feature and example of microorganisms.<br/>
                    (A) Icosahedron symmetry — Adeno virus.<br/>
                    (B) Obligate aerobic respiration - Clostridium sp.<br/>
                    (C) Reproduce in leaf hoppers and plants — Phytoplasma.<br/>
                    (D) Reproduce by budding and binary fission — Mycoplasma<br/>
                    (E) Photoheterotrophic nutrition — Purple sulphur bacteria"
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
        question="49. Stem cells<br/>
                    (A) can give rise to cells of the same type.<br/>
                    (B) can divide without a limit.<br/>
                    (C) are of three types.<br/>
                    (D) are undifferentiated cells.<br/>
                    (E) divide rapidly."
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
        question="50. Which of the following could be used to control dengue vector as well as filaria vector?<br/>
                       (A) Construction of buildings without roof gutters<br/>
                       (B) Mosquito proofing of domestic wells<br/>
                       (C) Preventing creation of vector breeding sites<br/>
                       (D) Use of fish that feed on mosquito larvae<br/>
                       (E) Repairing broken septic tasks."
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

export default BioPaper2021