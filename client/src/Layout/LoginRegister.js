import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Main from './Main';

export default function LoginRegister() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className='text-lg font-thin cursor-pointer' onClick={handleClickOpen}>
        Login
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={"lg"}
      >
        <DialogContent>
         <Main/>
        </DialogContent>
      </Dialog>
    </div>
  );
}