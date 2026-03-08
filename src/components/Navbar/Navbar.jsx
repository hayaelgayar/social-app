import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/download.svg"
import signoutLogo from "../../assets/download (1).svg"
import { ContextData } from '../../Context/Context'
import userImage from "../../assets/imgi_1_default-profile.png"
export default function Navbar() {
 let{Token,setToken}=useContext(ContextData)
 
 const navigator=useNavigate()
 function signOut(){
  localStorage.removeItem("userToken");
  setToken(null);
  navigator("/login")
 }
 return <>
  

<nav className="bg-neutral-primary  w-full z-20 top-0 start-0 border-b border-default">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    {/*nav logo */}
  <Link to="home" className="flex items-center space-x-3 rtl:space-x-reverse ">
      <img src={logo} className="h-7 " alt="Logo" />
  </Link>
  {/*nav search */}
  <div className="flex items-center md:order-1">
    <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="flex items-center justify-center md:hidden text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-2 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm w-10 h-10 focus:outline-none">
      <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
      <span className="sr-only">Search</span>
    </button>
    <label htmlFor="input-group-1" className="sr-only">Your Email</label>
    <div className="relative hidden md:block">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
      </div>
      <input type="text" id="input-group-1" className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="Search"/>
    </div>
    <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-search" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/></svg>
    </button>
  </div>
  
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-2" id="navbar-search">
      <div className="relative mt-3 md:hidden">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
        </div>
        <input type="text" id="input-group-1" className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="Search"/>
      </div>
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
       {Token!==null ? <>
      <li>
        <Link to="/profile">
        <div className="w-10 h-10 rounded-full overflow-hidden ">
          <img src={userImage} alt="user image" />
        </div>
        </Link>
      </li>
      <li>Hello</li>
      <li>
          <span onClick={()=>signOut()} className=" cursor-pointer flex items-center space-x-3 rtl:space-x-reverse ">
      <img src={signoutLogo} className="h-7 " alt="Logo" />
  </span>
      </li>
       </> : <>
       <li>
  <Link
    to="/login"
    className="cursor-pointer flex items-center justify-center space-x-3 rtl:space-x-reverse
               bg-white text-slate-900 px-4 py-2 rounded hover:bg-slate-200"
  >
    Login
  </Link>
</li>
<li>
  <Link
    to="/register"
    className="cursor-pointer flex items-center justify-center space-x-3 rtl:space-x-reverse
               bg-white text-slate-900 px-4 py-2 rounded hover:bg-slate-200"
  >
    Sign Up
  </Link>
</li>
       </>}
       
        
      </ul>
    </div>
  </div>
</nav>

  </>
}
