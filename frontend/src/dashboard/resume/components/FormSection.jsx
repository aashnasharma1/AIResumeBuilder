import React, { useState } from 'react'
import PersonalDetailForm from './form/PersonalDetailForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, HomeIcon, LayoutGridIcon } from 'lucide-react'
import SummaryForm from './form/SummaryForm';
import ExperienceForm from './form/ExperienceForm';
import EducationForm from './form/EducationForm';
import SkillsForm from './form/SkillsForm';
import { Navigate } from 'react-router-dom';
import Home from '@/home';
import { Link, useParams } from 'react-router-dom';
import ViewResume from '@/my-resume/[resumeId]/view';
import ThemeColor from './ThemeColor';




function FormSection() {
  const {resumeId}=useParams();
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext]=useState(false);
  const handleClick=()=>{
    setActiveFormIndex(activeFormIndex + 1)
    setEnableNext(false)
  }
  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex gap-5'>
          <Link to='/dashboard'>
            <Button><HomeIcon/></Button>
          </Link>
          <ThemeColor/>
        </div>
        <div className='flex items-center justify-between gap-2'>

          {activeFormIndex > 1 && 
          <Button size='sm' className='flex gap-2' 
          onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
            <ArrowLeft/>Prev
          </Button>}

          <Button className='flex gap-2' size='sm' disabled={!enableNext}
          onClick={handleClick} >
            Next<ArrowRight />
          </Button>

        </div>
      </div>
      {activeFormIndex==1? <PersonalDetailForm enableNext={(v)=>setEnableNext(v)} />: 
      activeFormIndex==2? <SummaryForm enableNext={setEnableNext} />: 
      activeFormIndex==3? <ExperienceForm enableNext={(v)=>setEnableNext(v)} />: 
      activeFormIndex==4? <EducationForm enableNext={(v)=>setEnableNext(v)} />: 
      activeFormIndex==5? <SkillsForm enableNext={(v)=>setEnableNext(v)} />: 
      activeFormIndex==6?  <Navigate to={`/my-resume/${resumeId}/view`} />:<SkillsForm/>}


    </div>
  )
}  

export default FormSection