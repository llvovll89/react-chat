import React , { useState , useContext } from 'react'
import { ResisterContext } from '../../context/ResisterContext';
import { useWrapContext } from '../../context/WrapContext'
import './Navbar.css'

const Navbar = () => {
  const [cancle , setCancle] = useState({msg : "" , default: false});
  const { logOut } = useWrapContext();
  const { currentUser } = useContext(ResisterContext);

  const clickHandler = () => {
    setCancle({msg: "로그아웃 하시겠습니까?" , default:true})
  }

  const yesClick = () => {
    setCancle({msg: "로그아웃 합니다." , default: false});
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
            <span className='name'>{currentUser.displayName}</span>
                <button className='signOut' onClick={clickHandler}>LOGOUT</button>
            </div>
            {cancle.default === true ? <div className="signout_modal"><div className="alert_btn">{cancle.msg}</div>
            <div className="boxs">
            <button className='yes' onClick={yesClick}>✅</button>
            <button className='no' onClick={() => setCancle("")}>❎</button>
            </div>
            </div> : null}
        </div>
    </>
  )
}

export default Navbar