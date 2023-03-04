import React , {useContext, useState} from 'react'
import { collection, query , where , getDocs , setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { ResisterContext } from '../../context/ResisterContext'
import './Side.css'

const Search = () => {
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [errorMSg , setErrorMsg] = useState({err: false , msg: ""});

    const { currentUser } = useContext(ResisterContext);

    const searchHandle = async () => {
        // db - users 콜렉션에 접근 - displayName 과 userName 같은 이름의 쿼리 
        const querys = query(collection(db, "users"), where("displayName", "==" , userName));
         setErrorMsg("");   
    try {
        const querySnapshot = await getDocs(querys);
        querySnapshot.forEach((doc) => {
            setUser(doc.data());
        })
    } catch (error) {
        setErrorMsg({err:true , msg: error.message})
    }
    }

    const enterHandler = (e) => {
        e.code === "Enter" && searchHandle()
    }

    const handleSelect = async () => {
        const uID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const response = await getDoc(doc(db, "chats", uID))

            if(!response.exists()){
                await setDoc(doc(db, "chats", uID), {messages: []});

                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [uID + ".userInfo"] : {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [uID + ".date"]: serverTimestamp(),
                })

                await updateDoc(doc(db, "userChats", user.uid), {
                    [uID + ".userInfo"] : {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [uID + ".date"]: serverTimestamp(),
                })
            }

        } catch (error) {
            console.log(error.message);
        }
        setUser(null);
        setUserName("");
    }
 
  return (
    <>
        <div className='search_container'>
            <div className="search_form">
                <input type="text" placeholder='Search...' value={userName} onKeyDown={enterHandler} onChange={(e) => setUserName(e.target.value)} />
            </div>

            {errorMSg?.msg && <span>{errorMSg?.msg} </span>}

            {user && 
                (<div className="user_list" onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div className="side_chat_info">
                    <span>{user.displayName}</span>
                </div>
                </div>
                )}
        </div>
    </>
  )
}

export default Search