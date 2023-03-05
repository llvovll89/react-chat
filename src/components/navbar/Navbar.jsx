import React , { useContext } from 'react'
import { ResisterContext } from '../../context/ResisterContext';
import { useWrapContext } from '../../context/WrapContext'
import './Navbar.css'

const Navbar = () => {
  const { logOut , modalSidebar , logModal} = useWrapContext();
  const { currentUser } = useContext(ResisterContext);

  const clickHandler = () => {
    modalSidebar();
  }

  const yesClick = () => {
    setTimeout(() => {
      logOut();
    }, 1500)
  }

  return (
    <>
        <div className="nav_bar" >
            <span className="logo">
              GeonKaoTalk
            </span>
            <div className="info">
            <img src={currentUser?.photoURL} alt="" />
              <div className="user_form">
              <span className='name'>{currentUser.displayName}</span>
                <button className='signOut' onClick={clickHandler}>LOGOUT</button>
              </div>
            </div>
            <div 
            className={!logModal ?"signout_modal" : "signout_modal logOut_Modal"} >
            <div className="modal_box">  
            <h1 className="modal_top">Logout</h1>
            <span className="alert_btn">정말 로그아웃 하시겠습니까?</span>
            <div className="boxs">
            <button className='yes' onClick={yesClick}>확인</button>
            <button className='no' onClick={() => {modalSidebar(logModal)}}>닫기</button>
              </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default Navbar