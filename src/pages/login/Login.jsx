import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom';
import { Alert , Container } from 'react-bootstrap';
import { useWrapContext } from '../../context/WrapContext';
import styled from 'styled-components';
import './Resister.css';

const Form = styled.form`
display: block;
padding-top: 60px;
    .login_input {
    margin-bottom: 14px;
    width: 100%;
    height: 56px;
    padding: 18px 16px;
    background-color: #fff;
    font-size: 16px;
    font-weight: 500;
    transition: border-color .15s linear;
    border: 1px solid #e5e8eb;
    font-family: 'Chosunilbo_myungjo';
}
    .login_input:active,
    .login_input:focus {
        border: 2px solid #07f;
    }
    .login_btn {
    width: 100%;
    height: 60px;
    font-size: 18px;
    color: #fff;
    background-color: #4A8BFD;
    transition: all .15s linear;
    }
    .login_btn:hover,
    .login_btn:active {
    background-color: #07f;
    transition: all .2s linear;
    }
`

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


  const tapBtn = document.querySelectorAll('li button')
  tapBtn.forEach((btns) => {
      btns.addEventListener('click', () => {
          tapBtn.forEach((list) => {
              list.classList.remove('taps')
          })
          btns.classList.add('taps')
      })
  })


  return (
    <>
    <div className="login">
      <Container>
      <div className="login_header">
          <div className="login_logo">
              <span>H</span>
              <span>O</span>
              <span>O</span>
              <span>G</span>
              <span>L</span>
              <span>E</span>
          </div>
          <div className="login_tab">
            <ul>
              <li><button className='tab_btn tabs'><Link>ID 로그인</Link></button></li>
              <li><button className='tab_btn'><Link>아이디 찾기</Link></button></li>
              <li><button className='tab_btn'><Link>비밀번호 찾기</Link></button></li>
            </ul>
          </div>
          </div>
          <Form onSubmit={handleSubmit}>
          <input className='login_input' type="email" placeholder='login-email' onChange={(e) => setEmail(e.target.value)} />
          <input className='login_input' type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}  />
          {errorMSg?.msg && (<Alert variant={errorMSg?.err ? "danger" : "success"}>{errorMSg?.msg}</Alert>)}
          <button type="submit" className="login_btn">Hoggle 로그인</button>
          </Form>

          <div className="signup_text">
              <Link to="/resister">계정 만들기</Link>
          </div>
      </Container>
      </div>
    </>
  )
}

export default Login