import axios from "axios";
import *  as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7iI_H1Q41hG5xJNJescvCwkEdIirZeyo", authData)
            .then(res => {
                console.log(res)
                dispatch(authSuccess(res.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err))
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