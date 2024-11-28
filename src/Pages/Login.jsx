import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config/firebase/firebaseconfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Swal from 'sweetalert2'
import { loginUser } from '../config/firebase/firebasemethods'

const Login = () => {
  const email = useRef()
  const password = useRef()
  const navigate = useNavigate()

  const [loading, setloading] = useState(false)

  const loginUserFunc = async (event) => {
      setloading(true)
      event.preventDefault()
      console.log(email.current.value);
      console.log(password.current.value);

      try {
          const loginUserFromDatabase = await loginUser({
              email: email.current.value,
              password: password.current.value
          })
          Swal.fire({
              title: 'Success!',
              text: 'Your are Login Successfully',
              icon: 'success',
              confirmButtonText: 'Login',
              confirmButtonColor: '#234e94'
          })
              .then((result) => {
                  if (result.isConfirmed) {
                      navigate('/Dashboard')
                  }
              });
          console.log('user login ho giya', loginUserFromDatabase);
          setloading(false)
      } catch (error) {
          Swal.fire({
              title: error,
              text: 'Please check email & password!',
              icon: 'error',
              confirmButtonColor: '#de2323',
              confirmButtonText: 'Try Again',
          })
              .then((result) => {
                  if (result.isConfirmed) {
                      // navigate('/dashbord')
                  }
              });
          setloading(false)
      }
  };


  return (
    <>
    <div className="container">
  <h3>LOGIN</h3>
  <form onSubmit={loginUserFunc}>
    <input className='text-white' type="email" placeholder="Email" required=""  ref={email} />
    <input className='text-white' type="password" placeholder="Password" required=""  ref={password} />
        <br />
        <br />
    <button style={{
      backgroundColor: "purple",
      color: "white"
    }} className='btn' type="submit">Login</button>
  </form>
  <div className="login">
    Not A User Please Register First? <a href="/Register">Register</a>
  </div>
  </div>

  </>
  )
}

export default Login


// LOGIN COMPLETED