import React, { useEffect, useState } from 'react';
// importing addDoc function to add a document to the Firestore
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from '../firebase-config';


const Chat = (props) => {
  const [newMssg, setnewMssg] = useState('');
  const [messages, setmessages] = useState([])

    const msgRef = collection(db, "messages");

  const { room } = props;
  
  useEffect(() => {
    const querymessages = query(msgRef,where("room", "==", room),orderBy("createdAt"))
   const unsuscribe = onSnapshot(querymessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
       messages.push({...doc.data(), id : doc.id})
      })
      setmessages(messages);
   }); //func hai Firestore ka listen karega changes ko jab bhi koi changes hoga  
    return () => {
      unsuscribe();
    }
  
  }, [])
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMssg === "") return;
        await addDoc(msgRef, {
            text: newMssg,
            // when it's created :
            createdAt: serverTimestamp(),
            // which user :
            user: auth.currentUser.displayName,
            // which room : need to access the room state that was created in app.js via props
            room,
        }); 

        // setNewMsg("") karna hai coz , input feild main display karna nahin msg send karne kebad

        setnewMssg("");
        // database or collection ka linkup hogaya data-structure bhi set karna hai addDoc main
    }

    
    

  return (
    <div className='chat-app'>
      <div className='header'>
        <h1>welcome To : {room}</h1>
      </div>
      <div className='messages'>
        {messages.map((message) =>
          <div className="message" key={message.id}>
            <span className='user'>{message.user} {"-"}  </span>
            {message.text}
          </div>
        )}
      </div>
          <form onSubmit={handleSubmit} className='newMessage'>
        <input
          value={newMssg}
          onChange={(e) => setnewMssg(e.target.value)}
          type="text"
          className='inputMssg'
          placeholder='Enter Message' />
              <button type='submit' className='sendBtn'>Send</button>
      </form>
    </div>
  )
}

export default Chat
