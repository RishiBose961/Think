import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ShareIcon from '@mui/icons-material/Share';
import ShareLink from '../HDivider/ShareLink';
import CloseIcon from '@mui/icons-material/Close';

export default function ShareModel({ linku, description }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <button className='hover:bg-slate-300 w-full' onClick={handleClickOpen}>
                <ShareIcon color='info' />Share
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth={'xs'}
            >
                <DialogTitle id="alert-dialog-title">
                    <p>Share With Community</p>
                </DialogTitle>
                <hr/>
                <DialogContent>
                    <ShareLink linku={linku} description={description} />

                </DialogContent>
                <DialogActions>
                    <CloseIcon className='bg-red-400 cursor-pointer rounded-full' onClick={handleClose}/>
                </DialogActions>
            </Dialog>
        </>
    );
}