import React , { useState , useEffect, useContext} from 'react'
import Msg from './Msg'
import { useWrapContext } from '../../context/WrapContext';
import { ChatContext } from '../../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import './Chat.css';


const MsgContainer = () => {
  const [ messages, setMessages ] = useState([]);
  const {dark} = useWrapContext();
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    })

    return () => {
      unSub();
    }
  }, [data.chatId]);

  return (
    <>
        <div className='msg_content' style={{transition: "0.2s linear" , background: dark ? "#181818" : "rgb(223, 235, 240)"}}>
        {messages.map(msg => (
          <Msg message={msg} key={msg.id} />
        ))}
        </div>
    </>
  )
}

export default MsgContainer