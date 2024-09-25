'use client'
import Navbar from '@/app/components/Navbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {

  //* send message

  const [userMessage, setUserMessage] = useState()
  const [inputDisabled, setInputDisabled] = useState(false)
  const [allUserMessage, setAllUserMessage] = useState([])

  const [botMessage, setBotMessage] = useState([])

  const sendMessage = async() => {
    const token = Cookies.get('token')
    setInputDisabled(true)

    try {
      const response = await axios.post('http://localhost:5000/api/v1/chats', {userMessage}, {
        headers: { Authorization: `Bearer ${token}` }
      })
  
      if(response.data.success ===true) {
        setBotMessage(prev => [...prev, response.data.data])
        setInputDisabled(false)
        setAllUserMessage(prev => [...prev, userMessage])
        setUserMessage('')
      }else {
        console.log("error")
      }
      
    } catch (error) {
      console.log(error)
    } 
  }

  const combinedMessages = allUserMessage.map((msg, index) => ({
    userMessage: msg,
    botMessage: botMessage[index] || null, 
  }))

  //* get old chats

  const [oldChtas, setOldChats] = useState()

  useEffect(() => {
    
  const getChat = async() => {
    const token = Cookies.get('token')

    try {
      const response = await axios.get('http://localhost:5000/api/v1/chats', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
  
      if(response.data.success ===true) {
        setOldChats(response.data.data)
        
      }else {
        console.log("error")
      }
      
    } catch (error) {
      console.log(error)
    } 
  }

  getChat()


  },[])

  console.log("oldChtas", oldChtas)



  
  return (
    <>
      <Navbar></Navbar>

      <div className='flex flex-col gap-4    border-2 xsm:w-10/12 sm:w-1/2 md:w-2/3 lg:w-1/2 xl:w-1/2 outline-none border-green-700 mx-auto mt-12 h-[70vh] rounded-md p-8'>
        <div className='overflow-y-scroll p-4'>

          {
            oldChtas && oldChtas.map(chat => {
              return(
                <div className=''>
                <div className='flex flex-col items-end'>
                  <p className=' border p-2 rounded-lg border-green-700 text-green-500'> {chat.userMessage} </p>
                </div>
                <div className='flex '>
                 <p className=' border p-2 rounded-lg border-gray-700 text-white'> {chat.botMessage} </p>
                </div>
            </div>
              )
            })
          }

          {
            combinedMessages && combinedMessages.map(message => {
              return(
                <div className=''>
                    <div className='flex flex-col items-end'>
                      <p className=' border p-2 rounded-lg border-green-700 text-green-500'> {message.userMessage} </p>
                    </div>
                    <div className='flex '>
                     <p className=' border p-2 rounded-lg border-gray-700 text-white '> {message.botMessage} </p>
                    </div>
                </div>
              ) 
            })
          }
        </div>

        <div className='flex gap-8 items-center sticky bottom-0'>
          {
            inputDisabled ? (
              <input disabled id='input' value={userMessage} onChange={(e) =>  setUserMessage(e.target.value)} className='w-full border border-green-600 bg-gray-950 rounded-lg outline-none h-12 p-3 text-sm text-green-500' placeholder='write a message' type='text' />
            ) : (
              <input id='input' value={userMessage} onChange={(e) =>  setUserMessage(e.target.value)} className='w-full border border-green-600 bg-gray-950 rounded-lg outline-none h-12 p-3 text-sm text-green-500' placeholder='write a message' type='text' />
            )
          }
          <button onClick={() => sendMessage()} className='p-3 text-white border rounded-md hover:bg-green-800 bg-slate-950 border-green-700'>Send</button>
        </div>
      </div>

    </>
  )
}

export default page