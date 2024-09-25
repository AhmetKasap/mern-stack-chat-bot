'use client'
import Navbar from '@/app/components/Navbar'
import axios from 'axios'
import React, { useState } from 'react'

const page = ({ params }) => {

  //* send message

  const [message,setMessage] = useState()
  const [inputDisabled, setInputDisabled] = useState(false)
  const [allMessage, setAllMessage] = useState([])

  const [botMessage, setBotMessage] = useState([])

  const sendMessage = async() => {
    const token = Cookies.get('token')
    setInputDisabled(true)

    try {
      const response = await axios.post('http://localhost:5000/api/v1/chats', {message}, {
        headers: { Authorization: `Bearer ${token}` }
      })
  
      if(response.data.success ===true) {
        setBotMessage(prev => [...prev, response.data.data.message])
        setInputDisabled(false)
        setAllInput(prevUserData => [...prevUserData, message])
        setMessage('')
      }else {
        console.log("error")
      }
      
    } catch (error) {
      console.log(error)
    } 
   
  }

  //* get message 


  
  return (
    <>
      <Navbar></Navbar>
      {params.username}

      <div className='flex flex-col gap-4  border-2 xsm:w-10/12 sm:w-1/2 md:w-2/3 lg:w-1/2 xl:w-1/2 outline-none border-green-700 mx-auto mt-12 h-[70vh] rounded-md p-8'>
        <div className='flex flex-col items-end'>
          {
            allMessage && allMessage.map(data => {
              return(
                <p className=' border p-2 rounded-lg border-green-700 text-green-500'> {data} </p>

              )
            })
          }
        </div>


        <div className='flex '>
          {
            botMessage && botMessage.map(message => {
              return(
                <p className='text-white border p-2 rounded-lg border-gray-700'>{message}</p>
              )
            })
          }
        </div>

        <div className='flex gap-8 items-center mt-auto'>
          {
            inputDisabled ? (
              <input disabled id='input' value={message} onChange={(e) =>  setMessage(e.target.value)} className='w-full border border-green-600 bg-gray-950 rounded-lg outline-none h-12 p-3 text-sm text-green-500' placeholder='write a message' type='text' />

            ) : (
              <input id='input' value={message} onChange={(e) =>  setMessage(e.target.value)} className='w-full border border-green-600 bg-gray-950 rounded-lg outline-none h-12 p-3 text-sm text-green-500' placeholder='write a message' type='text' />

            )
          }
          <button onClick={() => sendMessage()} className='p-3 text-white border rounded-md hover:bg-green-800 bg-slate-950 border-green-700'>Send</button>
        </div>
      </div>

    </>
  )
}

export default page