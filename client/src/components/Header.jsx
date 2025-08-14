import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useState } from 'react';

const Header = () => {

  const [showDivExit, setShowDivExit] = useState(false)

  const toogleDivExit = () => {
    setShowDivExit(!showDivExit)
  }

  return (
    <div className='flex justify-around items-center p-2 fixed top-0 mb-5 bg-blue-500 w-full shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]'>

        <div>
            <p className="text-yellow-400 text-3xl font-logo">To do list</p>
        </div>

          <div className='flex relative items-center'>
            <p className='text-white mr-2'>Olá, Bruno Gonçalves</p>
            <FaUserCircle 
            onClick={toogleDivExit} 
            size={28} 
            className='text-white cursor-pointer hover:text-gray-200 transition-colors' />
            {showDivExit && (
              <div className='absolute top-9 right-0 lvory-bg rounded-lg shadow-lg w-20 text-center py-2 animate-fade-in'>
                <button>Sair</button>
              </div>
            )}
        </div>

    </div>
  )
}

export default Header