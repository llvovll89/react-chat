import React, { useContext } from 'react';
import { useWrapContext } from '../../context/WrapContext';
import { ChatContext } from '../../context/ChatContext';
import './Side.css';

const ChatListItem = ({ chat }) => {
  const { modalMode } = useWrapContext();
  const { dispatch } = useContext(ChatContext);

  const handleSelect = (userInfo) => {
    dispatch({ type: 'CHANGE_USER', payload: userInfo });
    modalMode();
  };

  return (
    <div
      className="user_list"
      key={chat[0]}
      onClick={() => {
        handleSelect(chat[1].userInfo);
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
  );
};

export default ChatListItem;
