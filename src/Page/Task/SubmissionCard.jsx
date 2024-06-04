import React from 'react'
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, IconButton } from '@mui/material';
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const SubmissionCard = () => {

    const handleAcceptOrDecline = (status) =>{
        console.log(status);
    }
  return (
    <div className="rounded-md bg-black p-5 flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span>GitHub : </span>
          <div className="flex items-center gap-2 text-[#c24dd0]">
            <OpenInNewIcon />
            <a href="/" target="_blank">
              Go To Link
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <p>Submission Time : </p>
          <p className="text-grey-400">2024-01-18T22:15:39.51723</p>
        </div>
      </div>
      <div>
        {true ? (
          <div className="flex gap-5">
            <div className="text-green-500">
              <IconButton
                color="success"
                onClick={() => handleAcceptOrDecline("ACCEPTED")}
              >
                <CheckIcon />
              </IconButton>
            </div>
            <div className="text-red-500">
              <IconButton
                color="error"
                onClick={() => handleAcceptOrDecline("DECLINED")}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        ) : (
          <Button
            size="small"
            variant="outlined"
            color={true ? "success" : "error"}
          >
            Accept
          </Button>
        )}
      </div>
    </div>
  );
}

export default SubmissionCard