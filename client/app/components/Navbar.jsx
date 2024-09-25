'use client'
import Cookies from 'js-cookie';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaAffiliatetheme } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";




const Navbar = () => {

  const router = useRouter()
  const [username, setUsername] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const tokenValue = Cookies.get('token')
    const usernameValue = Cookies.get('username')
    
    setToken(tokenValue)
    setUsername(usernameValue)
    setLoading(false)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  const logout = () => {
    Cookies.remove('username')
    Cookies.remove('token')
    setToken('')
    setUsername('')
    router.push('/')
    
  }
  return (
    <>
        <nav className='flex w-10/12 mx-auto mt-8 items-center justify-between'>
                <div className='w-1/4'>
                    <Link href='/'>
                     <FaAffiliatetheme  className='text-5xl text-green-400'/>
                    </Link>
                </div>

                <div className='w-full flex justify-end'>
                    <ul className='flex  flex-row gap-6 mr-16'>
                        {
                          token ? (
                            <>
                              <div className='flex flex-row items-center gap-4'>
                                <Link className='text-white flex gap-2' href={'/chat/'+username}>
                                  <FaUser className='text-white text-2xl' />
                                  <h1 className='text-white text-lg'>{username}</h1>
                                </Link>
                                
                                <button onClick={() => logout()} className='text-white text-lg font-roboto hover:underline hover:text-green-400  underline-offset-8'> <MdLogout className='text-2xl text-white'/></button>
                              </div>
                              
                            </>
                          ) : (
                            <>
                                <Link href='/' className='text-white text-lg font-roboto hover:underline hover:text-green-400  underline-offset-8'><li>Chat BOT</li></Link>
                                <Link href='/' className='text-white text-lg font-roboto hover:underline hover:text-green-400 underline-offset-8'><li>Mobil APP </li></Link>
                            </>
                          
                          )
                        }
                        
                    </ul>
                </div>
             
            </nav>

    </>
  )
}

export default Navbar