import React, { useContext, useEffect, useState } from 'react'
import { Snackbar, TextField } from '@mui/material'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TabTitle } from '../NewTab/GenerateTitle';
import SyncIcon from '@mui/icons-material/Sync';
import axios from 'axios'
import LinearProgress from '@mui/material/LinearProgress';

const Post = () => {
  TabTitle('Create Your Own BLOG')
  const history = useNavigate()
  const { token } = useContext(AuthContext)
  const [selects, setSelect] = useState([])
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("")
  const [category, setcategory] = useState("")
  const [createdby, setcreatedby] = useState("")
  const [thumbnail, setthumbnail] = useState("")
  const [description, setDescription] = useState("")
  const [opens, setOpens] = React.useState(false);
  const [Loading, setLoading] = useState(false)




  //image preview
  const [selectedImage, setSelectedImage] = useState()
  const [uploaded, setUploaded] = useState()

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
      setthumbnail(e.target.files[0])
    }
  }
  // const handleimage = (e) => {
  //   e.preventDefault();
  //   alert(URL.createObjectURL(selectedImage))
  // }

  const removeHandle = () => {
    setSelectedImage()
  }

  //word limit
  const limit = 1000;
  const [chaeCount, setChaeCount] = useState(0)
  const [isLimit, setisLimit] = useState(false)

  function onTextChange(e) {
    const count = e.target.value.length
    setChaeCount(count)
    setDescription(e.target.value)
  }

  useEffect(() => {
    setisLimit(chaeCount > limit)
  }, [chaeCount])

  useEffect(() => {
    fetch('https://mocki.io/v1/09181889-2141-4582-a039-582eca22404e')
      .then((res) => res.json())
      .then((data) => setSelect(data))
  }, [])

  useEffect(() => {
    if (url) {

      fetch("/api/auth/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          title,
          category,
          description,
          createdby,
          thumbnail: url
        })
      }).then(res => res.json())
        .then(data => {
          // console.log(data);
          if (data.error) {
            alert("Something went wrong")
          }
          else {
            setOpens(true)
            redirects()
          }
        }).catch(err => {
          console.log(err);
        })
    }

  }, [url])


  function redirects() {
    setTimeout(() => {
      history('/')
    }, 3000);
  }

  const postDetails = async () => {
    try {
      const data = new FormData()
      data.append("file", thumbnail)
      data.append("upload_preset", "fineblogs")
      data.append("cloud_name", "dbsc0ml5m")
      const res = await axios.post("https://api.cloudinary.com/v1_1/dbsc0ml5m/image/upload", data, {
        onUploadProgress: (data) => {
          setUploaded(Math.round((data.loaded / data.total) * 100));
        }
      })
      setUrl(res.data.url)

      // console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpens(false);
  };



  return (
    <div>
      <p className='mt-2 mx-2 text-2xl font-semibold'>Create Your Own BLOG</p>
      <div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="col-span-2 lg:mt-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5 mx-2">
              <div class="col-span-1 lg:col-span-2">
                <TextField label="Title" value={title} type="text" fullWidth onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div class="...">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="Category"
                      onChange={(e) => setcategory(e.target.value)}

                    >
                      {
                        selects.map((req) => {
                          return (
                            <MenuItem value={req.category}>{req.category}</MenuItem>
                          )
                        }
                        )
                      }

                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-2 mt-5">
              <div class="...">
                <TextField
                  type="text"
                  label="Created By"
                  value={createdby}
                  onChange={(e) => setcreatedby(e.target.value)}
                  fullWidth />
                <div>
                  <TextField type="file"
                    label="Upload Your Thumbnail"
                    fullWidth
                    focused
                    accept="image/*"
                    onChange={imageChange}
                    sx={{ mt: 4 }}
                    color="warning"
                  />
                </div>
              </div>
              <div class="col-span-1 lg:col-span-2">
                <TextField
                  id="standard-multiline-static"
                  label="Description"
                  multiline
                  rows={5}
                  value={description}
                  onChange={onTextChange}
                  fullWidth
                  defaultValue="What You Think "
                />
                <div className='flex justify-end'>
                  <p>
                    <span className={`${isLimit && 'text-red-500'}`}>
                      {`${chaeCount - isLimit}/${limit}`}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className='flex justify-center lg:justify-end'>
              {
                Loading ? <button className='bg-gradient-to-r from-cyan-500 to-amber-500 h-12 w-20 rounded-xl font-bold'>
                  <SyncIcon fontSize='large' className='animate-spin' />wait..
                </button> : <button onClick={() => postDetails()} className='bg-gradient-to-r from-cyan-500 to-amber-500 h-12 w-20 rounded-xl font-bold'>Done</button>
              }


            </div>


          </div>
          <div class="ml-4">
            <p className='font-light italic'>Image Size Must Be 1280 X 720</p>
            {selectedImage ? (
              <>
                <img src={URL.createObjectURL(selectedImage)}
                  alt="Something Went Wrong" className='mt-2 h-80 w-auto rounded-xl shadow-amber-400 shadow-lg'
                />
                <div className='flex justify-center mt-6'>
                  <button className='bg-purple-400 w-24 h-14 rounded-xl font-bold' onClick={removeHandle}>Remove</button>
                </div>
              </>
            ) : <img src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
              alt="Something Went Wrong" className='mt-5 h-80 w-auto rounded-xl shadow-amber-400 shadow-lg'
            />}

            <Snackbar
              open={opens}
              autoHideDuration={3000}
              onClose={handleClose}
              message="SuccessFully Post wait for 3 sec"
            />
            {
              uploaded && (
              <>
              <div className='flex justify-end mt-10 mb-3'>
              <p>{`${uploaded} %`}</p>
              </div>
              <LinearProgress variant="determinate" color='warning' value={uploaded} />
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Post