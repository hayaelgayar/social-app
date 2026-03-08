import React, { useState, useEffect } from 'react'

import { useForm} from 'react-hook-form'
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Register() {

  const [isLoading,setisLoading]=useState(false);
 const [errMsg,setErrMsg]=useState(null);
  const navigator=useNavigate()
  
 let validation= z.object({
name: z.string().min(2,"at least 2 characters!!").max(15,"max 15 characters!!"),
username: z.string().min(3, "Username is required"),
email: z.string().email("Invalid Email!!"),
password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Invalid!! Ex.Aa1#abcd"),
rePassword:z.string(),
dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/,"Invalid Date!!").refine((date)=>{
  const userDate=new Date(date);
  const todayDate=new Date();
  todayDate.setHours(0,0,0,0);
  return userDate<todayDate
},"Invalid Date!!"),
gender: z.enum(["male", "female"], 
  "Gender Required!!" 
)

  }).refine((object)=>{
  return object.password==object.rePassword
  },{message:"rePassword must match password!!", path:["rePassword"]})

  let form= useForm({
  defaultValues:{
    name:"",
    username:"",
    email:"",
    password:"",
    rePassword:"",
    dateOfBirth:"",
    gender:"male"
  },
  resolver: zodResolver(validation)
 })
 let{register,handleSubmit , formState}=form
 function Registering(values){
   console.log("VALUES BEING SENT:", values);
  setisLoading(true);
  axios.post(`https://route-posts.routemisr.com/users/signup`, values)
  .then((res)=>{
     console.log("FULL RESPONSE:", res.data);
if(res.data.success == true){
  navigator("/login")
  setisLoading(false);
}

  })
   .catch((err) => {
      console.log("FULL ERROR:", err.response);
      setErrMsg(err.response?.data?.error || "Something went wrong");
    })
    .finally(() => {
      setisLoading(false); 
    });

 }
  return <>
 
<form onSubmit={handleSubmit(Registering)} className="max-w-sm mx-auto">
  {errMsg!=null ?<h5 className='bg-red-500 text-white'>{errMsg}</h5>: ""}
  <br />
  <div className="mb-5">
    <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">Your name</label>
    <input type="text" {...register("name")} name='name' id="name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"   />
  
{formState.errors.name ? <p>{formState.errors.name.message}</p> : ""} </div>
  <div className="mb-5">
    <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">Your username</label>
    <input type="text" {...register("username")} name='username' id="username" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"   />
  
{formState.errors.username ?<p>{formState.errors.username.message}</p> : "" }  </div>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
    <input type="email" {...register("email")} name='email' id="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="name@flowbite.com" />
{formState.errors.email ?<p>{formState.errors.email.message}</p> : "" } 
  </div>

<div className="mb-5">
  <label htmlFor="gender" className="block mb-2.5 text-sm font-medium text-heading">Your gender</label>
  <select {...register("gender")}  id="gender" className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
    <option value="male"  name="gender">male</option>
    <option value="female" name="gender">female</option>
 
  </select>
  {formState.errors.gender ?<p>{formState.errors.gender.message}</p> : "" }
</div>

  <div className="mb-5">
    <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
    <input type="password" {...register("password")} name='password' id="password" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  />
 {formState.errors.password ?<p>{formState.errors.password.message}</p> : "" }
  </div>
  <div className="mb-5">
    <label htmlFor="rePassword" className="block mb-2.5 text-sm font-medium text-heading">Repeat password</label>
    <input type="password" {...register("rePassword")} name='rePassword' id="rePassword" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  {formState.errors.rePassword ?<p>{formState.errors.rePassword.message}</p> : "" }
  </div>
  <div className="mb-5">
    <label htmlFor="dateOfBirth" className="block mb-2.5 text-sm font-medium text-heading">Date of birth</label>
    <input type="date" {...register("dateOfBirth")} name='dateOfBirth' id="dateOfBirth" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"/>
 {formState.errors.dateOfBirth ?<p>{formState.errors.dateOfBirth.message}</p> : "" }
  </div>
  <button disabled={isLoading} type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
   {isLoading==true ? <i className='fa fa-spin fa-spinner'></i>: " Submit"}
   </button>

  
</form>

  </>
}
