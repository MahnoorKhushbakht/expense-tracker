'use client'
import { signInUserwithEmailandPassword, signInwithGoogle } from '@/config/auth'
import React, { useState } from 'react'
import SignUpForm from './SignUpForm'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/store/authSlice'
import Alert from '@mui/material/Alert'
import { useRouter } from 'next/navigation'
import { GoogleCircleFilled,FacebookFilled,TwitterCircleFilled } from '@ant-design/icons';
import { signInwithFacebook, signInwithTwitter } from '../../config/auth'

function SignInForm() {
 const router = useRouter()
  const [open, setOpen] = useState(false)
  const [alert, setAlert] = useState(null)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const resetFormfield = () => {
    setFormData({ email: '', password: '' })
  }

  const handleCloseAlert = () => {
    setAlert(null)
  }

  const handleGoogleClick = async () =>{
    try{
    const user = await signInwithGoogle()
    console.log('1',user.email)
    console.log('2',user.uid)
    if (user) {
        dispatch(loginUser({ email: user.email, uid: user.uid }))
      }
      router.push('/')
    } catch (error) {
      setAlert({ type: 'error', message: `Failed Login attempt, ${error.message}` })
    }
  }

  
  const handleFacebookClick = async () =>{
    try{
    const user = await signInwithFacebook()
    console.log('1',user.email)
    console.log('2',user.uid)
    if (user) {
        dispatch(loginUser({ email: user.email, uid: user.uid }))
      }
      router.push('/')
    } catch (error) {
      setAlert({ type: 'error', message: `Failed Login attempt, ${error.message}` })
    }
  }

  
  const handleTwitterClick = async () =>{
    try{
    const user = await signInwithTwitter()
    console.log('1',user.email)
    console.log('2',user.uid)
    if (user) {
        dispatch(loginUser({ email: user.email, uid: user.uid }))
      }
      router.push('/')
    } catch (error) {
      setAlert({ type: 'error', message: `Failed Login attempt, ${error.message}` })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await signInUserwithEmailandPassword(formData)
      if (user) {
        dispatch(loginUser({ email: user.email, uid: user.uid }))
      }
      setAlert({ type: 'success', message: 'Successfully Logged In' })
      resetFormfield()
      router.push('/')
    } catch (error) {
      setAlert({ type: 'error', message: `Failed Login attempt, ${error.message}` })
    }
  }

  return (
    <div className="p-6 sm:p-10 rounded-lg w-full max-w-md mx-auto h-full">
      <h1 className="text-3xl text-center text-black/70 dark:text-white/70 mb-6">
        Sign In
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {alert && (
          <Alert severity={alert.type} sx={{ mt: 1 }} onClose={handleCloseAlert}>
            {alert.message}
          </Alert>
        )}

        <input
          name="email"
          type="email"
          className="border-2 border-amber-600/50 dark:border-amber-200/50 rounded-md px-4 py-2 dark:placeholder:text-amber-200/50 placeholder:text-amber-600/50"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
        />
        <input
          name="password"
          type="password"
          className="border-2 border-amber-600/50 dark:border-amber-200/50 rounded-md px-4 py-2 dark:placeholder:text-amber-200/50 placeholder:text-amber-600/50"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <button
          type="submit"
          className="bg-amber-600/70 text-white font-semibold rounded-md px-4 py-2 w-full hover:bg-amber-600 transition-colors"
        >
          Log In
        </button>
      </form>
<div className='flex flex-row items-center justify-between p-3 gap-2'>
  <button onClick={() => handleGoogleClick()}>
    <GoogleCircleFilled className="sm:text-2xl text-xl cursor-pointer hover:shadow-md" />
  </button> 
  <button onClick={() => handleFacebookClick()}>
    <FacebookFilled className="sm:text-2xl text-xl cursor-pointer hover:shadow-md" />
  </button> 
  <button onClick={() => handleTwitterClick()}>
    <TwitterCircleFilled className="sm:text-2xl text-xl cursor-pointer hover:shadow-md" />
  </button>    
</div>

      <p className="mt-6 text-center text-black/70 dark:text-white/70">
        Don’t have an account?{' '}
        <span
          onClick={() => setOpen(true)}
          className="text-amber-600 dark:text-amber-200/70 cursor-pointer hover:underline"
        >
          Sign Up
        </span>
      </p>

      {open && (
        <div className="flex justify-center items-center fixed inset-0 z-50 backdrop-blur-lg">
          <div className="relative text-black dark:text-white rounded-lg p-6 w-full max-w-md">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-black dark:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <SignUpForm />
          </div>
        </div>
      )}
    </div>
  )
}

export default SignInForm
