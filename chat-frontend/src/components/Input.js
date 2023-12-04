import React from 'react'

const Input = ({ type, placeholder, value, onChange }) => {
    return (
        <input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className='w-2/3 px-4 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-cyan-500 text-lg text-black'
        />
    )
}

export default Input;