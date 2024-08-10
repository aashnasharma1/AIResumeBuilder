import React,{useState} from 'react'
import { Loader2Icon, MoreVertical, Notebook } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'



function ResumeCardItem({resume,refreshData}) {

  const navigation=useNavigate();
  const [openAlert, setOpenAlert]=useState(false)
  const [loading, setLoading]=useState(false)
  const onDelete=()=>{
    setLoading(true)
    GlobalApi.DeleteResumeById(resume.id).then(resp=>{
      console.log(resp);
      toast('Resume Deleted!');
      refreshData();
      setLoading(false)
      setOpenAlert(false)
      
    },(error)=>{
      setLoading(false)
    })
  }
  
  return (
    <div>
    <Link to ={'/dashboard/resume/'+resume.id+'/edit'}>
        <div className='p-14 py-24
        items-center flex justify-center 
        bg-secondary rounded-lg 
        h-[280px] w-[220px] hover:scale-105 transition-all hover:shadow-md 
        cursor-pointer border border-primary '>
            <Notebook />
        </div>
        
        </Link>
        <div className='border  border-primary  p-3 w-[220px] flex justify-between' >
        <h2 className='text-center my-1'>{resume.attributes.title}</h2>
        
        <DropdownMenu>
        <DropdownMenuTrigger><MoreVertical className='h-4 w-4 cursor-pointer'/></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.id+'/view')}>View</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.id+'/view')}>Download</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>navigation('/dashboard/resume/'+resume.id+'/edit')}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>setOpenAlert(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={openAlert}>
        
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={loading}>
              {loading?<Loader2Icon className='animate-spin'/>: 'Delete'}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


        </div>
    </div>   
        
    
  )
}

export default ResumeCardItem

//line:15- title not in center.