
import { useRef, useState } from 'react';
import './App.css';
import Auth from './components/auth';
import Cookies from 'universal-cookie';
import Chat from './components/chat';
import { signOut } from "firebase/auth";
import { auth } from './firebase-config';
import Room from './components/room';

const cookies = new Cookies();
function App() {
  //app ko do parts main divide karna padega 
  const [isAuth, setisAuth] = useState(cookies.get("auth-token"));
  const [room, setroom] = useState(null);

  // useing useRef instead of usestate : 
  const roomInputRef = useRef(null);

  const userOut =  async() => {
    await signOut(auth);
    // to remove cookies
    cookies.remove("auth-token");
    setisAuth(false);
    // incase we are in a room
    setroom(null);

  }
   
  if (!isAuth) {
    return (
      <>
        
        <div className='logo'>
          
          <img src="/ConvoHive.png" alt="logo" />
        </div>

        <div className='main'>
          <Auth setisAuth={setisAuth} />
        </div>
    
      </>
    )
  }
  return (
  <>
    {
      room ?( <Chat room={room} /> ):(
          <Room setroom={setroom} roomInputRef={roomInputRef} />
          
        )}
      <div className="signOut">
        <button onClick={userOut}>SignOut</button>
      </div>
    </>
  )
}

export default App
