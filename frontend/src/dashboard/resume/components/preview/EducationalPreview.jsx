import React from 'react';

function EducationalPreview({ resumeInfo = {} }) {
  // Ensure resumeInfo has the expected structure
  const education = resumeInfo.education || [];
  const themeColor = resumeInfo.themeColor || '#000'; // Fallback color

  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2'
        style={{ color: themeColor }}> 
        Education
      </h2>
      <hr className='border-[1.5px] my-2'
        style={{ borderColor: themeColor }} />

      {education.length > 0 ? (
        education.map((edu, index) => (
          <div key={index} className='my-5'>
            <h2 style={{ color: themeColor }} className='text-sm font-bold'>{edu?.universityName}</h2>
            <h2 className='text-xs flex justify-between'>
              {edu?.degree} {edu?.major}
              <span>{edu.startDate} - {edu.endDate}</span>
            </h2>
            <p className='text-xs my-2'>{edu.description}</p>
          </div>
        ))
      ) : (
        <p>No education data available.</p>
      )}
    </div>
  );
}

export default EducationalPreview;
