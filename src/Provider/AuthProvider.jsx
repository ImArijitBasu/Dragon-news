import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../components/Firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    // 
    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(true);
    console.log(loading,user);
    const createNewUser=(email , password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth , email , password);
        
    }
    const logout = () => {
        setLoading(true)
        return signOut(auth);
    }
    const userLogin = (email , password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth , email , password);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth , currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe
    },[])
    const authInfo = {
        user,
        setUser,
        createNewUser,
        logout,
        userLogin,
        loading,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;