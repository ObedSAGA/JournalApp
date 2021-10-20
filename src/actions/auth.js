import Swal from 'sweetalert2'

import { signOut, getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
import {types} from '../types/types';
import { finishLoading, startLoading } from './ui';
 
export const startLoginEmailPass = (email, password) =>{
    return (dispatch) =>{

        dispatch(startLoading());

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then( ({user} ) => {
                dispatch( login( user.uid, user.displayName ) );

                dispatch( finishLoading() );
            })
            .catch((e) => {
                console.log(e);
                dispatch( finishLoading() );
                Swal.fire('Error', 'Invalid Email or Password Combination', 'error');
            });
    };
};


export const startRegisterWithEmail = (email, password, name) => {
    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async({user}) => {
                await updateProfile(user, { displayName: name });

                dispatch(login(user.uid, user.displayName));
            })
            .catch(e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            });
    }
}


export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user }) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}
 
export const login = (uid, displayName) =>({
        type: types.login,
        payload: {
            uid,
            displayName
        }
});

export const startLogout = () => {
    return async ( dispatch ) =>{
        const auth = getAuth();
        await signOut(auth);

        dispatch( logout() );
    }
}


export const logout = () => ({
    type: types.logout,
});

