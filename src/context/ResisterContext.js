import { onAuthStateChanged } from "firebase/auth";
import { createContext , useState , useEffect } from "react";
import { auth } from "../firebase";

export const ResisterContext = createContext();

export const ResisterContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        })

        return () => {
            unsub();
        }
    }, []);

    return(
        <ResisterContext.Provider value={{currentUser}}>
            {children}
        </ResisterContext.Provider>
    )
}