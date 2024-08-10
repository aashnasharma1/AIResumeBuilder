import { Brain,LoaderCircle } from 'lucide-react';
import React, { useState, useContext, useEffect } from 'react'
import { AIChatSession } from './../../../../service/AiModel';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { EditorProvider, Editor, Toolbar, BtnBold, BtnItalic, Separator, BtnBulletList, BtnNumberedList, BtnUnderline} from 'react-simple-wysiwyg';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

const PROMPT='I need to write the experience section in my resume. I"m an {positionTitle}. Kindly give me 4-5 points for the experience and the result should be in HTML format. don"t write position title or experience in the result'


function RichTextEditor({onRichTextEditorChange, index, defaultValue}) {
    const [value, setValue]=useState(defaultValue);
    const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext)
    const [loading, setLoading]=useState(false)
    
    const GenerateSummaryFromAI=async()=>{
        setLoading(true)
        console.log(resumeInfo?.experience[index]?.title)
        if(!resumeInfo?.experience[index]?.title){
            toast('Please Add Position Title');
            return ;
        }
        const prompt=PROMPT.replace('{positionTitle}', resumeInfo?.experience[index]?.title);
        const result=await AIChatSession.sendMessage(prompt);
        const resp= result.response.text();
        console.log(resp)
        setValue(resp.replace('[','').replace(']','')) 
        setLoading(false);
    }
    useEffect(() => {
        console.log('Updated value:', value);
    }, [value]);

  return (
    
    <div>
        <div className='flex justify-between my-2'>
        
        <label className='text-xs'>Summary</label>
        
        <Button className='flex gap-2 border-primary text-primary' variant='outline' 
        onClick={GenerateSummaryFromAI} size='sm'>
            {loading?
            <LoaderCircle className='animate-spin'/>:
            <>
            <Brain className='h-4 w-4'/>Generate From AI</>}</Button>
        
        </div>
        <EditorProvider>
        <Editor  value={value} onChange={(e)=>{
            console.log(setValue)
            setValue(e.target.value);
            onRichTextEditorChange(e)
        }}>
            <Toolbar>
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnNumberedList />
                <BtnBulletList />
                <Separator />
            </Toolbar>
        </Editor>
        </EditorProvider>
    </div>
  )
}

export default RichTextEditor