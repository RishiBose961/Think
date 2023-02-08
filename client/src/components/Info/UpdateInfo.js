import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';


const UpdateInfo = () => {
    const { user, token, dispatch } = useContext(AuthContext)
    const [url, setUrl] = React.useState("");
    const [thumbnail, setthumbnail] = React.useState("")
    const history = useNavigate()
    const [selectedImage, setSelectedImage] = useState()

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0])
            setthumbnail(e.target.files[0])
        }
    }

    const removeHandle = () => {
        setSelectedImage()
    }
    function redirects() {
        setTimeout(() => {
            history('/personal')
        }, 1000);
    }

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
                    dispatch({ type: "GET_USER", payload: data.avatar });
                    // console.log(data);
                    if (data.error) {
                        alert('error')
                    }
                    else {
                        alert("Updated user avatar");
                        redirects()
                    }
                }).catch(err => {
                    console.log(err);
                })
        }

    }, [url])


    const postDetails = () => {
        if (thumbnail.size > 393377) {
            alert("Your File is too large")
        }
        else {
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
                    setUrl(data.url)
                    //   console.log(data);
                })
                .catch(err => {
                    console.log(err)
                })

        }

    }
    // console.log(thumbnail);


    return (

        <div>
            <hr className='pb-4 mt-3' />

            <div className='flex justify-center mb-3'>
                {selectedImage ? (
                    <>
                        <img src={URL.createObjectURL(selectedImage)}
                            alt="Something Went Wrong" className='h-48 mt-4 w-48 rounded-full ring-2 ring-black bg-slate-300'
                        />
                        <div className='flex justify-center mt-6'>
                            <button className='bg-purple-400 w-14 h-14 font-bold rounded-full' onClick={removeHandle}>
                                <CloseIcon color="error" fontSize="large" />
                            </button>
                        </div>
                    </>
                ) : <img src={user.avatar} alt="loading" className='h-48 mt-4 w-48 rounded-full ring-2 ring-black bg-slate-300' />}

            </div>
            <hr />

            <div className='flex justify-center mt-8 mb-12'>
                <div>
                    <input type="file" onChange={imageChange} className="block w-full text-sm text-slate-400
                  file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                file:text-sm file:font-semibold
               file:bg-amber-50 file:text-amber-400
               hover:file:bg-amber-100"/>
                </div>
                <button className='ring-4 ring-amber-400 w-32 rounded-lg font-serif hover:bg-red-400' onClick={() => postDetails()}>Upload</button>
            </div>
            <hr />
            <div>
                <p className='text-[30px] font-semibold'>Details Change</p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 mt-3 mx-2'>
                <div>
                    <p className='font-semibold mb-2'>Name</p>
                    <input type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3 ring-1 ring-amber-400'
                        defaultValue={user.username}
                    />
                </div>
                <div>
                    <p className='font-semibold mb-2'>Email</p>
                    <input type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3 ring-1 ring-amber-400'
                        defaultValue={user.email} disabled
                    />
                </div>
                <div>
                    <p className='font-semibold mb-2'>Company Name</p>
                    <input type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3 ring-1 ring-amber-400'
                        defaultValue={user.companyname} disabled
                    />
                </div>
                <div>
                    <p className='font-semibold mb-2'>Phone</p>
                    <input type="number" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3 ring-1 ring-amber-400'
                        defaultValue={user.companyname}
                    />
                </div>

            </div>
            <div className='flex justify-end mt-10'>
                <button className='ring-4 ring-amber-400 w-48 h-[29px] rounded-lg font-serif hover:bg-amber-300' onClick={() => postDetails()}>
                    Details Update
                </button>
            </div>

        </div>

    )
}

export default UpdateInfo