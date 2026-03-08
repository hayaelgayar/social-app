import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ContextData } from '../../Context/Context'
export default function Login() {

  
 let{Token,setToken}= useContext(ContextData);
  const [isLoading,setisLoading]=useState(false);
 const [errMsg,setErrMsg]=useState(null);
  const navigator=useNavigate()
 let validation = z.object({
  email: z.string().email("Invalid Email!!"),
  password: z.string().regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    "Invalid!! Ex.Aa1#abcd"
  ),
})
  let form= useForm({
  defaultValues:{
   
    email:"",
    password:""
  },
  resolver: zodResolver(validation)
 })
 let{register,handleSubmit , formState}=form
 function handleLogin(values) {
  setisLoading(true);

  axios.post(`https://route-posts.routemisr.com/users/signin`, values)
    .then((res) => {
      console.log("LOGIN RESPONSE:", res.data); // debug
      if (res.data.message === "signed in successfully") {
        localStorage.setItem("userToken", res?.data?.data?.token);
        setToken(res?.data?.data?.token);
        navigator("/home");
      } else {
        setErrMsg(res.data.message || "Login failed");
      }
    })
    .catch((err) => {
      console.log("LOGIN ERROR:", err.response?.data);
      if (err.response?.status === 401) {
        setErrMsg("Invalid email or password");
      } else {
        setErrMsg(err.response?.data?.message || "Something went wrong");
      }
    })
    .finally(() => {
      setisLoading(false); // always stop loading
    });
}
  return <>
 
<form onSubmit={handleSubmit(handleLogin)} className="max-w-sm mx-auto">
  {errMsg!=null ?<h5 className='bg-red-500 text-white'>{errMsg}</h5>: ""}
  <br />
 
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
    <input type="email" {...register("email")} name='email' id="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="name@flowbite.com" />
{formState.errors.email ?<p>{formState.errors.email.message}</p> : "" } 
  </div>


  <div className="mb-5">
    <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
    <input type="password" {...register("password")} name='password' id="password" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"  />
 {formState.errors.password ?<p>{formState.errors.password.message}</p> : "" }
  </div>
 
 
  <button disabled={isLoading} type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
   {isLoading==true ? <i className='fa fa-spin fa-spinner'></i>: " Login"}
   </button>

</form>

  </>
}
