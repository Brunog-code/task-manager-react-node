import React from 'react'
import { FiPlus   } from "react-icons/fi"

const AddTask = () => {
  return (
    <div>
          <div>
              <h3 className='mt-3 text-white text-xl'>Cadastrar</h3>
          </div>
         <form className='flex justify-center my-2'>
            <input className='flex-1 p-1 mr-4 border-4 border-gray-50 rounded-md outline-none focus:border-[#3f5170]' 
            type="text" 
            placeholder='Digite a tarefa'
            />
            <button className=" dark-blue-bg hover:bg-[#0a161f] text-white p-1 rounded-md" type="submit"><FiPlus size={24} /></button>
        </form>

    </div>
  )
}

export default AddTask