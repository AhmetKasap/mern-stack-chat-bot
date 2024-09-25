import Navbar from '@/app/components/Navbar'
import React from 'react'

const page = ({ params }) => {
  return (
    <>
      <Navbar></Navbar>
      {params.username}

      <div className='flex flex-col gap-4  border-2 xsm:w-10/12 sm:w-1/2 md:w-2/3 lg:w-1/2 xl:w-1/2 outline-none border-green-700 mx-auto mt-12 h-[70vh] rounded-md p-8'>
        <div className='flex flex-col items-end'>
          <p className='text-white border p-2 rounded-lg border-gray-700'>bot message</p>
        </div>

        <div className='flex '>
        <p className=' border p-2 rounded-lg border-green-700 text-green-500'>user message</p>
        </div>

        {/* Mesaj kısmını en alta itmek için mt-auto ekleniyor */}
        <div className='flex gap-8 items-center mt-auto'>
          <input className='w-full border border-green-600 bg-gray-950 rounded-lg outline-none h-12 p-3 text-sm text-green-500' placeholder='write a message' type='text' />
          <button className='p-3 text-white border rounded-md hover:bg-green-800 bg-slate-950 border-green-700'>Send</button>
        </div>
      </div>

    </>
  )
}

export default page