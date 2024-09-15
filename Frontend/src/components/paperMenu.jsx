import React from 'react';
import './paperMenu.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function PaperMenu({year}) {
  return (
    <>
      <Navbar/>
      <div className="container">
        <div className="text-container">
          <h1>Welcome to the Past Paper {year}</h1>
          <p>You can study MCQ part in Biology using frist paper option and study structured and essay paper using second paper option.</p>
          <button className="back-button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
        <div className="App1">
          <Link to="/biopaper2022">
            <button className="moving-button">
              FIRST PAPER
            </button>
          </Link>
          
          <Link to="/first-paper">
            <button className="moving-button">
              SECOND PAPER
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default PaperMenu;
