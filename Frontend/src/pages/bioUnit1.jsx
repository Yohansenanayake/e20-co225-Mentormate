import React from 'react'
import QUnitText from "../components/qUnitText"
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function BioUnit1() {
  return (
    <>
    <Navbar/>
    <br/><br/>
    <br/>
        <QUnitText question="1. Mention Three methods that can be used based on biological knowledge for sustainable food production."/>
        <br/>
        <QUnitText question= "2. What is adaptation?"/>
        <br/>
        <QUnitText question="3. Specify the three main branches studied under Biology"/>
        <br/>
        <QUnitText question="4. What are natural resources?"/>
        <br/>
        <QUnitText question="5. Define irritability."/>
        <br/>
        <QUnitText question="6. Adaptation is a characteristic feature of living organisms. Describe how ."/>
        <br/>
        <QUnitText question="7. Adaptation is a characteristic feature of living organisms. Describe how ."/>
        <br/>
        <QUnitText question="8. What is Sustainable Food Production?"/>
        <br/>

    </>
  )
}

export default BioUnit1