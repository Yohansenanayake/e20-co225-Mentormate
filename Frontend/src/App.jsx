import { Routes, Route } from 'react-router-dom';
import ChatMentor from './pages/ChatMentor';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Explore from './pages/Explore';
import Subject from './pages/Subjects';
import BioMainUnit from './pages/BioMainUnit';
import BioUnit1 from './pages/bioUnit1';
import BioUnit2 from './pages/bioUnit2';
import BioUnit3 from './pages/bioUnit3';
import BioUnit4 from './pages/bioUnit4';
import BioUnit5 from './pages/bioUnit5';
import BioUnit6 from './pages/bioUnit6';
import BioUnit7 from './pages/bioUnit7';
import BioUnit8 from './pages/BioUnit8';
import BioUnit9 from './pages/BioUnit9';
import BioUnit10 from './pages/BioUnit10';
import BioPaper2020 from './pages/BioPaper2020';
import BioPaper2021 from './pages/BioPaper2021';
import BioPaper2022 from './pages/BioPaper2022';






function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<ChatMentor />} />
      <Route path='/signup' element={<SignUp/>} />

      <Route path='/explore' element={<Subject/>} /> 
      {/* Dynamic route for different subjects */}
      <Route path="/explore/selectmode/:subjectname" element={<Explore />} /> {/* In Explore, selectmode is included*/} 

      {/* Biology routes */}
      <Route path="/explore/selectmode/biology/biomainunit" element={<BioMainUnit />} />
      <Route path="/explore/selectmode/biology/biomainunit/BioUnit1" element={<BioUnit1 />} /> {/* Ensure correct path */}
      <Route path="/explore/selectmode/biology/biomainunit/BioUnit2" element={<BioUnit2 />} />
      <Route path="/explore/selectmode/biology/biomainunit/BioUnit3" element={<BioUnit3 />} />
      <Route path="/explore/selectmode/biology/biomainunit/BioUnit4" element={<BioUnit4 />} />
      <Route path="/explore/selectmode/biology/biomainunit/BioUnit5" element={<BioUnit5 />} />
      <Route path="/explore/selectmode/biology/biomainunit/BioUnit6" element={<BioUnit6 />} />
      <Route path="/explore/selectmode/biology/biomainunit/BioUnit7" element={<BioUnit7 />} />
      <Route path="/explore/selectmode/biology/biomainunit/BioUnit8" element={<BioUnit8 />} />
      <Route path="/explore/selectmode/biology/biomainunit/BioUnit9" element={<BioUnit9 />} />
      <Route path="/explore/selectmode/biology/biomainunit/BioUnit10" element={<BioUnit10 />} />
      <Route path='/paper2020' element={<BioPaper2020/>} />
      <Route path='/paper2021' element={<BioPaper2021/>} />
      <Route path='/paper2022' element={<BioPaper2022/>} />


      

    </Routes>
  );
}

export default App;
