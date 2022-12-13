import './Login.css';
import './Signup.css';
import React, { useRef, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loginBanner from './Assets/Login.jpg';
import { useEffect } from 'react';
import NavBar from './NavBar';
import {login} from '../Store/LoginSlice';
import axios from 'axios';

const Login = () => {

  const disptach =  useDispatch();

  const navigate = useNavigate();
  const user = useSelector((s)=>s.login.loggedin);
  const IsLoggedIN = localStorage.getItem("VenomSignupForm");
  const [valid, Setvalid] = useState(false);
  const emailRef = useRef();
  const PasswordRef = useRef();
  var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  function submitForm()
  {
    if(PasswordRef.current.value.length>=6 && emailRef.current.value.match(pattern))
    axios.post("https://naveenvenom.adaptable.app/login", {"email":emailRef.current.value,"password": PasswordRef.current.value })
    .then((res) => {
      if(res.data.valid)
      {     
        let fromData =
        {
          "email": emailRef.current.value,
        }

            disptach(login(fromData));
            localStorage.setItem("VenomSignupForm", JSON.stringify(fromData));
      }
      else
      alert("Your PassWord in wrong")
      
      })
     else
     {
      alert("Enter correct Credential | Invalid format")
     } 
  
  }
  
  useEffect(()=>{
    if(IsLoggedIN)
    {
       navigate('/chat');
    }
  },[user]);



  return (
    <div>
      <NavBar></NavBar>
      <div className='Signup'>
        <div className="banner">
          <img src={loginBanner} alt="" srcset="" />
        </div>
        <div className="Greet">
          Welcome Again , Enter Your Credential  
        </div>

        <label htmlFor="email">Email</label>
        <input type="text" name='email' placeholder='example@test.com' ref={emailRef} />

        <label htmlFor="password">Password</label>
        <input type="password" name='password' placeholder='password'  ref={PasswordRef} />

        <div className="alert">

        </div>
        <button className={`trueactive`} onClick={submitForm}>Login</button>
      </div>
    </div>
  )
}
export default Login;