import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Container } from 'react-bootstrap';
import { useWrapContext } from '../../context/WrapContext';
import './Register.css';
import { LoginForm } from '../../styles/LoginForm';

const Login = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useWrapContext();
  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (email === '' || password === '') {
      setError('E-mail & Password 입력');
      return;
    }

    try {
      await signIn(email, password);
      setError('로그인성공!');

      // 1.5초 후 메인페이지
      setTimeout(() => {
        history('/');
      }, 1500);
    } catch (error) {
      setError(error.message);

      // 1.5초 후 초기화
      setTimeout(() => {
        setError('');
      }, 1500);
    }
  };

  return (
    <div className="wrap">
      <div className="login">
        <Container>
          <div className="login_header">
            <div className="login_logo">
              <span>H</span>
              <span>O</span>
              <span>T</span>
              <span>A</span>
              <span>L</span>
              <span>K</span>
            </div>
            <div className="login_tab">
              <ul>
                <li>
                  <button
                    className={`tab_btn ${activeTab === 0 && 'tabs'}`}
                    onClick={() => setActiveTab(0)}
                  >
                    <Link>ID 로그인</Link>
                  </button>
                </li>
                <li>
                  <button
                    className={`tab_btn ${activeTab === 1 && 'tabs'}`}
                    onClick={() => setActiveTab(1)}
                  >
                    <Link>아이디 찾기</Link>
                  </button>
                </li>
                <li>
                  <button
                    className={`tab_btn ${activeTab === 2 && 'tabs'}`}
                    onClick={() => setActiveTab(2)}
                  >
                    <Link>비밀번호 찾기</Link>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <LoginForm onSubmit={handleLogin}>
            <div className="area">
              <input
                className="login_input"
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="area">
              <input
                className="login_input"
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            {error?.msg && (
              <Alert variant={error?.err ? 'danger' : 'success'}>
                {error?.msg}
              </Alert>
            )}
            <button type="submit" className="login_btn">
              로그인
            </button>
          </LoginForm>

          <div className="signup_text">
            <p>처음 방문하셨다면 ? </p>
            <Link to="/register">계정 만들기</Link>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Login;
