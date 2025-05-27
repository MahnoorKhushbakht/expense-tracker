'use client'
import { signInUserwithEmailandPassword } from '@/config/auth'
import React, { useState } from 'react'
import SignUpForm from './SignUpForm';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/authSlice';
import Alert from '@mui/material/Alert';

function SignInForm() {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const dispatch = useDispatch()

    const [formData,setFormData] = useState({
    email:'',
    password:''
    })
    
    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }


    const resetFormfield = () =>{
      setFormData({
    email:'',
    password:''
    })
    }

    const handleCloseAlert = () => {
      setAlert(null); 
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const user = await signInUserwithEmailandPassword(formData);
          if (user) {
            dispatch(loginUser({
              email: user.email,
              uid: user.uid,
            })); // Dispatch the login action with user data
          }
          setAlert({ type: 'success', message: 'Successfully Logged In' });
          resetFormfield();  
      } catch (error) {
        setAlert({ type: 'error', message: `Failed Login attempt, ${error.message}` });
      }
  };
  return (
    <div className='flex flex-col p-20 rounded-lg m-10 justify-center items-center w-96 h-auto '>
      <h1 className='text-3xl text-black/70 dark:text-white/70 mb-5'>Sign In</h1>
    <form onSubmit={handleSubmit}>
    {alert && (
        <Alert severity={alert.type} sx={{ mt: 2,mb:2 }} onClose={handleCloseAlert}>
          {alert.message}
        </Alert>
      )}
       <input
       name='email'
       type='email'
       className='border-amber-600/50 dark:border-amber-200/50 border-2 rounded-sm p-2 mb-2 w-full dark:placeholder:text-amber-200/50 placeholder:text-amber-600/50'
       value={formData.email}
       onChange={handleChange}
       placeholder='Enter Email'
       />
       <input
       name='password'
       type='password'
       className='border-amber-600/50 dark:border-amber-200/50 border-2 rounded-sm p-2 mb-2 w-full dark:placeholder:text-amber-200/50 placeholder:text-amber-600/50'
       value={formData.password}
       onChange={handleChange}
       placeholder='Password'
       />

       <button type='submit' className='bg-amber-600/50 text-white/70 rounded-sm shadow-sm pt-2 pb-2 pl-4 pr-4 w-full mt-5 mb-5'> 
        Log In
       </button>
    </form>
    <p className='text-black/70 dark:text-white/70 '>Dont have an account?{''}
    <a onClick={() => setOpen(true)} 
    className='text-amber-600 dark:text-amber-200/50 cursor-pointer'>
      Sign Up</a></p>
      {open && (
    <div className='flex justify-center max-w-full h-svh items-center fixed inset-0 z-50 backdrop-blur-lg'>
     <div className="relative bg-white w-auto flex items-center justify-center dark:text-white text-black dark:bg-black rounded-lg shadow-lg p-2">
       <button onClick={() => setOpen(false)} className="absolute top-2 right-2 text-black dark:text-white">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
         </svg>
       </button>
    <SignUpForm/>
   </div>
   </div>
 )}
  </div>
  )
}

export default SignInForm