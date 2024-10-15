import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';

const API_URL = "http://localhost:5000";

const EditPendingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [dropdowns, setDropdowns] = useState([]);
    const [formData, setFormData] = useState({
        payment_type: '',
        sale_type: '',
        agent_name: '',
        email: '',
        status: '',
        comment: '',
        shipment_type: '',
        address: '',
        post_type: '',
        post: '',
        subDistrict_Taluka: '',
        City_District: '',
        pincode: '',
        state: '',
        disease: '',
        amount: '',
        products: '',
        quantity: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchDropdownsAndPrevData = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/editPendingData/${id}`);
                console.log(data)
                setDropdowns(data.dropdowns);
                const formattedData = formatPrevData(data.prevData);
                setFormData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDropdownsAndPrevData();
    }, [id]);

    const formatPrevData = (prevData) => {
        return {
            payment_type: prevData.payment_type?.value || '',
            sale_type: prevData.sale_type?.value || '',
            agent_name: prevData.agent_name?.value || '',
            alternate_Phone: prevData.alternate_Phone || '',
            email: prevData.email || '',
            status: prevData.status?.value || '',
            comment: prevData.comment || '',
            shipment_type: prevData.shipment_type?.value || '',
            address: prevData.address || '',
            post_type: prevData.post_type?.value || '',
            post: prevData.post || '',
            subDistrict_Taluka: prevData.subDistrict_Taluka || '',
            City_District: prevData.City_District || '',
            pincode: prevData.pincode || '',
            state: prevData.state?.value || '',
            disease: prevData.disease?.value || '',
            amount: prevData.amount?.value || '',
            products: prevData.products?.value || '',
            quantity: prevData.quantity || '',
        };
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        console.log(name, value, type)
        const newValue = type === 'number' ? (value === '' ? '' : Number(value)) : value;
        setFormData(prev => ({ ...prev, [name]: newValue }));
    };

    const validate = () => {
        const newErrors = {};
        const requiredFields = ['payment_type', 'sale_type', 'agent_name', 'email', 'status', 'shipment_type', 'address', 'City_District', 'pincode', 'state', 'disease', 'amount', 'products', 'quantity'];

        requiredFields.forEach(field => {
            if (!formData[field]) newErrors[field] = "This field is required.";
        });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = "Enter a valid 6-digit pincode.";
        }

        if (formData.quantity && (!/^\d+$/.test(formData.quantity) || Number(formData.quantity) <= 0)) {
            newErrors.quantity = "Enter a valid quantity.";
        }

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
            console.log(formData)

            await axios.post(`${API_URL}/editPendingItem`, { formData, id });
            navigate('/pending');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const selectFields = [
        { name: 'payment_type', label: 'Payment Type' },
        { name: 'sale_type', label: 'Sale Type' },
        { name: 'agent_name', label: 'Agent Name' },
        { name: 'status', label: 'Status' },
        { name: 'shipment_type', label: 'Shipment Type' },
        { name: 'post_type', label: 'Post Type' },
        { name: 'state', label: 'State' },
        { name: 'disease', label: 'Disease' },
        { name: 'amount', label: 'Amount' },
        { name: 'products', label: 'Products' }
    ];
    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <button onClick={() => navigate('/pending')} className="flex items-center text-blue-500 hover:text-blue-700 mb-1">
                <FaArrowLeft className="mr-2" /> Back
            </button>

            <form className="max-w-4xl mx-auto p-6 bg-gray-800 shadow-lg rounded-lg text-white" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-semibold mb-6 text-center text-gray-100">Edit Pending Data</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectFields.map(({ name, label }) => (
                        dropdowns[label.toLowerCase()] && (
                            <FormSelect
                                key={name}
                                label={label}
                                name={name}
                                dropdown={dropdowns[label.toLowerCase()]}
                                value={formData[name]}
                                onChange={handleChange}
                                error={errors[name]}
                            />
                        )
                    ))}

                    <FormInput
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <FormInput
                        label="Comment"
                        type="text"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        error={errors.comment}
                    />
                    <FormInput
                        label="Address"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        error={errors.address}
                    />
                    <FormInput
                        label="Post"
                        type="text"
                        name="post"
                        value={formData.post}
                        onChange={handleChange}
                        error={errors.post}
                    />
                    <FormInput
                        label="Sub-District/Taluka"
                        type="text"
                        name="subDistrict_Taluka"
                        value={formData.subDistrict_Taluka}
                        onChange={handleChange}
                        error={errors.subDistrict_Taluka}
                    />
                    <FormInput
                        label="City/District"
                        type="text"
                        name="City_District"
                        value={formData.City_District}
                        onChange={handleChange}
                        error={errors.City_District}
                    />
                    <FormInput
                        label="Pincode"
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        error={errors.pincode}
                    />
                    <FormInput
                        label="Quantity"
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        error={errors.quantity}
                    />
                </div>

                <button type="submit" className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditPendingPage;