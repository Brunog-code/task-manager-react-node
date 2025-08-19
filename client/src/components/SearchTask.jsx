import React from 'react'

const SearchTask = ({ filter, setFilter}) => {
  return (
    <div className='mb-5 bg-blue-500 p-2 rounded-lg mt-3'>
        <div>
            <h3 className=' mb-2 text-white text-xl'>Filtrar</h3>
        </div>
        <div className='flex gap-5'>
              <select className='p-1 rounded-lg bg-white text-black' value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">Todas</option>
                <option value="completed">Finalizadas</option>
                <option value="open">Abertas</option>
            </select>
        </div>
    </div>
  )
}

export default SearchTask