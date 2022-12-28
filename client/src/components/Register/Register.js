import { Avatar, TextField } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { isEmail, isEmpty, isLength, isMatch } from '../helper/validate';


const initialState = {
  username: '',
  email: '',
  avatar: '',
  companyname: '',
  password: '',
  cf_password: ''
}


const Register = () => {

  const [imgUrl, setimgUrl] = useState("")

  const [inputVal, setinputVal] = useState("")

  const [data, setData] = React.useState(initialState)
  const { username, email, avatar, companyname, password, cf_password } = data

  const handleChange = (e) => {
    setData({ ...data, avatar: imgUrl, [e.target.name]: e.target.value });
    setimgUrl(`https://api.multiavatar.com/${username}.png`)
    return e.target.value
  }

  console.log(imgUrl);

  const register = async (e) => {
    e.preventDefault()
    //check field
    if (isEmpty(email) || isEmpty(password))
      return alert("Please Fill in all fields")
    //check email
    if (!isEmail(email))
      return alert("Please Enter a Valid Email Address")
    //check password
    if (isLength(password))
      return alert("Password Must be a at least 6 character")
    //check match
    if (!isMatch(password, cf_password))
      return alert("Password did not match")
    try {
      const res = await axios.post("/api/auth/register", {
        username, email, avatar, companyname, password, cf_password
      })
      alert(res.data.message)

    } catch (error) {
      alert(error.response.data.message)
    }
  }


  const handleChanges = (e) => {
    setinputVal(() => {
      setimgUrl(`https://api.multiavatar.com/${e.target.value}.png`)
      return e.target.value

    })
    // console.log(inputVal);
  }

  return (
    <div>
      <div class="flex justify-center mb-2">
        <Avatar alt={inputVal} sx={{ width: 56, height: 56 }} src={imgUrl} />
      </div>
      <TextField
        onChange={handleChange}
        label="Name"
        fullWidth
        type="text"
        name='username' />
      <TextField
        label="Eamil"
        fullWidth
        type="text"
        name='email'
        onChange={handleChange}
        sx={{ mt: 2 }} />
      <TextField
        label="Company Name"
        fullWidth
        name='companyname'
        onChange={handleChange}
        type="text"
        sx={{ mt: 2 }} />
      <TextField
        label="Password"
        fullWidth
        name='password'
        onChange={handleChange}
        type="password" sx={{ mt: 2 }} />
      <TextField
        label="Confirm Password"
        name='cf_password'
        onChange={handleChange}
        fullWidth
        type="password"
        sx={{ mt: 2 }} />
      <div className='flex justify-end mt-4'>
        <button onClick={register} className='bg-red-500 hover:bg-lime-500 w-32 h-10 rounded-2xl uppercase font-bold'>Register</button>
      </div>
    </div>
  )
}

export default Register