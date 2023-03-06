import React , { useContext } from 'react'
import { ResisterContext } from '../../context/ResisterContext';
import { useWrapContext } from '../../context/WrapContext'
import { FiAlertTriangle } from 'react-icons/fi'
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
            <div className="nav_logo">
            <span>H</span>
            <span>O</span>
            <span>T</span>
            <span>O</span>
            <span>L</span>
            <span>K</span>
            </div>
            <div className="info">
            <img src={currentUser?.photoURL} alt="" />
              <div className="user_form">
              <span className='name'>{currentUser.displayName}</span>
                <button className='signOut' onClick={clickHandler}>LOGOUT</button>
              </div>
            </div>
            <div className={!logModal ?"signout_modal" : "signout_modal logOut_Modal"} >
            <div className="modal_box">  
            <div className="modal_top">
              <span><FiAlertTriangle /></span>
              <h1>로그아웃 하시겠습니까?</h1>
            </div>
            <div className="modal_center">
              <ul>
                <li><a href="/">Velog 가기</a></li>
                <li><a href="/">Github 가기</a></li>
                <li><a href="/">Code 보러가기</a></li>
              </ul>
            </div>
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