import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';


export default function OpenaiModel({ result,results}) {

    // console.log(result);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // console.log(results);

    return (
        <div>
            <button onClick={handleClickOpen}
                className='bg-gradient-to-r from-cyan-500 to-amber-500 h-12 w-20 rounded-xl font-bold'>View</button>
            <Dialog
                maxWidth={"xs"}
                fullWidth={"xs"}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <div className='flex justify-between'>
                        <p>Title</p>
                        <CloseIcon className='hover:bg-red-400 rounded-full' onClick={handleClose} />
                    </div>
                </DialogTitle>
                <DialogContent>
                    {result.length > 0 ? <img src={result}
                        alt='loading' className='h-96' loading='lazy' /> : <>
                        <div className='flex justify-center'>
                            <CircularProgress />
                        </div>
                    </>}


                    <div className='flex justify-between mt-3'>
                        <p>Category</p>
                        <p>Createdby</p>
                    </div>
                    <p>Description:</p>
                    <p>{results}</p>

                </DialogContent>
            </Dialog>
        </div>
    );
}