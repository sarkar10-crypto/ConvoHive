import React from 'react'


const Room = (props) => {

    let { setroom, roomInputRef } = props;

  return (
    <>
     <div className='room'>
          <label>Enter room Name :</label>
          <input ref={roomInputRef}/>
          <button onClick={()=>setroom(roomInputRef.current.value)} >Enter Chat</button>
      </div> 
    </>
  )
}

export default Room
