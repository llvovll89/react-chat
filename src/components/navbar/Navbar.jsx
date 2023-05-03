import React, { useContext } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { ResisterContext } from '../../context/ResisterContext';
import { useWrapContext } from '../../context/WrapContext';
import './Navbar.css';

const Navbar = () => {
  const { logOut, modalSidebar, logModal } = useWrapContext();
  const { currentUser } = useContext(ResisterContext);

  const handleSidebar = () => {
    modalSidebar();
  };

  const handleLogout = () => {
    setTimeout(() => {
      logOut();
    }, 1500);
  };

  return (
    <>
      <div className="nav_bar">
        <div className="user_form">
          <div className="user">
            <img src={currentUser?.photoURL} alt="" />
            <div className="user_info">
            <p className="name">{currentUser.displayName}</p>
            <span>오늘은 뭐하지</span>
            </div>
          </div>
          <button className="signOut" onClick={handleSidebar}>
            LOGOUT
          </button>
        </div>
        <div
          className={logModal ? 'signout_modal logOut_Modal' : 'signout_modal'}
        >
          <div className="modal_box">
            <div className="modal_top">
              <span>
                <FiAlertTriangle />
              </span>
              <h1>로그아웃 하시겠습니까?</h1>
            </div>
            <div className="modal_center">
              <ul>
                <li>
                  <a href="/">Velog 가기</a>
                </li>
                <li>
                  <a href="/">Github 가기</a>
                </li>
                <li>
                  <a href="/">Code 보러가기</a>
                </li>
              </ul>
            </div>
            <div className="boxs">
              <button className="yes" onClick={handleLogout}>
                확인
              </button>
              <button
                className="no"
                onClick={() => {
                  modalSidebar(logModal);
                }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
