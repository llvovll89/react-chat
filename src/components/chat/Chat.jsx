import React from 'react'
import "./Chat.css";
// context
import { useWrapContext } from '../../context/WrapContext';

// component
import MsgContainer from './MsgContainer';
import ChatInput from './ChatInput';

// icons
import {BsSun} from 'react-icons/bs'
import { AiOutlineUserAdd } from 'react-icons/ai'
import {SlSizeFullscreen } from 'react-icons/sl'
import {CiSettings} from 'react-icons/ci'
import {MdDarkMode} from 'react-icons/md';
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';

const Chat = () => {
  const { data } = useContext(ChatContext);
  const { darkMode , dark , modalMode, modalOn} = useWrapContext();

  const clickHandler = () => {
    modalMode(modalOn);
  }

  return (
    <div className={modalOn ? "chat mobile" : "chat" }>
    <div className="chat_header" style={{ background : dark ? "#181818" : "#ffff" , color: dark? "#fff" : "#181818"}}>
  {/* 아래 하단 span태그는 채팅창 - 채팅리스트 클릭(사람이름) */ }
    <span className='user_name'>{data.user.displayName}</span>
    <div className="chat_header_icons">
    <span onClick={clickHandler}><SlSizeFullscreen /></span>
    <span><AiOutlineUserAdd /></span>
    <span><CiSettings /></span>
    <span onClick={darkMode}>{dark ? <BsSun /> : <MdDarkMode/> }</span>
    </div>
  </div>

      <MsgContainer />
      <ChatInput />

    </div>
  )
}

export default Chat