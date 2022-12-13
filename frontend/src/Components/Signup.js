import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import './Signup.css';
import loginBanner from './Assets/Login.jpg';
import axios from 'axios';
import Modal from './Modal';
import { login } from '../Store/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Loader from './Loader';

const Signup = ({socket}) => {
  const [username, Setusername] = useState("");
  const [fullname, Setfullname] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [valid, setValid] = useState(false);

  const buttonValidity = useRef();
  const usernameRef = useRef();
  const fullnameRef = useRef();
  const emailRef = useRef();
  const PasswordRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.login.loggedin);
  const IsLoggedIN = localStorage.getItem("VenomSignupForm");
  useEffect(() => {
    if (IsLoggedIN) {
      navigate('/chat');
    }
  }, [user]);

  //checkValidity
  function CheckValidity(e) {
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (emailRef.current.value.match(pattern) && fullnameRef.current.value.length > 3 && username.current.value.length > 2) {
      setValid(true);
    }
    else {
      setValid(false);
    }
  }


  //checkPassword
  function checkPassword() {
    let Passwordstr = PasswordRef.current.value;
    if (Passwordstr.length >= 6) {
     
      setValid(true);
      document.getElementsByClassName('alert')[0].innerText = "";
    }
    else {
      setValid(false);
      document.getElementsByClassName('alert')[0].innerText = "Enter a Password at least 6 words";
    }
  }

  //Form Submission
  function submitForm() {
    if (valid) {
      const fromData =
      {
        "username": usernameRef.current.value,
        "fullname": fullnameRef.current.value,
        "email": emailRef.current.value,
      }
      console.log("submitting");
      axios.post("https://naveenvenom.adaptable.app/signup", { ...fromData, "password": PasswordRef.current.value })
        .then((res) => {
          console.log(res);
          if (res.data.EmailValid){
            
            dispatch(login(fullnameRef.current.value));
            localStorage.setItem("VenomSignupForm", JSON.stringify(fromData));
            
          }
          else {
            console.log("Email is not Valid");
            document.getElementsByClassName("modalClass")[0].style.display = "flex";
            setTimeout(() => {
              document.getElementsByClassName("modalClass")[0].style.display = "none";
            }, 1000)
          }
        })
    }
    if (!valid) {
      document.getElementsByClassName('alert')[0].innerText = "Enter All Feilds OR Enter a Valid email";
    }
  }

  return (
    <div className="SignupWrapper">
      <NavBar></NavBar>
      <Modal></Modal>
      {/* <Loader></Loader> */}
      <div className='Signup'>
        <div className="banner">
          <img src={loginBanner} alt="" srcset="" />
        </div>
        <div className="Greet">
          Welcome , New User Signup !!
        </div>

        <label htmlFor="username" >User Name</label>
        <input type="text" name='username' placeholder='User Name' ref={usernameRef} onChange={CheckValidity} />

        <label htmlFor="Fullname" >Full Name</label>
        <input type="text" name='Fullname' placeholder='Full Name' ref={fullnameRef} onChange={CheckValidity} />

        <label htmlFor="email">Email</label>
        <input type="text" name='email' placeholder='example@test.com' onChange={CheckValidity} ref={emailRef} />

        <label htmlFor="password">Password</label>
        <input type="password" name='password' placeholder='password' onChange={checkPassword} ref={PasswordRef} />

        <div className="alert">

        </div>
        <button className={`${valid}active`} ref={buttonValidity} onClick={submitForm}>Register</button>
      </div>
    </div>
  )
}

export default Signup;