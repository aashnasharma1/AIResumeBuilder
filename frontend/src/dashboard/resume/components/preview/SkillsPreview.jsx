import React from 'react';

function SkillsPreview({ resumeInfo = {} }) {
  
  const skills = resumeInfo.skills || [];
  const themeColor = resumeInfo.themeColor || '#000'; // Fallback color

  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2'
        style={{ color: themeColor }}>
        Skills
      </h2>
      <hr className='border-[1.5px] my-2'
        style={{ borderColor: themeColor }} />

      {skills.length > 0 ? (
        <div className='grid grid-cols-2 my-4 gap-3'>
          {skills.map((skill, index) => (
            <div key={index} className='mb-2 flex items-center justify-between'>
              <h2 className='text-xs' defaultValue={resumeInfo?.skills[index]?.name}>{skill.name}</h2>
              <div className='h-2 bg-gray-200 w-[120px]'>
                <div className='h-2' defaultValue={resumeInfo?.skills[index]?.rating}
                  style={{
                    backgroundColor: resumeInfo?.themeColor, 
                    width: skill?.rating*20+'%'
                  }}>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No skills data available.</p>
      )}
    </div>
  );
}

export default SkillsPreview;
