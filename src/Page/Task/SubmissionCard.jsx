import React from 'react'
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const SubmissionCard = () => {
  return (
    <div className='rounded-md bg-black p-5 flex-col items-center justify-between'>
        <div className='space-y-2'>
            <div className='flex items-center gap-2'>
                <span>GitHub : </span>
                <div className='flex items-center gap-2 text-[#c24dd0]'>
                    <OpenInNewIcon />
                    <a href='/' target='_blank'>Go To Link</a>
                </div>
            </div>
        </div>
        <div className='flex items-center gap-2 text-xs'>
            <p>Submission Time : </p>
            <p className='text-grey-400'>2024-01-18T22:15:39.51723</p>
        </div>
    </div>
  )
}

export default SubmissionCard