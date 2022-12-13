import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { login } from './Store/LoginSlice';

import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";

import { useEffect } from 'react';
import socketIO from "socket.io-client"
import PrivateComponent from './PrivateComponent';
import ChatWindow from './Components/ChatApp/ChatWindow';

const socket = socketIO.connect('https://naveenvenom.adaptable.app/');

function App() {
  console.log("run")
  const dispatch = useDispatch();
  let IsUserLogin = useSelector((s) => s.login);

  useEffect(()=>{
      let result = localStorage.getItem("VenomSignupForm");
      result = JSON.parse(result);
      if (result != null) {
        dispatch(login(result));
      }
    },[]);   
    

    

  return (
    <div className="App">

      <BrowserRouter>
         <Routes >
          <Route path='/chat' element={<ChatWindow socket={socket}/> }></Route>
          <Route path='/' element={<Signup 
          socket={socket} 
           ></Signup>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
