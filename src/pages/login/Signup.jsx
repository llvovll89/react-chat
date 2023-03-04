import React , { useState } from 'react'
import { useWrapContext } from '../../context/WrapContext';
import { Alert } from 'react-bootstrap';
import { updateProfile } from 'firebase/auth';
import { uploadBytesResumable , getDownloadURL, ref} from 'firebase/storage';
import { db , storage } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore'
import {Link , useNavigate} from 'react-router-dom';

// input[type="file"] 에 보여질 img 
import Add from '../../assets/images/cursor.png';
import './Resister.css';


const Signup = () => {
  const [errorMSg , setErrorMsg] = useState({err: false , msg: ""});
  const [displayName , setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useWrapContext();
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // input[type="file"] 은 state에 어떻게 저장해야할 지 고민중이라 target으로 받아오기
    const file = e.target[3].files[0];

    setErrorMsg("");
    if(email === "" || password === ""){
      setErrorMsg({err: true, msg: "E-mail & Password 입력"})
      return
    }

    try {
    // context api 에서 받아온 회원가입 Fn 
    const signUpres = await signUp(email, password)
    const date = new Date().getTime();
    const storageRef = ref(storage , `${displayName + date}`)

    await uploadBytesResumable(storageRef, file).then(() => {
    getDownloadURL(storageRef).then(async (downloadURL) => {
      try {
        await updateProfile(signUpres.user, {
          displayName, 
          photoURL: downloadURL,
        });

        await setDoc(doc(db, "users", signUpres.user.uid ), {
          uid: signUpres.user.uid,
          displayName,
          email,
          photoURL: downloadURL,
        });

        await setDoc(doc(db, "userChats", signUpres.user.uid), {});
        
        setErrorMsg({err: false, msg: "로그인성공!"})
        history('/login');
      } catch (error) {
        setErrorMsg({err: true , msg: error.message});

        // 1.5초 후 초기화
        setTimeout(() => {
          setErrorMsg("");
        }, 1500)}
    })
   })

    
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
      <div className="signup_container">
        <div className="form_wrap">
             <span className='logo'>Hokaotalk</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit} >
              <input onChange={(e) => setDisplayName(e.target.value)} type="text" placeholder='Username' />
              <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Your E-mail' />
              <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Your Password' />
              <input type="file" style={{display: "none"}} id='file'/>
              <label htmlFor="file">
              <img src={Add} alt="..add img" />
               <span>Add an avatar</span>
              </label>
              <button type="submit" className='signup_btn'>회원가입</button>
              {errorMSg?.msg && (<Alert variant={errorMSg?.err ? "danger" : "success"}>{errorMSg?.msg}</Alert>)}
              </form>
              <p>계정이 있을 시 <Link to="/login" className='login_click'>Log-in</Link></p>
        </div>
      </div>
    </>
  )
}

export default Signup