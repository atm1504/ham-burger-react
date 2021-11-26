import axios from "axios";
import *  as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7iI_H1Q41hG5xJNJescvCwkEdIirZeyo";
        if (!isSignup) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7iI_H1Q41hG5xJNJescvCwkEdIirZeyo"
        }
        axios.post(url, authData)
            .then(res => {
                console.log(res)
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err.response.data.error))
            })

    }
}




/**
 *
 * const firebaseConfig = {
  apiKey: "AIzaSyA7iI_H1Q41hG5xJNJescvCwkEdIirZeyo",
  authDomain: "testing-a97bd.firebaseapp.com",
  databaseURL: "https://testing-a97bd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testing-a97bd",
  storageBucket: "testing-a97bd.appspot.com",
  messagingSenderId: "313189871260",
  appId: "1:313189871260:web:6c587a57124c1ace060759",
  measurementId: "G-51VP4WQHWX"
};
 */