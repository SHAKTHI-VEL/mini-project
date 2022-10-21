import React from 'react';
import {
    BrowserRouter as Router,
   Routes,
    Route
  } from "react-router-dom";
  import context from './context/context'
  import Master from './Master'
  import Login from './components/test/Login'
  import Signup from './components/test/Signup'

// import { SpeechState, useSpeechContext } from "@speechly/react-client";


const App = () => {
    


  return (
    <>

        <Router>
            <Routes>
            <Route exact path="/" element={<Master/>} />
            <Route exact path="/login" element={ <Login />} /> 
            <Route exact path="/signup" element={ <Signup/>} />
            </Routes>
        </Router>
      
       
    </>

  )
}

export default App