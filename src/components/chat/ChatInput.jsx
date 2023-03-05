import React from 'react'
import {RiBarChartBoxLine } from 'react-icons/ri'
import {AiOutlineFileAdd} from 'react-icons/ai';
import { useContext } from 'react';
import { ResisterContext } from '../../context/ResisterContext';
import { ChatContext } from '../../context/ChatContext';
import { useState } from 'react';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useWrapContext } from '../../context/WrapContext';

const ChatInput = () => {
  const [text, setText] = useState("방구뿡")
  const [img, setImg] = useState(null);
  const { dark } = useWrapContext();
  const { currentUser } = useContext(ResisterContext)
  const { data } = useContext(ChatContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(text === "") {
      alert('입력하고 보내세요')
    }
    
    if(img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on((err) => {

      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            })
          })
        })
      })

    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      })
    }

    // update가 두개씩인 이유 = 채팅 이용자가 나 상대방 2

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId+".date"] : serverTimestamp(),
    })

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId+".date"] : serverTimestamp(),
    })

    setText("")
    setImg(null)
  }

  return (
    <>
<div className='chat_bottom' style={{transition: "0.2s linear" , background : dark ? "#181818" : "#ffff" , color: dark? "#fff" : "#181818"}}>
    <input type="text" placeholder='입력해주세연..' value={text} className='chat_input' onChange={e => setText(e.target.value)} style={{color: dark? "#fff" : "#181818"}} />
    <div className="submit">
    <div className="submit_left">
    <span><RiBarChartBoxLine /></span>
      <input type="file" id="file" style={{display: "none"}} onChange={e => setImg(e.target.files[0])} />
      <label htmlFor="file">
      <span><AiOutlineFileAdd /></span>
      </label>
      </div>
      <button type='submit' style={{color: dark? "#fff" : "#181818"}} onClick={handleSubmit}>SEND</button>
    </div>
</div>
    </>
  )
}

export default ChatInput