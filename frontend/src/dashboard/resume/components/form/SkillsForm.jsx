import { Input } from '@/components/ui/input'
import React,{useContext, useState, useEffect} from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function SkillsForm({enableNext}) {

    const [skillsList, setSkillsList]=useState([{
        name:'',
        rating:0
    }])

   
    console.log(skillsList)

    const [loading, setLoading]=useState(false)
    const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext)
    const params=useParams();
    useEffect(() => {
        resumeInfo&&setSkillsList(resumeInfo?.skills)
        
      }, [])
      

    const handleChange=(index,name,value)=>{

        const newEntries=skillsList.slice();
        newEntries[index][name]=value;
        setSkillsList(newEntries)

    }

    const AddNewSkill=()=>{
        setSkillsList([...skillsList,{
            name:'',
            rating:0
        }])

    }
    const RemoveSkill=()=>{
        setSkillsList(skillsList=>skillsList.slice(0,-1))
        
    }
    const onSave=()=>{
        setLoading(true)
        
        const data={
            data:{
                skills:skillsList
            }
        }

        GlobalApi.UpdateResumeDetail(params.resumeId, data).then(resp=>{
            enableNext(true)
            console.log(resp);
            setLoading(false);
            toast('Details Updated')
        },(error)=>{
            
            setLoading(false);
            toast('Server Error, Please try again')
        })
        
    }

    useEffect(() => {
      setResumeInfo({
        ...resumeInfo,
        skills:skillsList
      })
    }, [skillsList])
    

  return (
    <div className='p-5 shadow-lg rounded-lg border  border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Skills</h2>
        <p>Add Your Top Professional Skills</p>

        <div>
            {skillsList.map((item,index)=>(
                <div className='flex justify-between border rounded-lg p-3 mb-2'>
                    <div>
                        <label className='text-xs'>Name</label>
                        <Input className="w-full" defaultValue={resumeInfo?.skills[index]?.name} onChange={(e)=>handleChange(index,'name',e.target.value)}/>
                    </div>
                    <Rating style={{maxWidth:120}} defaultValue={resumeInfo?.skills[index]?.rating}  value={item.rating} onChange={(v)=>handleChange(index,'rating',v )}/>
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant='outline' className='text-primary' onClick={AddNewSkill}> + Add More Skills</Button>
            <Button variant='outline' className='text-primary' onClick={RemoveSkill}> - Remove
            </Button>
            </div>
            
            <Button disabled={loading} onClick={()=>onSave()}>
                {loading?<LoaderCircle className='animate-spin' />:'Save'}
            </Button>
        </div>
        
        
    </div>
  ) 
}

export default SkillsForm