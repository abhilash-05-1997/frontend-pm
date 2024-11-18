import React, { useState } from 'react';
import InputField from '../../../utility/InputField';

const ApplyLeave = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
        email: "", // Ensure email is included in the state
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        // Add submission logic here
        onClose(); // Close modal after submission
    };

    const handleCancel = () => {
        setFormData({ leaveType: "", startDate: "", endDate: "", reason: "", email: "" }); // Reset all fields
        onClose(); // Close modal on cancel
    };


    if (!isOpen) return null; // Do not render if not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-3xl p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl lg:text-4xl font-bold text-blue-700 text-center mb-8">
                    Apply Leave
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Leave Type Dropdown */}
                        <div className="col-span-1 sm:col-span-2">
                            <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700">
                                Leave Type
                            </label>
                            <select
                                id="leaveType"
                                name="leaveType"
                                value={formData.leaveType}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="" disabled>
                                    Select leave type
                                </option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Earned Leave">Earned Leave</option>
                            </select>
                        </div>

                        {/* Input Fields */}
                        <InputField
                            label="Start Date"
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="End Date"
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="Team Email ID"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <InputField
                        label="Reason for Leave"
                        type="textarea"
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="Enter your reason for leave..."
                        rows="4"
                        required
                    />

                    {/* Buttons */}
                    <div className ="flex justify-between items-center space-x-4">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="w-full sm:w-auto px-6 py-3 text-blue-600 bg-white border border-blue-600 rounded-lg shadow hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyLeave; 

