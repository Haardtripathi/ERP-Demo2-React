import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import FormInputIncoming from '../components/FormInputIncoming';
import FormSelectIncoming from '../components/FormSelectIncoming';

const API_URL = "http://localhost:5000";

const EditLeadPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [dropdowns, setDropdowns] = useState([]);
    const [formData, setFormData] = useState({
        source: '',
        cmFirstName: '',
        cmLastName: '',
        cmphone: '',
        cmPhoneAlternateNumber: '',
        agent_name: '',
        language: '',
        disease: '',
        age: '',
        height: '',
        weight: '',
        state: '',
        city: '',
        remark: '',
        comment: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchDropdownsAndPrevData = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/editLeadItem/${id}`);
                setDropdowns(data.dropdowns);
                setFormData(formatPrevData(data.prevData));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDropdownsAndPrevData();
    }, [id]);

    const formatPrevData = (prevData) => ({
        source: prevData.source?.value || '',
        cmFirstName: prevData.CM_First_Name || '',
        cmLastName: prevData.CM_Last_Name || '',
        cmphone: prevData.CM_Phone || '',
        cmPhoneAlternateNumber: prevData.alternate_Phone || '',
        agent_name: prevData.agent_name?.value || '',
        language: prevData.language?.value || '',
        disease: prevData.disease?.value || '',
        age: prevData.age || '',
        height: prevData.height || '',
        weight: prevData.weight || '',
        state: prevData.state?.value || '',
        city: prevData.city || '',
        remark: prevData.remark?.value || '',
        comment: prevData.comment || ''
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'number' ? (value === '' ? '' : Number(value)) : value;
        setFormData(prev => ({ ...prev, [name]: newValue }));
    };

    const validate = () => {
        const newErrors = {};
        const requiredFields = ['source', 'cmFirstName', 'cmLastName', 'cmphone', 'agent_name', 'language', 'disease', 'age', 'height', 'weight', 'state', 'city', 'remark', 'comment'];
        const phoneRegex = /^\d{10}$/;

        requiredFields.forEach(field => {
            if (!formData[field]) newErrors[field] = "This field is required.";
        });

        if (formData.cmphone && !phoneRegex.test(formData.cmphone)) {
            newErrors.cmphone = "Enter a valid 10-digit Indian phone number.";
        }

        if (formData.cmPhoneAlternateNumber && !phoneRegex.test(formData.cmPhoneAlternateNumber)) {
            newErrors.cmPhoneAlternateNumber = "Enter a valid alternate 10-digit Indian phone number.";
        }

        ['age', 'height', 'weight'].forEach(field => {
            if (formData[field] && (!/^\d+$/.test(formData[field]) || Number(formData[field]) <= 0)) {
                newErrors[field] = `Enter a valid ${field}.`;
            }
        });

        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.post(`${API_URL}/editLeadItem`, { formData, id });
            navigate('/lead');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <button onClick={() => navigate('/lead')} className="flex items-center text-blue-500 hover:text-blue-700 mb-1">
                <FaArrowLeft className="mr-2" /> Back
            </button>

            <form className="max-w-4xl mx-auto p-6 bg-gray-800 shadow-lg rounded-lg text-white" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-semibold mb-6 text-center text-gray-100">Edit Lead Data</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <button type="submit" className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-lg">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default EditLeadPage