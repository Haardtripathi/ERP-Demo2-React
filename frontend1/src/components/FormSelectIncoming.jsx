import React from 'react';

const FormSelectIncoming = ({ label, name, dropdown, onChange }) => {
    return (
        <div className="form-group mb-4">
            <label className="block mb-2 font-semibold text-gray-200" htmlFor={name}>{label}</label>
            <select
                name={name}
                className="border border-gray-600 bg-gray-700 text-white rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={onChange}
            >
                <option value="" className="text-gray-500">Select...</option>
                {dropdown.values.map((value, index) => (
                    <option key={index} value={value} name={name} className="text-gray-900 bg-white">
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FormSelectIncoming;
