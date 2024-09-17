import React from 'react';

const FormInputIncoming = ({ label, name, type = 'text', value, onChange }) => {
    return (
        <div className="form-group mb-4">
            <label className="block mb-2 font-semibold text-gray-200" htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="border border-gray-600 bg-gray-700 text-white rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

export default FormInputIncoming;
