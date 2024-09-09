import { useState } from 'react'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import './App.css'
import Login from './Pages/Login';
import ChatRoom from './Pages/ChatRoom';

function App() {
 const [user] =useAuthState(auth)

  return (
    <>
      <div className="">
        {
          user?<ChatRoom/>:<Login/>
        }
      </div>
    </>
  )
}

export default App
