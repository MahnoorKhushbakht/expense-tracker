import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword ,signOut,onAuthStateChanged  } from "firebase/auth";
import app from './firebaseConfig';

const auth = getAuth(app)

export const signInUserwithEmailandPassword = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message || 'Something went wrong'); 
    }
  };
  

export const signOutUser = () =>{
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Sign Out')
      }).catch((error) => {
        // An error happened.
        console.log('Sign Out Error',error.message)

      });
}

export const createUserwithEmailandPassword = ({email,password}) =>{
    createUserWithEmailAndPassword (auth,email,password)
    .then((userCredential) =>{
        const user = userCredential.user;
        console.log('usercredential',userCredential)
        console.log('user',user);
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, (user) => {
      callback(user); 
    });
  };