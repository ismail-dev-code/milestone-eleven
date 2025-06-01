import React from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddJob = () => {
    const { user } = useAuth();

    const handleAddAJob = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Prepare job data
        const { min, max, currency, requirements, responsibilities, ...rest } = data;

        const newJob = {
            ...rest,
            salaryRange: { min, max, currency },
            requirements: requirements.split(',').map(req => req.trim()),
            responsibilities: responsibilities.split(',').map(res => res.trim()),
            status: 'active',
        };

        try {
            const res = await axios.post('https://career-linker-server-hub.vercel.app/jobs', newJob);
            if (res.data.insertedId) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'This new Job has been saved and published.',
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset(); // reset form on success
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to save the job. Please try again.',
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Add a New Job</h2>
            <form onSubmit={handleAddAJob} className="space-y-6">

                {/* Basic Info */}
                <fieldset className="fieldset">
                    <legend className="text-lg font-bold mb-2">Basic Info</legend>
                    <div className="grid gap-4">
                        <input type="text" name="title" className="input" placeholder="Job Title" required />
                        <input type="text" name="company" className="input" placeholder="Company Name" required />
                        <input type="text" name="location" className="input" placeholder="Company Location" required />
                        <input type="text" name="company_logo" className="input" placeholder="Company Logo URL" />
                    </div>
                </fieldset>

                {/* Job Type */}
                <fieldset className="fieldset">
                    <legend className="text-lg font-bold mb-2">Job Type</legend>
                    <div className="flex gap-2">
                        <label><input type="radio" name="jobType" value="On-Site" /> On-Site</label>
                        <label><input type="radio" name="jobType" value="Remote" /> Remote</label>
                        <label><input type="radio" name="jobType" value="Hybrid" /> Hybrid</label>
                    </div>
                </fieldset>

                {/* Job Category */}
                <fieldset className="fieldset">
                    <legend className="text-lg font-bold mb-2">Category</legend>
                    <select name="category" defaultValue="" className="select" required>
                        <option value="" disabled>Choose a Category</option>
                        <option>Engineering</option>
                        <option>Marketing</option>
                        <option>Finance</option>
                    </select>
                </fieldset>

                {/* Deadline */}
                <fieldset className="fieldset">
                    <legend className="text-lg font-bold mb-2">Application Deadline</legend>
                    <input type="date" name="deadline" className="input" required />
                </fieldset>

                {/* Salary Range */}
                <fieldset className="fieldset">
                    <legend className="text-lg font-bold mb-2">Salary Range</legend>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <input type="number" name="min" className="input" placeholder="Minimum Salary" required />
                        <input type="number" name="max" className="input" placeholder="Maximum Salary" required />
                        <select name="currency" defaultValue="" className="select" required>
                            <option value="" disabled>Select Currency</option>
                            <option>BDT</option>
                            <option>USD</option>
                            <option>EU</option>
                        </select>
                    </div>
                </fieldset>

                {/* Description */}
                <fieldset className="fieldset">
                    <legend className="text-lg font-bold mb-2">Job Description</legend>
                    <textarea name="description" className="textarea" placeholder="Job Description" required />
                </fieldset>

                {/* Requirements */}
                <fieldset className="fieldset">
                    <legend className="text-lg font-bold mb-2">Requirements</legend>
                    <textarea name="requirements" className="textarea" placeholder="Enter requirements separated by commas" required />
                </fieldset>

                {/* Responsibilities */}
                <fieldset className="fieldset">
                    <legend className="text-lg font-bold mb-2">Responsibilities</legend>
                    <textarea name="responsibilities" className="textarea" placeholder="Enter responsibilities separated by commas" required />
                </fieldset>

                {/* HR Info */}
                <fieldset className="fieldset">
                    <legend className="text-lg font-bold mb-2">HR Information</legend>
                    <input type="text" name="hr_name" className="input" placeholder="HR Name" required />
                    <input type="email" name="hr_email" defaultValue={user?.email} className="input" placeholder="HR Email" required />
                </fieldset>

                <button type="submit" className="btn btn-primary w-full">Add Job</button>
            </form>
        </div>
    );
};

export default AddJob;
