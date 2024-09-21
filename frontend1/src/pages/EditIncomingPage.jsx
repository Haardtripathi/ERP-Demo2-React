import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import FormInputIncoming from '../components/FormInputIncoming';
import FormSelectIncoming from '../components/FormSelectIncoming';


const EditIncomingPage = () => {
    const { id } = useParams();
    const [dropdowns, setDropdowns] = useState([]);
    const [formData, setFormData] = useState({
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const API_URL = "http://localhost:5000";

    useEffect(() => {
        const fetchDropdownsAndPrevData = async () => {
            try {
                const response = await axios.get(`${API_URL}/editIncomingItem/${id}`);
                // console.log(response);
                setDropdowns(response.data.dropdowns);
                setFormData(response.data.prevData);
                console.log(formData)
            } catch (error) {
                console.error('Error fetching dropdown data:', error);
            }
        };
        fetchDropdownsAndPrevData();
    }, []);

    const handleBackClick = () => {
        navigate('/incoming');
    };

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Validate form inputs
    const validate = () => {
        const newErrors = {};

        // Check if all fields are filled
        for (const [key, value] of Object.entries(formData)) {
            if (!value.trim()) {
                newErrors[key] = `${key.replace(/([A-Z])/g, ' $1').toUpperCase()} is required.`;
            }
        }

        // Additional validations
        const phoneRegex = /^\d{10}$/;// Indian phone number validation
        if (formData.cmphone && !formData.cmphone.match(phoneRegex)) {
            newErrors.cmphone = "Enter a valid 10-digit Indian phone number.";
        }

        if (formData.cmPhoneAlternateNumber && !formData.cmPhoneAlternateNumber.match(phoneRegex)) {
            newErrors.cmPhoneAlternateNumber = "Enter a valid alternate 10-digit Indian phone number.";
        }

        if (formData.age && (!/^\d+$/.test(formData.age) || formData.age <= 0)) {
            newErrors.age = "Enter a valid age.";
        }

        if (formData.height && (!/^\d+$/.test(formData.height) || formData.height <= 0)) {
            newErrors.height = "Enter a valid height.";
        }

        if (formData.weight && (!/^\d+$/.test(formData.weight) || formData.weight <= 0)) {
            newErrors.weight = "Enter a valid weight.";
        }

        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Set errors if validation fails
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/addIncomingData`, formData);
            console.log(response.data.message);
            navigate('/incoming');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-8">

            <div className="mb-1">
                <button onClick={handleBackClick} className="flex items-center text-blue-500 hover:text-blue-700">
                    <FaArrowLeft className="mr-2" /> Back
                </button>
            </div>

            <form className="max-w-4xl mx-auto p-6 bg-gray-800 shadow-lg rounded-lg text-white" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-semibold mb-6 text-center text-gray-100">Add Incoming Data</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Source Dropdown */}
                    {dropdowns[1] && (
                        <FormSelectIncoming
                            label="Source"
                            name="source"
                            dropdown={dropdowns[1]}
                            value={formData.source}
                            onChange={handleChange}
                            error={errors.source} // Show error if exists
                        />
                    )}

                    {/* Text Inputs */}
                    <FormInputIncoming
                        label="CM First Name"
                        type="text"
                        name="cmFirstName"
                        value={formData.cmFirstName}
                        onChange={handleChange}
                        error={errors.cmFirstName} // Show error if exists
                    />
                    <FormInputIncoming
                        label="CM Last Name"
                        type="text"
                        name="cmLastName"
                        value={formData.cmLastName}
                        onChange={handleChange}
                        error={errors.cmLastName} // Show error if exists
                    />
                    <FormInputIncoming
                        label="CM Phone"
                        type="text"
                        name="cmphone"
                        value={formData.cmphone}
                        onChange={handleChange}
                        error={errors.cmphone} // Show error if exists
                    />
                    <FormInputIncoming
                        label="CM Alternate Number"
                        type="text"
                        name="cmPhoneAlternateNumber"
                        value={formData.cmPhoneAlternateNumber}
                        onChange={handleChange}
                        error={errors.cmPhoneAlternateNumber} // Show error if exists
                    />

                    {/* Agent Name Dropdown */}
                    {dropdowns[2] && (
                        <FormSelectIncoming
                            label="Agent Name"
                            name="agent_name"
                            dropdown={dropdowns[2]}
                            value={formData.agent_name}
                            onChange={handleChange}
                            error={errors.agent_name} // Show error if exists
                        />
                    )}

                    {/* Language Dropdown */}
                    {dropdowns[3] && (
                        <FormSelectIncoming
                            label="Language"
                            name="language"
                            dropdown={dropdowns[3]}
                            value={formData.language}
                            onChange={handleChange}
                            error={errors.language} // Show error if exists
                        />
                    )}

                    {/* Disease Dropdown */}
                    {dropdowns[4] && (
                        <FormSelectIncoming
                            label="Disease"
                            name="disease"
                            dropdown={dropdowns[4]}
                            value={formData.disease}
                            onChange={handleChange}
                            error={errors.disease} // Show error if exists
                        />
                    )}

                    {/* More Text Inputs */}
                    <FormInputIncoming
                        label="Age"
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        error={errors.age} // Show error if exists
                    />
                    <FormInputIncoming
                        label="Height"
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        error={errors.height} // Show error if exists
                    />
                    <FormInputIncoming
                        label="Weight"
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        error={errors.weight} // Show error if exists
                    />

                    {/* State Dropdown */}
                    {dropdowns[5] && (
                        <FormSelectIncoming
                            label="State"
                            name="state"
                            dropdown={dropdowns[5]}
                            value={formData.state}
                            onChange={handleChange}
                            error={errors.state} // Show error if exists
                        />
                    )}

                    <FormInputIncoming
                        label="City/District"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        error={errors.city} // Show error if exists
                    />

                    {/* Remark Dropdown */}
                    {dropdowns[6] && (
                        <FormSelectIncoming
                            label="Remark"
                            name="remark"
                            dropdown={dropdowns[6]}
                            value={formData.remark}
                            onChange={handleChange}
                            error={errors.remark} // Show error if exists
                        />
                    )}

                    <FormInputIncoming
                        label="Comment"
                        type="text"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        error={errors.comment} // Show error if exists
                    />
                </div>

                {/* Error Messages */}
                {Object.keys(errors).length > 0 && (
                    <div className="mt-4 text-red-500">
                        {Object.values(errors).map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </div>
                )}

                <button type="submit" className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-lg">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default EditIncomingPage