import React from 'react'
import { FiTrash, FiCheck } from 'react-icons/fi'
import { FaEdit } from "react-icons/fa";


const Task = () => {
  return (
    <div className='flex-1 w-full flex justify-between bg-[#1E1E1E] p-2 rounded-lg text-white mb-2'>

        <div className='flex gap-2 items-center'>
          <button  className='bg-green-500 rounded-lg p-1 hover:bg-green-600'><FiCheck size={17}/></button>
          <div className='flex flex-col'>
            <p className='text-2xl'>title</p>
            <p className='text-sm'>data</p>
          </div>
        </div>

        <div className='flex gap-2 items-center'>
          <button  className='bg-blue-500 rounded-lg p-1 hover:bg-blue-600'><FaEdit size={20} /></button>
          <button className='bg-red-500 rounded-lg p-1 hover:bg-red-600'><FiTrash size={20}/> </button>
        </div>

    </div>
  )
}

export default Task