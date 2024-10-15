// App.jsx
// This component defines the main routing structure for MentorMate. 

import { Routes, Route } from 'react-router-dom';

// Importing all the page components
import Account from './pages/Account';
import ChatMentor from './pages/ChatMentor';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Explore from './pages/Explore';
import Subject from './pages/Subjects';
import BioMainUnit from './pages/BioMainUnit';
import DynamicBioUnit from './pages/DynamicBioUnit';
import BioPaper2020 from './pages/BioPaper2020';
import BioPaper2021 from './pages/BioPaper2021';
import BioPaper2022 from './pages/BioPaper2022';

function App() {
  return (
    <Routes>
      {/* Main homepage route */}
      <Route path="/" element={<Home />} />

      {/* User authentication routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path='/signup' element={<SignUp />} />

      <Route path="/account" element={<Account />} />
      <Route path="/chat" element={<ChatMentor />} />

      <Route path='/explore' element={<Subject />} />

      {/* Dynamic route for different subjects */}
      <Route path="/explore/selectmode/:subjectname" element={<Explore />} /> 

      {/* Dynamic route for Biology units */}
      <Route path="/explore/selectmode/biology/biomainunit" element={<BioMainUnit />} />
      <Route path="/explore/selectmode/biology/biomainunit/unit/:unitId" element={<DynamicBioUnit />} /> {/* Dynamic unit page */}

      {/* Biology exam paper routes */}
      <Route path='/paper2020' element={<BioPaper2020 />} />
      <Route path='/paper2021' element={<BioPaper2021 />} />
      <Route path='/paper2022' element={<BioPaper2022 />} />
    </Routes>
  );
}






export default App;
