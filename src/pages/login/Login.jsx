import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useWrapContext } from '../../context/WrapContext';
import './Resister.css';

const Login = () => {
  const [errorMSg , setErrorMsg] = useState({err: false , msg: ""});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useWrapContext();
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if(email === "" || password === ""){
      setErrorMsg({err: true, msg: "E-mail & Password 입력"})
      return
    }

    try {
      await signIn(email, password);
      setErrorMsg({err: false, msg: "로그인성공!"})

      // 1.5초 후 메인페이지
      setTimeout(() => {
        history('/')
      }, 1500)
    } catch (error) {
      setErrorMsg({err: true , msg: error.message});

      // 1.5초 후 초기화
      setTimeout(() => {
        setErrorMsg("");
      }, 1500)
    }
  }



  return (
    <>
    <div className="login_wrap">
      <div className="login_container">
          <div className="login_logo">
              <span>H</span>
              <span>O</span>
              <span>O</span>
              <span>G</span>
              <span>L</span>
              <span>E</span>
          </div>
          <div className="login_title">
            <span>로그인</span>
            </div>
          <div className="bt_title">Firebase사용</div>

          <form onSubmit={handleSubmit}>
          <input type="email" placeholder='login-email' onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}  />
          <button type="submit">로그인</button>
          {errorMSg?.msg && (<Alert variant={errorMSg?.err ? "danger" : "success"}>{errorMSg?.msg}</Alert>)}
          </form>

          <div className="signup_text">
              <Link to="/resister">계정 만들기</Link>
          </div>
      </div>
      </div>
    </>
  )
}

export default Login