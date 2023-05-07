import React, { useEffect, useState, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { ResisterContext } from '../../context/ResisterContext';
import { useWrapContext } from '../../context/WrapContext';
import { ChatContext } from '../../context/ChatContext';
import './Side.css';

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const { currentUser } = useContext(ResisterContext);
  const { modalMode, modalOn } = useWrapContext();
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChatList = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChatList(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChatList();
  }, [currentUser.uid]);

  return (
    <div className="chat_list">
      {chatList &&
        Object.entries(chatList)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="user_list"
              key={chat[0]}
              onClick={() => {
                dispatch({ type: 'CHANGE_USER', payload: chat[1].userInfo });
                modalMode();
              }}
            >
              <img src={chat[1].userInfo.photoURL} alt="" />
              <div className="list_chat">
                <span>{chat[1].userInfo.displayName}</span>
                <p className="list_check_user">
                  {chat[1].lastMessage?.text.length > 50
                    ? `${chat[1].lastMessage?.text.substr(0, 49)}...`
                    : chat[1].lastMessage?.text}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default ChatList;
