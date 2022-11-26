import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../Helpers/Firebase.init';
import useUserRole from '../Hooks/useUserRole';
export const AuthContext = createContext({}); // context
const auth = getAuth(app); // call google firebase auth


const UserContext = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // user role type type 
    const [userRole, isRoleLoading] = useUserRole(user?.uid);
    // user type 

    const googleProvider = new GoogleAuthProvider(); // google auth provider
    const gitHubProvider = new GithubAuthProvider(); // github auth provider

    // form login
    const loginByEmailAndPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // social logins
    const loginBySocialAccounts = (loginType) => {
        setLoading(true);
        if (loginType == 'google') {
            return signInWithPopup(auth, googleProvider);
        }
        if (loginType == 'github') {
            return signInWithPopup(auth, gitHubProvider);
        }
    }
    // create new user by g. firebase
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }
    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser);
    }
    // # create new user by g. firebase
    // forget Password
    const requestForgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }
    // sign out
    const userSignOut = () => {
        // setLoading(true);
        return signOut(auth);
    }
    // check user signed in or not 
    useEffect(() => {
        const unsSubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
        })
        // if user change/log out on any route
        return () => unsSubscribe();

    }, [auth])



    // console.log('loader Status: ', loading);
    // console.log(user); 
    // pass data by context
    const authInfo = { loading, setLoading, loginByEmailAndPassword, loginBySocialAccounts, userSignOut, createNewUser, updateUserProfile, verifyEmail, requestForgetPassword, user, userRole, isRoleLoading }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;