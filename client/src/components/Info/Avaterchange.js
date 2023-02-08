import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AuthContext } from '../../context/AuthContext';



export default function Avaterchange({ user }) {
  const { token, dispatch } = React.useContext(AuthContext)
  const [open, setOpen] = React.useState(false);
  const [thumbnail, setthumbnail] = React.useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   console.log(user);

  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    if (url) {
      fetch("/api/auth/user_avatar", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          avatar: url
        })
      }).then(res => res.json())
        .then(data => {
          // dispatch({ type: "GET_USER", payload: data.avatar });
          console.log(data);
          if (data.error) {
            alert('error')
          }
          else {
            alert("Created Posted");
          }
        }).catch(err => {
          console.log(err);
        })
    }

  }, [url])


  const postDetails = () => {
    const data = new FormData()
    data.append("file", thumbnail)
    data.append("upload_preset", "fineblogs")
    data.append("cloud_name", "dbsc0ml5m")
    fetch("https://api.cloudinary.com/v1_1/dbsc0ml5m/image/upload", {
      method: "post",
      body: data
    })
      .then(resp => resp.json())
      .then(data => {
        // setUrl(data.url)
        console.log(data);
      })
      .catch(err => {
        console.log(err)
      })

  }

  // React.useEffect(() => {

  //   if (thumbnail) {
  //     const data = new FormData()
  //     data.append("file", thumbnail)
  //     data.append("upload_preset", "fineblogs")
  //     data.append("cloud_name", "dbsc0ml5m")
  //     fetch("  https://api.cloudinary.com/v1_1/dbsc0ml5m/image/upload", {
  //       method: "post",
  //       body: data
  //     })
  //       .then(resp => resp.json())
  //       .then(data => {
  //         fetch("/api/auth/user_avatar", {
  //           method: "put",
  //           headers: {
  //             "Content-Type": "application/json",
  //             "Authorization": token
  //           },
  //           body: JSON.stringify({
  //             avatar: data.url
  //           })
  //         }).then(res => res.json())
  //           .then(result => {
  //             // console.log(result);
  //             dispatch({ type: "GET_USER", payload: result.avatar });
  //           })
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   }
  // }, [thumbnail])




  const uploadPhoto = (file) => {
    setthumbnail(file)
  }

  const uploadImage = (e) => {
    uploadPhoto(e.target.files[0])
  }




  return (
    <div>

      <img src={user.avatar} alt='loading failed' onClick={handleClickOpen} className='h-48 mt-4 w-48 rounded-full bg-slate-300' />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className='flex justify-center'>
            <img src={user.avatar} alt='loading' className='h-48 w-48 rounded-full bg-slate-300' />
          </div>
          <p className='text-center text-[15px] italic text-slate-500'>500X500 pixcel</p>

        </DialogTitle>
        <DialogContent>
          <div className='flex justify-center'>
            <form className="flex items-center space-x-6">
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                {/* <ImageUploader
                  type="file"
                  onChange={(e) => setthumbnail(e.target.files[0])}
                /> */}
                <input type="file" onChange={(e) => setthumbnail(e.target.files[0])} className="block w-full text-sm text-slate-400
                  file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                file:text-sm file:font-semibold
               file:bg-amber-50 file:text-amber-400
               hover:file:bg-amber-100"/>

               <button onClick={() => postDetails()}>Done</button>
              </label>
            </form>
          </div>

        </DialogContent>
      </Dialog>
    </div>
  );
}