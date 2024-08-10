import { Input } from '@/components/ui/input';
import React, {useState, useEffect, useContext} from 'react'
import { Button } from '@/components/ui/button';
import RichTextEditor from '../RichTextEditor';
import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

const formField={
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummary:''
}
function ExperienceForm({enableNext}) {

    const [loading, setLoading]=useState(false)
    const params=useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const [experienceList, setExperienceList]=useState([
        
        formField
    
]);
  

    const handleChange=(index,event)=>{
        const newEntries=experienceList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
        setExperienceList(newEntries)

        setResumeInfo({
            ...resumeInfo,
            experience:newEntries
        });

        console.log(resumeInfo)
    }


    const AddNewExperience=()=>{
        setExperienceList([...experienceList,{
            title:'',
            companyName:'',
            city:'',
            state:'',
            startDate:'',
            endDate:'',
            workSummary:'',
        }])
    }
    const RemoveExperience=()=>{
        setExperienceList(experienceList=>experienceList.slice(0,-1))
    }

    const handleRichTextEditor=(e, name, index)=>{
        const newEntries=experienceList.slice();
        newEntries[index][name]=e.target.value;
        setExperienceList(newEntries);

        setResumeInfo({
            ...resumeInfo,
            experience:newEntries
        });

        console.log(resumeInfo)
    }

    useEffect(() => {
      resumeInfo&&setExperienceList(resumeInfo?.experience)
      
    }, [resumeInfo])

    const onSave=()=>{
        
        setLoading(true)
        const data={
            data:{
                experience:experienceList
            }
        }
        console.log(data)

        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp=>{
            console.log(resp);
            enableNext(true)
            setLoading(false);
            toast('Details Updated')
        },(error)=>{
            
            setLoading(false);
            toast('Server Error, Please try again')
        })
    }
    

  return (
    <div>
        <div className='p-5 shadow-lg  rounded-lg border border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your Previous Job Experience</p>
        <div>
            {experienceList.map((item,index)=>(
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label className='text-xs'>Position Title</label>
                            <Input name='title' defaultValue={resumeInfo?.experience[index]?.title} onChange={(event)=>handleChange(index,event)} />
                        </div>
                        <div>
                            <label className='text-xs'>Company Name</label>
                            <Input name='companyName'  defaultValue={resumeInfo?.experience[index]?.companyName} onChange={(event)=>handleChange(index,event)} />
                        </div>
                        <div>
                            <label className='text-xs'>City</label>
                            <Input name='city'  defaultValue={resumeInfo?.experience[index]?.city}  onChange={(event)=>handleChange(index,event)} />
                        </div>
                        <div>
                            <label className='text-xs'>State</label>
                            <Input name='state' defaultValue={resumeInfo?.experience[index]?.state} onChange={(event)=>handleChange(index,event)} />
                        </div>
                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input type='date'  defaultValue={resumeInfo?.experience[index]?.startDate} name='startDate' onChange={(event)=>handleChange(index,event)} />
                        </div>
                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input type='date'  defaultValue={resumeInfo?.experience[index]?.endDate} name='endDate' onChange={(event)=>handleChange(index,event)} />
                        </div>
                        <div className='col-span-2'>
                            <RichTextEditor  
                            index={index}
                            defaultValue={resumeInfo?.experience[index]?.workSummary} 
                            onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummary', index)}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant='outline' className='text-primary' onClick={AddNewExperience}> + Add More Experience</Button>
            <Button variant='outline' className='text-primary' onClick={RemoveExperience}> - Remove
            </Button>
            </div>
            
            <Button disabled={loading} onClick={()=>onSave()}>
                {loading?<LoaderCircle className='animate-spin' />:'Save'}
            </Button>
        </div>
        </div>
    </div>
  )
  }


export default ExperienceForm