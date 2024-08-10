import React,{useContext, useState} from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGridIcon } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'


function ThemeColor() {
    const colors=[
        "#FF5733", "#33FF57","#3357FF", "#FF33A1","#A133FF","33FFA1",
        "#FF7133", "#71FF33", "#7133FF", "#33FF71","#3371FF","#A1FF33",
        "#33A1FF","#FF3371","#FF5733","#5733FF","#33FF5A", "#5A33FF", 
        "#FF335A","#335AFF"
]
    const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext)
    const [selectedColor, setSelectedColor]=useState()
    const onColorSelect=(color)=>{
        setSelectedColor(color)
        setResumeInfo({
            ...resumeInfo,
            themeColor:color 
        })
        const id=useParams();

        const data={
            data:{
                themeColor:color
            }
        }
        GlobalApi.UpdateResumeDetail(id, data).then (resp=>{
            console.log(resp);
            toast('Theme Color Updated!')
        })

    }
  return (
    <Popover>
    <PopoverTrigger asChild>
    <Button className='flex gap-2' size='sm' variant='outline'><LayoutGridIcon />Theme</Button>
    </PopoverTrigger>
  <PopoverContent>
    <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
    <div className='grid grid-cols-5 gap-3'>
    {colors.map((item, index)=>(
    <div onClick={()=>onColorSelect(item)} style={{background:item}} className={`h-5 w-5 rounded-full cursor-pointer  border hover:border-black
    ${selectedColor==item&&'border border-black'}`}>

    </div>
  ))}</div></PopoverContent>
</Popover>

  )
}

export default ThemeColor