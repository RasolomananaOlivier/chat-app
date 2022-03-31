import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

export function RemoveAccountDialog({ open, handleClose }) {
  const navigate = useNavigate();
  /* Handler for user logout */
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            p: 2,
          }}
        >
          You are about to delete your account
        </DialogTitle>
        {/*  <DialogContent>
              <DialogContentText id="alert-dialog-description"></DialogContentText>
            </DialogContent> */}
        <DialogActions
          sx={{
            p: 2,
          }}
        >
          <Button onClick={handleLogout}> I am sure </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundImage: "linear-gradient(60deg,#ed1845, #22a6df)",
            }}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function AlertDialog({ open, handleClose }) {
  const navigate = useNavigate();
  /* Handler for user logout */
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            p: 2,
          }}
        >
          Do really want to log out ?
        </DialogTitle>
        {/*  <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent> */}
        <DialogActions
          sx={{
            p: 2,
          }}
        >
          <Button onClick={handleLogout}>Yes, of course </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundImage: "linear-gradient(60deg,#ed1845, #22a6df)",
            }}
            autoFocus
          >
            No, I don't think
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
