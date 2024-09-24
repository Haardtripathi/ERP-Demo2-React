import React from 'react';

const FormSelectIncoming = ({ label, name, dropdown, onChange, value, error }) => {
    return (
        <div className="form-group mb-4">
            <label className="block mb-2 font-semibold text-gray-200" htmlFor={name}>
                {label}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`border ${error ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white rounded-lg p-2 w-full focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
            >
                <option value="" className="text-gray-500">Select...</option>
                {dropdown.values.map((dropdownValue, index) => (
                    <option key={index} value={dropdownValue} className="text-gray-900 bg-white">
                        {dropdownValue}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}

export default FormSelectIncoming;
