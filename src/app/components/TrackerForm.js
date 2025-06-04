'use client'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addData } from '@/store/dataSlice'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function TrackerForm() {
  const router = useRouter()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    category: '',
    date: ''
  })

  const authStatus = useSelector((state) => state.auth.status)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const resetFormfield = () => {
    setFormData({
      amount: '',
      name: '',
      category: '',
      date: ''
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.amount || !formData.name || !formData.category || !formData.date) {
      alert('Please fill in all fields.')
      return
    }

    dispatch(addData({ data: formData }))
    alert('Data submitted successfully!')
    resetFormfield()
  }

  return (
    <>
      {authStatus ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row w-full max-w-4xl mx-auto items-center justify-center gap-2 md:gap-4 p-4"
        >
          {/* Expense Name */}
          <select
            name="name"
            className="w-full md:w-auto px-6 py-4 
                       text-black sm:text-white md:text-white 
                       bg-amber-400/70 sm:bg-amber-500 md:bg-amber-600 
                       hover:bg-amber-600 dark:hover:bg-amber-400 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          >
            <option value="">Expense Name</option>
            <option value="Housing">Housing</option>
            <option value="Transportation">Transportation</option>
            <option value="Groceries">Groceries & Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Health">Health & Insurance</option>
            <option value="Education">Education</option>
            <option value="Family">Family & Kids</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Work">Work & Business</option>
            <option value="Debt">Debt Payments</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Gifts">Gifts & Donations</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>

          {/* Amount */}
          <input
            name="amount"
            type="text"
            className="w-full md:w-auto px-6 py-4 
                       text-black sm:text-white md:text-white 
                       bg-amber-400/70 sm:bg-amber-500 md:bg-amber-600 
                       hover:bg-amber-600 dark:hover:bg-amber-400 rounded"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
          />

          {/* Category */}
          <select
            name="category"
            className="w-full md:w-auto px-6 py-4 
                       text-black sm:text-white md:text-white 
                       bg-amber-400/70 sm:bg-amber-500 md:bg-amber-600 
                       hover:bg-amber-600 dark:hover:bg-amber-400 rounded"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Category</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          {/* Date */}
          <input
            name="date"
            type="date"
            className="w-full md:w-auto px-6 py-4 
                       text-black sm:text-white md:text-white 
                       bg-amber-400/70 sm:bg-amber-500 md:bg-amber-600 
                       hover:bg-amber-600 dark:hover:bg-amber-400 rounded"
            value={formData.date}
            onChange={handleChange}
            required
            style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'textfield'
            }}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-4 
                       rounded
                       dark:bg-black dark:text-amber-400 text-amber-700 bg-white
                       "
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center h-svh max-w-full dark:bg-white bg-black">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12 sm:size-24 mb-2 text-amber-500 dark:text-amber-300 animate-pulse">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
</svg>

          <h1 className="text-xl md:text-3xl m-5 font-semibold text-center text-amber-400 dark:text-amber-300">
            Sign in to add expenses
          </h1>
          <p className="mt-4 text-center text-sm text-white/60 dark:text-black/60">
            Please log in to continue tracking your finances.
          </p>
        </div>
      )}
    </>
  )
}

export default TrackerForm
