import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function ChangePassword() {
 let navigate=useNavigate()
 const {register,handleSubmit}=useForm({
    defaultValues:{
        "password":"",
        "newPassword":""
    }
 })
 async function onSubmitForm(values) {
    try {
        const {data}=await axios.patch(`https://route-posts.routemisr.com/users/change-password`,values,{
            headers:{
               Authorization: `Bearer ${localStorage.getItem("userToken")}`
                
            }
            
        })
       

        
        localStorage.removeItem("userToken");
    toast.success("Password changed successfully. Please log in again.");
    navigate("/login");
    return data
    } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("userToken");
      toast.error("Session expired. Please log in again.");
      navigate("/login");
      return;
    }
          toast.error(error.response?.data?.message || "Something went wrong")
    }
    
    
 }

 return <>
 
  <form onSubmit={handleSubmit(onSubmitForm)}  >
    
    <div className='rounded bg-slate-400 flex flex-col gap-4 p-4 w-1/2 mx-auto my-5'>
         <h1 className='text-center text-white text-2xl'>Change Password Form</h1>
<input {...register("password")} className='rounded' type="password" placeholder='Enter current password....' />
<input {...register("newPassword")} className='rounded' type="password" placeholder='Enter new password....' />
<button className='rounded bg-white text-slate-900 mx-auto w-fit p-4 cursor-pointer'>Update Password</button>
    </div>
  </form>
  
  
  </>
}
