import React, { useEffect, useState } from 'react'
import ChatSidebar from './ChatSidebar';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Messege from './Messege';
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/LoginSlice';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';



const ChatWindow = ({ socket }) => {

   const dispatch = useDispatch();

  const user = useSelector((state) => state.login.UserName);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIN = localStorage.getItem("VenomSignupForm");
    if (!loggedIN) {
      navigate('/');
                   }
    socket.emit("userData",user);
  }, [])
  const [ArrayMessage, setMessage] = useState([]);

  function SendMessage(valid) {

    if (valid == true || valid.key == 'Enter') {
      let message = messageInput.current.value;
      socket.emit('send', {
        message: message,
        user: user
      });
      messageInput.current.value = "";
    }
  }


  useEffect(() => {
    socket.off('response').on('response', (data) => {
      setMessage((state) => [data, ...state]);
    })

  }, [socket, ArrayMessage]);
  
  function sendTypingOn()
  {
     socket.emit('typing',{typing:true,user});
  }
  function sendTypingOff()
  {
     socket.emit('typing',{typing:false,user});
  }


  const messageInput = useRef();


  return (
    <div className='ChatWindow'>
      <h1><span>ChatApp</span>{user.username}  <button className='logout' onClick={()=>{localStorage.clear() 
        dispatch(logout())
        window.location.reload();
        }}>Logout</button></h1>
      <ChatSidebar socket={socket}></ChatSidebar>
      <div className="messagebox">
        {ArrayMessage.map((e) => <Messege data={{ e, user }}></Messege>)}
      </div>
      <div className="inputFeild">
        <input type="text" 
        placeholder='Type a message...' 
        ref={messageInput} 
        onKeyUp={(e) => { SendMessage(e) }}
        onFocus={sendTypingOn}
        onBlur={sendTypingOff}
        />
        <button onClick={() => { SendMessage(true) }} id="sendButton">Send</button>
      </div>
    </div>
  )
}

export default ChatWindow;