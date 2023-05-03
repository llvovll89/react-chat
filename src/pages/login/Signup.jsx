import React, { useState } from 'react';
import { useWrapContext } from '../../context/WrapContext';
import { Alert, Container } from 'react-bootstrap';
import { updateProfile } from 'firebase/auth';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpForm } from '../../styles/SignUpForm';
import './Register.css';


const Signup = () => {
  const [errorMSg, setErrorMsg] = useState({ err: false, msg: '' });
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useWrapContext();
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[3].files[0];

    setErrorMsg('');
    if (email === '' || password === '') {
      setErrorMsg({ err: true, msg: 'E-mail & Password 입력' });
      return;
    }

    try {
      // context api 에서 받아온 회원가입 Fn
      const signUpres = await signUp(email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(signUpres.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'users', signUpres.user.uid), {
              uid: signUpres.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'userChats', signUpres.user.uid), {});

            setErrorMsg({ err: false, msg: '로그인성공!' });
            history('/login');
          } catch (error) {
            setErrorMsg({ err: true, msg: error.message });

            // 1.5초 후 초기화
            setTimeout(() => {
              setErrorMsg('');
            }, 1500);
          }
        });
      });
    } catch (error) {
      setErrorMsg({ err: true, msg: error.message });

      setTimeout(() => {
        setErrorMsg('');
      }, 1500);
    }
  };

  return (
    <>
      <div className="wrap">
        <div className="signup_container">
          <Container>
            <div className="signup_logo">
              <span>H</span>
              <span>O</span>
              <span>T</span>
              <span>A</span>
              <span>L</span>
              <span>K</span>
            </div>
            <SignUpForm onSubmit={handleSubmit}>
              <div className="area">
                <input
                  className="signup_input"
                  id="na"
                  onChange={(e) => setDisplayName(e.target.value)}
                  type="text"
                  required
                />
                <label className="la" htmlFor="na">
                  Username
                </label>
              </div>
              <div className="area">
                <input
                  className="signup_input"
                  id="em"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
                <label className="la" htmlFor="em">
                  Email
                </label>
              </div>
              <div className="area">
                <input
                  className="signup_input"
                  id="ps"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
                <label className="la" htmlFor="ps">
                  Password
                </label>
              </div>
              <input type="file" style={{ display: 'none' }} id="file" />
              <label htmlFor="file" className="file_label">
                <span>프로필 이미지 넣기</span>
              </label>
              <button type="submit" className="signup_btn">
                회원가입
              </button>
              {errorMSg?.msg && (
                <Alert variant={errorMSg?.err ? 'danger' : 'success'}>
                  {errorMSg?.msg}
                </Alert>
              )}
            </SignUpForm>
            <p className="signup_bt">
              계정이 있을 시
              <Link to="/login" className="login_click">
                로그인하기
              </Link>
            </p>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Signup;
