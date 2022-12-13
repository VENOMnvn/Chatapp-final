import { useEffect } from 'react';
import './ChatAll.css';
function ChatSidebar({socket}) {
      
    useEffect(()=>{
       socket.off('Typingresponse').on('Typingresponse',(data)=>{
         console.log(data);
         if(data.typing)
         document.getElementById("typing").innerText=`${data.user.username} is typing...`;
         else
         document.getElementById("typing").innerText="";
       })

       socket.off("responseActiveUser").on("responseActiveUser",(data)=>{
        console.log(data);
       })
       
    },[socket])
    

    return <div className='ChatSidebar'>
         <div className="activeusers">
          <div>Chat Logs</div>
         </div>
         <div id='typing'>
      
         </div>
    </div>;
}

export default ChatSidebar;