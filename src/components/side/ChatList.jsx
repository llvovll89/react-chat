import React, { useEffect, useState, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { ResisterContext } from '../../context/ResisterContext';
import { useWrapContext } from '../../context/WrapContext';
import ChatListItem from './ChatListItem';
import './Side.css';

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const { currentUser } = useContext(ResisterContext);
  const { logModal } = useWrapContext();

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
    <div
      className="chat_list"
      style={{
        background: !logModal ? '#FFF' : '#333',
        color: !logModal ? '#000' : '#FFF',
      }}
    >
      {chatList && chatList.length > 0 &&
        Object.entries(chatList)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => <ChatListItem key={chat[0]} chat={chat} />)}
    </div>
  );
};

export default ChatList;
