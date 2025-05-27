'use client'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addData } from '@/store/dataSlice'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DashboardLayout from '../components/DashboardLayout';

function TrackerForm() {
  const router = useRouter()
  const dispatch = useDispatch()
    const [formData,setFormData] = useState({
        amount: '',
        name:'',
        category:'',
        date:''
    })

    const authStatus = useSelector((state) => state.auth.status)

    console.log('authStatus',authStatus)
    
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
        amount: '',
        name:'',
        category:'',
        date:''
    })
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.amount || !formData.name || !formData.category || !formData.date) {
        alert("Please fill in all fields.");
        return;
      }

      dispatch(addData({ data: formData }));   
      alert("Data submitted successfully!");
      resetFormfield();
    };
    
  return (
    <DashboardLayout>
    {authStatus ? (
    <form onSubmit={handleSubmit} className='flex md:flex-row flex-col w-full gap-2 items-center justify-center p-4 '>
<select
  name="name"
  className="border-amber-600/50 text-amber-600/50 dark:text-amber-200/50 dark:bg-black bg-white dark:border-amber-200/50 border-2 appearance-none rounded-sm p-2 m-5 mb-2 md:mb-0 dark:placeholder:text-amber-200/50 placeholder:text-amber-600/50"
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

       <input
       name='amount'
       type='string'
       className='border-amber-600/50 dark:border-amber-200/50 border-2 rounded-sm p-2  m-5 mb-2 md:mb-0 dark:placeholder:text-amber-200/50 placeholder:text-amber-600/50'
       value={formData.amount}
       onChange={handleChange}
       placeholder='Amount'
        required
       />
       <select
       name='category'
       className='border-amber-600/50 text-amber-600/50 dark:text-amber-200/50 dark:bg-black bg-white dark:border-amber-200/50 border-2 appearance-none rounded-sm p-2 m-5 mb-2 md:mb-0 dark:placeholder:text-amber-200/50 placeholder:text-amber-600/50'
       value={formData.category}
       onChange={handleChange}
        required
       >
        <option className='p-2' value=''>Category</option>
        <option value='Income'>Income</option>
        <option value='Expense'>Expense</option>
      </select>
      <input
  name='date'
  type='date'
  className='border-amber-600/50 dark:border-amber-200/50 border-2 rounded-sm p-2 m-5 mb-2 md:mb-0 dark:text-amber-200/50 text-amber-600/50'
  value={formData.date}
  onChange={handleChange}
  placeholder='Date'
  required
  style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'textfield' }}
/>

       <button type='submit' className='bg-amber-600/50 text-white/70 rounded-sm shadow-sm pt-2 pb-2 pl-4 pr-4  m-5 mb-2 md:mb-0'>
        Submit
       </button>
    </form>) : (
        <div className="flex flex-col items-center justify-center h-svh max-w-full  mx-auto bg-white rounded-2xl dark:bg-black ">
        <h1 className="text-3xl font-semibold text-center text-amber-600 dark:text-amber-200">
          Sign in to add expenses
        </h1>
        <p className="mt-4 text-center text-sm text-black/50 dark:text-white/50">
          Please log in to continue tracking your finances.
        </p>
      </div>
      
    )}
    </DashboardLayout>
  )

}

export default TrackerForm