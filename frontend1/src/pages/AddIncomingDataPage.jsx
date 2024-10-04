import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import FormInputIncoming from '../components/FormInputIncoming';
import FormSelectIncoming from '../components/FormSelectIncoming';

const AddIncomingDataPage = () => {
    const [dropdowns, setDropdowns] = useState({});
    const [formData, setFormData] = useState({
        cmFirstName: '',
        cmLastName: '',
        cmphone: '',
        cmPhoneAlternateNumber: '',
        age: '',
        height: '',
        weight: '',
        city: '',
        comment: '',
        source: '',
        source_id: '',  // Added for source ID
        agent_name: '',
        agent_id: '',    // Added for agent ID
        language: '',
        language_id: '',  // Added for language ID
        disease: '',
        disease_id: '',   // Added for disease ID
        state: '',
        state_id: '',     // Added for state ID
        remark: '',
        remark_id: '',    // Added for remark ID
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const API_URL = "http://localhost:5000"; // Your backend API URL

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const response = await axios.get(`${API_URL}/addIncomingData`);
                setDropdowns(response.data.dropdowns);
            } catch (error) {
                console.error('Error fetching dropdown data:', error);
            }
        };
        fetchDropdowns();
    }, []);

    const handleBackClick = () => {
        navigate('/incoming');
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            ...(name === 'source' ? { source_id: dropdowns["source"].id } : {}),
            ...(name === 'agent_name' ? { agent_id: dropdowns["agent name"].id } : {}),
            ...(name === 'language' ? { language_id: dropdowns["language"].id } : {}),
            ...(name === 'disease' ? { disease_id: dropdowns["disease"].id } : {}),
            ...(name === 'state' ? { state_id: dropdowns["state"].id } : {}),
            ...(name === 'remark' ? { remark_id: dropdowns["remark"].id } : {}),
        }));
    };

    // Validate form inputs
    const validate = () => {
        const newErrors = {};
        const requiredFields = ['source', 'cmFirstName', 'cmLastName', 'cmphone', 'agent_name', 'language', 'disease', 'age', 'height', 'weight', 'state', 'city', 'remark', 'comment'];
        const phoneRegex = /^\d{10}$/; // Validates 10-digit phone number

        // Check required fields
        requiredFields.forEach(field => {
            if (!formData[field]) newErrors[field] = "This field is required.";
        });

        // Validate 10-digit phone numbers
        if (formData.cmphone && !phoneRegex.test(formData.cmphone)) {
            newErrors.cmphone = "Enter a valid 10-digit phone number.";
        }

        if (formData.cmPhoneAlternateNumber && !phoneRegex.test(formData.cmPhoneAlternateNumber)) {
            newErrors.cmPhoneAlternateNumber = "Enter a valid 10-digit alternate phone number.";
        }

        // Validate numerical fields: age, height, weight
        ['age', 'height', 'weight'].forEach(field => {
            if (formData[field] && (!/^\d+$/.test(formData[field]) || Number(formData[field]) <= 0)) {
                newErrors[field] = `Enter a valid ${field}.`;
            }
        });

        return newErrors;
    };

    // Handle form submission
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
                    {dropdowns["source"] && (
                        <FormSelectIncoming
                            label="Source"
                            name="source"
                            dropdown={dropdowns["source"]}
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
                        type="number"
                        name="cmphone"
                        value={formData.cmphone}
                        onChange={handleChange}
                        error={errors.cmphone} // Show error if exists
                    />
                    <FormInputIncoming
                        label="CM Alternate Number"
                        type="number"
                        name="cmPhoneAlternateNumber"
                        value={formData.cmPhoneAlternateNumber}
                        onChange={handleChange}
                        error={errors.cmPhoneAlternateNumber} // Show error if exists
                    />

                    {/* Agent Name Dropdown */}
                    {dropdowns["agent name"] && (
                        <FormSelectIncoming
                            label="Agent Name"
                            name="agent_name"
                            dropdown={dropdowns["agent name"]}
                            value={formData.agent_name}
                            onChange={handleChange}
                            error={errors.agent_name} // Show error if exists
                        />
                    )}

                    {/* Language Dropdown */}
                    {dropdowns["language"] && (
                        <FormSelectIncoming
                            label="Language"
                            name="language"
                            dropdown={dropdowns["language"]}
                            value={formData.language}
                            onChange={handleChange}
                            error={errors.language} // Show error if exists
                        />
                    )}

                    {/* Disease Dropdown */}
                    {dropdowns["disease"] && (
                        <FormSelectIncoming
                            label="Disease"
                            name="disease"
                            dropdown={dropdowns["disease"]}
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
                    {dropdowns["state"] && (
                        <FormSelectIncoming
                            label="State"
                            name="state"
                            dropdown={dropdowns["state"]}
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
                    {dropdowns["remark"] && (
                        <FormSelectIncoming
                            label="Remark"
                            name="remark"
                            dropdown={dropdowns["remark"]}
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

                <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddIncomingDataPage;
