import React from 'react'
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, IconButton } from '@mui/material';
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from 'react-redux';
import { acceptDeclineSubmission } from '../../ReduxToolkit/SubmissionSlice';

const SubmissionCard = ({item}) => {

  const dispatch = useDispatch();
    const handleAcceptOrDecline = (status) =>{
      dispatch(acceptDeclineSubmission({id: item.id, status: status}))
        console.log(status);
    }
  return (
    <div className="rounded-md bg-black p-5 flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span>GitHub : </span>
          <div className="flex items-center gap-2 text-[#c24dd0]">
            <OpenInNewIcon />
            <a href={item.githubLink} target="_blank">
              Go To Link
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <p>Submission Time : </p>
          <p className="text-grey-400">{item.submissionTime}</p>
        </div>
      </div>
      <div>
        {item.status === "PENDING" ? (
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
            color={item.status === "ACCEPT" ? "success" : "error"}
          >
            {item.status === "ACCEPT" ? "Accept" : "Reject"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default SubmissionCard