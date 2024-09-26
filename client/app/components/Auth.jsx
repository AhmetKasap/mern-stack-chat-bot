'use client'
import React, { useState } from 'react'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


const Auth = () => {
  //* redirection
  const router = useRouter()

  //* toast 
  const notify = (message) => toast(message);

  //* log in - sign up button
  const [control, setControl] = useState(true)

  //* api
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const register = async() => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/register', {username, email, password})
      if(response.data.success === true) {
        notify('registration created successfully')
        setUsername('')
        setEmail('')
        setPassword('')
      }else notify('update the information and try again')
      
    } catch (error) {
      notify('error during registration')
    }

  }
  const login = async() => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/login', {email, password})
      if(response.data.success === true) {
        Cookies.set('username', response.data.data.user.username)
        Cookies.set('token', response.data.data.token) 

        notify('login successfully')
        setEmail('')
        setPassword('')

        router.push(`/chat/${response.data.data.user.username}`)
      }else notify('update the information and try again')
      
    } catch (error) {
      notify('error during login')
    }

  }


  return (
    <>
    <ToastContainer />
          {
            control ? (
              <div className='sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 border rounded-lg bg-white p-8 shadow-sm  '>
              <h1 className='text-3xl'>Log In</h1>
  
              <div className='flex flex-col gap-4 mt-8'>
                <label htmlFor='email'>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} id='email' type='email' className='h-8 w-full text-sm border rounded-md outline-none p-2'/> 
                <label htmlFor='password'>Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} id='password' type='password' className='h-8 w-full text-sm border rounded-md outline-none p-2'/> 
  
                <button onClick={() => login()} className='border p-3 rounded-lg text-white bg-green-500 hover:bg-green-600 w-24 mt-2'>Log In</button>
                <button onClick={() => setControl(false)} className='text-center text-gray-500 text-sm underline-offset-1'>Sign Up</button>
              </div>
            </div>

            ) : (
              <div className='sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 border rounded-lg bg-white p-8 shadow-sm  '>
              <h1 className='text-3xl'>Sign Up</h1>
  
              <div className='flex flex-col gap-4 mt-8'>
                <label htmlFor='username'>Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} id='username' type='text' className='h-8 w-full text-sm border rounded-md outline-none p-2'/> 
                <label htmlFor='email'>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} id='email' type='email' className='h-8 w-full text-sm border rounded-md outline-none p-2'/> 
                <label htmlFor='password'>Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} id='password' type='password' className='h-8 w-full text-sm border rounded-md outline-none p-2'/> 
  
                <button onClick={() => register()} className='border p-3 rounded-lg text-white bg-green-500 hover:bg-green-600 w-24 mt-2'>Sign Up</button>
                <button onClick={() => setControl(true)} className='text-center text-gray-500 text-sm underline-offset-1'>Log In</button>
              </div>
            </div>
            )
          }
       
    </>
  )
}

export default Auth