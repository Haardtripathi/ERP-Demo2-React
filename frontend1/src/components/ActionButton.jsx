import React from 'react';

const ActionButton = ({ onClick, label, color }) => (
    <button
        className={`${color} text-white px-3 py-1 rounded hover:bg-opacity-80`}
        onClick={onClick}
    >
        {label}
    </button>
);

export default ActionButton;
