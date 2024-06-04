import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SubmissionCard from "../Task/SubmissionCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const submissions=[1, 1, 1];

export default function SubmissionList({ handleClose, open }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            {submissions.length > 0 ? (
              <SubmissionCard />
            ) : (
              <div className="">
                <div className="text-center">No Submission Found</div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
