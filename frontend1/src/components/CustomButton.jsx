
import React from 'react'

const CustomButton = ({ onClick, active, children }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded ${active
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                } transition-colors duration-200`}
        >
            {children}
        </button>
    )
}

export default CustomButton