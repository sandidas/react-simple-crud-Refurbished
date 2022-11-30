import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../Helpers/Firebase.init';
import toast, { Toaster } from 'react-hot-toast';
import useUserRole from '../Hooks/useUserRole';


export const AuthContext = createContext({}); // context
const auth = getAuth(app); // call google firebase auth


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // user type 

    const googleProvider = new GoogleAuthProvider(); // google auth provider
    const gitHubProvider = new GithubAuthProvider(); // github auth provider

    // form login
    const loginByEmailAndPassword = (email, password) => {
        //setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // social logins
    const loginBySocialAccounts = (loginType) => {
        //setLoading(true);
        if (loginType == 'google') {
            return signInWithPopup(auth, googleProvider);
        }
        if (loginType == 'github') {
            return signInWithPopup(auth, gitHubProvider);
        }
    }
    // create new user by g. firebase
    const createNewUser = (email, password) => {
        //setLoading(true);
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
        //setLoading(true);
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

    // user role type type 
    const [userRole, isRoleLoading] = useUserRole(user?.uid);
    // user type 


    // console.log('loader Status: ', loading);
    // console.log(user); 
    // pass data by context
    const authInfo = { loading, setLoading, loginByEmailAndPassword, loginBySocialAccounts, userSignOut, createNewUser, updateUserProfile, verifyEmail, requestForgetPassword, user, userRole, isRoleLoading }


<<<<<<< HEAD:src/Context/AuthProvider.jsx
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            <Toaster
                toastOptions={{
                    className: 'flex shadow shadow-purple-400 gap-6 rounded-lg overflow-hidden max-w-3xl dark:bg-gray-700 dark:text-white divide-gray-700 text-xl',

                }}
            />
        </AuthContext.Provider>
=======
const SecondaryPrimary = () => {
    return (
        <div>

        </div>
>>>>>>> e8b0713543b5017904102d4f1368b6620ff54b6c:src/Components/Buttons/SecondaryPrimary.jsx
    );
};

export default SecondaryPrimary;