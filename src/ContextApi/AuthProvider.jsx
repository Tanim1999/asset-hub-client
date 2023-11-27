/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut,updateProfile} from "firebase/auth"
import { app } from "../firebase/firebase.config";




export const AuthContext = createContext(null)
const auth = getAuth(app)
const provider = new GoogleAuthProvider();




const AuthProvider = ({children}) => {
    const [user,setUser]= useState(null);
    const[loading,setLoading]=useState(true)
    

    const createUser = (email,password)=>{
        setLoading(true)

        

        return createUserWithEmailAndPassword(auth,email,password)

    }
    const signIn = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut= ()=>{
        setLoading(true)
        return signOut(auth)
     } 
     const updateUserProfile = (name,url) => {
        return updateProfile(auth.currentUser, {
            displayName: name , photoURL:url
        });
    }    
    
    useEffect(()=>{
        
        const unsubscribe= onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser)
             console.log('user in the auth state changed',currentUser)
             
             setLoading(false)

         })
         return()=> {
             unsubscribe()}
     },[])
    const userInfo = {
        user,
        logOut,
        createUser,
        auth,
        loading,
        updateUserProfile,
        signIn,
        provider,
        setLoading
    }
    
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
            
        </AuthContext.Provider>
    );
};

export default AuthProvider;