import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'

function ViewResume() {

    const [resumeInfo, setResumeInfo]=useState()
    const {resumeId}=useParams();
    console.log(resumeInfo)

    useEffect(() => {
       GetResumeInfo();
    }, [])
    
    const GetResumeInfo=()=>{
        console.log('aashna')
        GlobalApi.GetResumeById(resumeId).then(resp=>{
            console.log(resp.data.data.attributes)
            setResumeInfo(resp.data.data.attributes)
        })
    }

    const handleDownload=()=>{
        window.print()
    }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
        <div id='non-printing-area'>
            <Header/>
        
            <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <h2 className='text-center text-2xl font-medium'>
                    Your AI Generate Resume is Ready
                </h2>
                <p className='text-center text-gray-600'>Now You Are Ready To Download Your Resume.<br/>Share Your Resume</p>
                
                <div className='flex justify-between px-44 my-10'>
                    <Button onClick={handleDownload}>Download</Button>
  
                <RWebShare
                    data={{
                    text: "Open URL To View My New Resume",
                    url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
                    title: resumeInfo?.firstName+" "+resumeInfo?.lastName,
                    }}
                    onClick={() => console.log("shared successfully!")}
                >
                    <Button>Share 🔗</Button>
                </RWebShare>
                    
                </div>
            </div>
        </div>
        <div id='printing-area'>
            <ResumePreview/>
        </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume