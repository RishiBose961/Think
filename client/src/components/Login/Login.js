import { TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'
import { isEmpty, isEmail } from '../helper/validate'
//google login
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import GoogleIcon from '@mui/icons-material/Google';

const initialState = {
  email: '',
  password: ''
}


const Login = () => {
  const [data, setData] = useState(initialState);
  const { email, password } = data;
  const { dispatch } = useContext(AuthContext)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const login = async (e) => {
    e.preventDefault()
    //check field
    if (isEmpty(email) || isEmpty(password))
      return alert("Please Fill in all fields")
    //check email
    if (!isEmail(email))
      return alert("Please Enter a Validate Email")

    try {
      await axios.post('/api/auth/login', { email, password })
      localStorage.setItem('_appSignging', true)
      dispatch({ type: 'SIGNING' })
      alert("Login Success")
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const clientId = process.env.REACT_APP_G_CLIENT_ID
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId })
    })
  }, [])


  const responseSuccessGoogle = async (res) => {

    const token = res?.tokenId;
    try {
      await axios.post("/api/auth/google_signing", { tokenId: token });
      // console.log(res);
      localStorage.setItem("_appSignging", true);
      dispatch({ type: "SIGNING" });
    } catch (err) {
      alert("successfully created");
    }
  };

  const responseErrorGoogle = () => {
    alert("there Was an error")
  }





  return (
    <div className=''  >
      <TextField label="Eamil" fullWidth type="text" name="email" onChange={handleChange} />
      <TextField label="Password" fullWidth type="password" sx={{ mt: 2 }} name="password" onChange={handleChange} />
      <div className='mt-4'>
        <button className='bg-red-400 mt-3 h-10 rounded-2xl uppercase font-bold w-full shadow-lg shadow-amber-300' onClick={login}>Login</button>
      </div>
      <p className='text-center uppercase mt-2 font-semibold'>——— or ———</p>
      <div className='text-center w-full'>
        <GoogleLogin
          clientId={clientId}
          render={renderProps => (
            <button  className='bg-slate-200 h-10 rounded-2xl font-bold w-full mt-2 shadow-lg shadow-orange-300' 
            onClick={renderProps.onClick} disabled={renderProps.disabled}><GoogleIcon/> Google</button>
          )}
          buttonText="Login"
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>


    </div>
  )
}

export default Login