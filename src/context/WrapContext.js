import { createContext, useContext, useState } from 'react';
import { createUserWithEmailAndPassword , signOut , signInWithEmailAndPassword } from 'firebase/auth';
import { auth  } from '../firebase';


const wrapContext = createContext();

export const WrapContextProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  const darkMode = () => {
    setDark(!dark);
  };

  // 회원가입
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 로그인
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // 로그아웃
  const logOut = () => {
      return signOut(auth);
  }

  return (
    <wrapContext.Provider value={{ darkMode, dark, signUp , logOut ,signIn }}>
      {children}
    </wrapContext.Provider>
  );
};

export const useWrapContext = () => {
  return useContext(wrapContext);
};
