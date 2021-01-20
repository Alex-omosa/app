import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CreateIcon from '@material-ui/icons/Create';

import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function NewProjectDialog({ onOk }) {
  let [projectName, setProjectName] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleInput(e) {
    setProjectName((projectName = e.target.value));
  }
  function handleOk() {
    onOk(projectName);
    handleClose();
  }

  function handleCancel() {
    handleClose();
  }
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        startIcon={<CreateIcon />}
      >
        New
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Create a new project'}
        </DialogTitle>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Project Name"
          type="text"
          fullWidth
          onChange={handleInput}
        />
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
