import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { ResisterContext } from '../../context/ResisterContext';
import './Chat.css';

const Msg = ({ message }) => {
  const { currentUser } = useContext(ResisterContext);
  const { data } = useContext(ChatContext);

  const msgref = useRef();

  useEffect(() => {
    msgref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div
      ref={msgref}
      className={`msg ${message.senderId === currentUser.uid && 'owner'}`}
    >
      <div className="msg_top">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>now</span>
      </div>
      <div className="msg_body">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Msg;
