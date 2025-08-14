import React from 'react'

const SearchTask = () => {
  return (
    <div className='mb-5 bg-blue-500 p-2 rounded-lg mt-3'>
        <div>
            <h3 className=' mb-2 text-white text-xl'>Filtrar</h3>
        </div>
        <div className='flex gap-5'>
            <label htmlFor="finalizadas" className="text-white">
              <input className="mr-1 accent-[#0e1f2f]" type="checkbox" id="finalizadas" name="finalizadas" />
              Finalizadas
            </label>
            <label htmlFor="Abertas" className="text-white">
              <input className="mr-1 accent-[#0e1f2f]" type="checkbox" id="Abertas" name="Abertas" />
              Abertas
            </label>
        </div>
    </div>
  )
}

export default SearchTask