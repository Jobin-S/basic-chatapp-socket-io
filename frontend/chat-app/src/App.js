import './App.css';
import { useState, useEffect } from 'react'
import {io} from 'socket.io-client'
const socket = io("http://localhost:4000");


function App() {
  const [user, setUser] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.on('chat', (payload) =>{
      setChat([...chat, payload])
    })
  })

  const sendMessage = (e)=>{
    e.preventDefault()
    if(!user)return setUser(true)
    socket.emit('chat', {message, name})
    setMessage('')
  }

  return (
    <div className="App">
      <header className="App-header">
        {chat.map((obj, i)=>{
          return(
            <p><span>{obj.name}</span>:{obj.message}</p>
          )
        })}
        <form onSubmit={sendMessage}>
          {!user ? 
          <input placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)}/> :
          <input placeholder='Chat here..' value={message} onChange={(e)=>setMessage(e.target.value)}/>

        }
          <button type='submit'>{!user?"Set Name":'Send'}</button>
        </form>
      </header>
    </div>
  );
}

export default App;
