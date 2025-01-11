import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';
import React from 'react'
import { FcGoogle } from "react-icons/fc";




// creating cookies
const cookies = new Cookies()  // ab hum get , set , remove kar sakte hai cookies constant ko use kar

const Auth = (props) => {

  const { setisAuth } = props;
  
  const signIn = async () => {
      try {
      const result = await signInWithPopup(auth, provider); // is ke use se hame google signin ka popup window get horaha h
      // but ye fully functioned nahin hai , hum agar isko console kare toh google account ka details show hoga
        cookies.set("auth-token", result.user.refreshToken);
      //ek bar login karne ke bad data temporarily save karne ke liye cookies ka use karenge
        //uske liye "universal-cookie" ko import karna padega
        setisAuth(true);
    }
    catch (err) {
        console.error(err);
    }

    
    
}

  return (
    <div className='auth'>
          <p>sign In with google</p>
          <button onClick={signIn}><FcGoogle /></button>
    </div>
  )
}

export default Auth
