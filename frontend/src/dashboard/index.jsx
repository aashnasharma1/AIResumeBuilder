import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import GlobalApi from './../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {

    const user = useUser();
    const [resumeList, setResumeList]=useState([]);

    useEffect(() => {
        if (user?.user?.primaryEmailAddress?.emailAddress) {
            GetResumesList();
        }
    }, [user]);

    const GetResumesList = () => {
        const email = user?.user?.primaryEmailAddress?.emailAddress;
        if (email) {
            GlobalApi.GetUserResumes(email)
                .then(resp => {
                    setResumeList(resp.data.data);
                })
                .catch(error => {
                    console.error('Error fetching resumes:', error);
                });
        } else {
            console.warn('No email address found for the user.');
        }
    };  

    return (
        <div className='p-10 md:px-20 lg:px-32'>
            <h2 className='font-bold text-3xl'>My Resume</h2>
            <p>Start Creating AI Resume</p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-24'>
              <AddResume />
              {resumeList.length>0&&resumeList.map((resume,index)=>(
                <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList}/>
              ))}
            </div>
        </div>
    );
}

export default Dashboard;
