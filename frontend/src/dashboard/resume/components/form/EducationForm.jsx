import { Textarea } from '@/components/ui/textarea'
import React,{useContext, useState, useEffect} from 'react'
import { Input } from '@/components/ui/input'
import { LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
 

function EducationForm({enableNext}) {

    const [loading, setLoading]=useState(false)
    const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext)
    const params=useParams();
    const [educationalList, setEducationalList]=useState([
        {
            universityName:'',
            startDate:'',
            endDate:'',
            degree:'',
            major:'',
            description:''
        }
    ])

    useEffect(() => {
      resumeInfo&&setEducationalList(resumeInfo?.education)
      console.log(resumeInfo?.education)
    
      
    }, [])
    

    const handleChange=(event, index)=>{
        enableNext(false)
        const newEntries=educationalList.slice();
        const {name, value}= event.target;
        newEntries[index][name]=value;
        setEducationalList(newEntries);

    }

    const AddNewEducation=()=>{
        setEducationalList([...educationalList,{
            universityName:'',
            startDate:'',
            endDate:'',
            degree:'r',
            major:'',
            description:''
    }])

    }
    const RemoveEducation=()=>{
        setEducationalList(educationalList=>educationalList.slice(0,-1))
        
    }
    const onSave=()=>{
        
        setLoading(true)
        const data={
            data:{
                education:educationalList
            }
        }

        GlobalApi.UpdateResumeDetail(params.resumeId, data).then(resp=>{
            
            console.log(resp);
            setLoading(true)
        const data={
            data:{
                education:educationalList
            }
        }

        GlobalApi.UpdateResumeDetail(params.resumeId, data).then(resp=>{
            console.log(resp);
            setLoading(false);
            toast('Details Updated')
            enableNext(true)
        },(error)=>{
            setLoading(false);
            toast('Server Error, Please try again')    
           
        }) 
    })
        
    }

    useEffect(() => {
      setResumeInfo({
        ...resumeInfo,
        education:educationalList
      })
    }, [educationalList])
    console.log(educationalList)
    

  return (
    <div className='p-5 shadow-lg rounded-lg border  border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Education</h2>
        <p>Add Your Education Details</p>
        <div>
            {educationalList.map((item, index)=>(
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg border-t-primary border-t-4 mt-10'>
                        <div className='col-span-2'>
                            <label>University Name</label>
                            <Input name='universityName' defaultValue={educationalList[index]?.universityName}   onChange={(e)=>handleChange(e,index)}/>
                        </div>
                        <div>
                            <label>Degree</label>
                            <Input name='degree' defaultValue={educationalList[index]?.degree} onChange={(e)=>handleChange(e,index)}/>
                        </div>
                        <div>
                            <label>Major</label>
                            <Input name='major' defaultValue={educationalList[index]?.major}onChange={(e)=>handleChange(e,index)}/>
                        </div>
                        <div>
                            <label>Start Date</label>
                            <Input name='startDate' defaultValue={educationalList[index]?.startDate} type='date' onChange={(e)=>handleChange(e,index)}/>
                        </div>
                        <div>
                            <label>End Date</label>
                            <Input name='endDate' defaultValue={educationalList[index]?.endDate} type='date'onChange={(e)=>handleChange(e,index)}/>
                        </div>
                        <div className='col-span-2'>
                            <label>Description</label>
                            <Textarea name='description'defaultValue={educationalList[index]?.description} onChange={(e)=>handleChange(e,index)}/>
                        </div>  
                    </div>
                    
                    
                    
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
                <Button variant='outline' className='text-primary' onClick={AddNewEducation}> + Add  Education</Button>
                <Button variant='outline' className='text-primary' onClick={RemoveEducation}> - Remove
                </Button>
            </div>
                            
            <Button disabled={loading} onClick={()=>onSave()}>
                {loading?<LoaderCircle className='animate-spin' />:'Save'}
            </Button>
        </div>
        
    </div>
  )
}

export default EducationForm