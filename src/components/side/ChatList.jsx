import React, { useEffect, useState , useContext} from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase';
import {ResisterContext} from '../../context/ResisterContext'
import { ChatContext } from '../../context/ChatContext'
import './Side.css'
import { useWrapContext } from '../../context/WrapContext';

const ChatList = () => {
  const [ chatList, setChatList ] = useState([]);
  const { currentUser } = useContext(ResisterContext)
  const { dispatch } = useContext(ChatContext)
  const { dark } = useWrapContext();

  useEffect(() => {
    const getChatList = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChatList(doc.data());
      })

      return () => {
        unsub();
      }
    }

    currentUser.uid && getChatList();
  }, [currentUser.uid]);

  const handleSelect = (userinfo) => {
    dispatch({type: "CHANGE_USER", payload: userinfo})
  }

  return (
    <>
    <div className="chat_list" style={{color: dark ? "#FFFFFF" : "#181818"}}>
      {Object.entries(chatList)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
        <div className="user_list"  
        style={{boxShadow : dark ? "1px 1px 2px rgba(255,255,255,0.12)" : "1px 1px 2px rgba(0,0,0,0.12)"}}
        key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="list_chat">
            <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
            </div>
            </div>
      ))}
    </div>
    </>
  )
}

export default ChatList