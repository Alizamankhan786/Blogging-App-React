import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { auth, storage } from '../config/firebase/firebaseconfig';
import { signUpUser, uploadImage } from '../config/firebase/firebasemethods'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { CircularProgress } from '@mui/material';
import Swal from 'sweetalert2'


const Register = () => {
  const fullName = useRef()
  const email = useRef()
  const password = useRef()
  const myFile = useRef()

  const [loading, setloading] = useState(false)

  // for navigation
  const navigate = useNavigate()

  const registerUser = async (event) => {
    event.preventDefault()
    setloading(true)
    try {
      // image to url converter
      const userProfileUrl = await uploadImage(myFile.current.files[0], email.current.value)
      console.log(userProfileUrl);

      const registerUserData = await signUpUser({
        fullname: fullName.current.value,
        email: email.current.value,
        password: password.current.value,
        userProfile: userProfileUrl
      })

      Swal.fire({
        title: 'Success!',
        text: 'Your are Register Successfully',
        icon: 'success',
        confirmButtonColor: '#234e94',
        confirmButtonText: 'Login'
      })
        .then((result) => {
          if (result.isConfirmed) {
            navigate('/login')
          }
        });
      console.log('user register successfully', registerUserData);
      setloading(false)
    } catch (error) {
      setloading(false)
      Swal.fire({
        title: error,
        text: 'Use Another Email',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#de2323',
      })
        .then((result) => {
          if (result.isConfirmed) {
            // navigate('/login')
          }
        });
    }

  }

  return (
    <div className="container">
  <h3>REGISTER</h3>
  <form onSubmit={registerUser}>
    <input className='text-white' type="text" placeholder="Full Name" required="" ref={fullName}/>
    <input className='text-white' type="email" placeholder="Email" required="" ref={email} />
    <input className='text-white' type="password" placeholder="Password" required="" ref={password} />
    <input
      type="file"
      ref={myFile}
      placeholder="file"
      required=""
      className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
    <br />
    <br />
    <div id="loadingDiv" className="mt-4">
              <div className="text-center">
                <button
                  id="registorBtn"
                  className="bg-purple text-white py-2 px-6 rounded-lg hover:bg-purple"
                >
                  {loading ? <CircularProgress color='purple' className='mt-1' size="20px" /> : "Register"}
                </button>
                <br />
                <br />
              </div>
            </div>
            <Link to='/login' className="text-center text-purple hover:underline mt-4">
              ALREADY A USER? PLEASE LOGIN
            </Link>
          </form>
        </div>
  )
}
          


export default Register;


// REGISTER COMPLETED