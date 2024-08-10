import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { toast } from "sonner"


function PersonalDetailForm({ enableNext }) {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        enableNext(false);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setResumeInfo({
            ...resumeInfo,
            [name]: value
        });
    };

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {
                data: formData
            };
            const response = await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
            console.log(response);
            enableNext(true);
            toast("Detail Updated")

        } catch (error) {
            console.error("Error updating resume details:", error);
            enableNext(true);
        } finally {
            setLoading(false);
        }
    };

    

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Personal Detail</h2>
            <p>Get Started With The Basic Information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input name="firstName" defaultValue={resumeInfo?.firstName} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input name="lastName" defaultValue={resumeInfo?.lastName} onChange={handleInputChange} required />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input name="jobTitle"  defaultValue={resumeInfo?.jobTitle} onChange={handleInputChange} required />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input name="address" defaultValue={resumeInfo?.address} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input name="phone" defaultValue={resumeInfo?.phone} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label className='text-sm'>Email</label>
                        <Input name="email" defaultValue={resumeInfo?.email} onChange={handleInputChange} required />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button type='submit' disabled={loading}>{loading ? <LoaderCircle className='animate-spin' /> : 'Save'}</Button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetailForm;
