import { getAuth, signInWithEmailAndPassword,signInWithRedirect,createUserWithEmailAndPassword,TwitterAuthProvider ,FacebookAuthProvider  ,signOut,onAuthStateChanged,signInWithPopup, GoogleAuthProvider  } from "firebase/auth";
import {app} from './firebaseConfig';

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export const signInwithFacebook = async () => {

  try{
    const result = await signInWithPopup(auth, facebookProvider)
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const user = result.user;
    console.log('user',user)
    return user
  }catch(error){
  return error.message
  };
  }

export const signInwithTwitter = async () => {

  try{
    const result = await signInWithPopup(auth, twitterProvider)
    const credential = TwitterAuthProvider.credentialFromResult(result);
    const user = result.user;
    console.log('user',user)
    return user
  }catch(error){
    return error.message
  };
  }

export const signInwithGoogle = async () => {

  try{
    const result = await signInWithRedirect(auth, googleProvider)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    console.log('user',user)
    return user
  }catch(error){
  return error.message
  };
  }



export const signInUserwithEmailandPassword = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message || 'Something went wrong'); 
    }
  };
  

export const signOutUser = async () =>{
    await signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Sign Out')
      }).catch((error) => {
        // An error happened.
        console.log('Sign Out Error',error.message)

      });
}

export const createUserwithEmailandPassword = ({name,email,password}) =>{
    createUserWithEmailAndPassword (auth,name,email,password)
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