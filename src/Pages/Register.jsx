import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { auth, storage } from '../config/firebase/firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytes } from 'firebase/storage';

function Register() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate();


  const UserProfileStorageRef = ref(storage, "profile");

   const RegisterUserToFirebase = (data) => {
    console.log(data);

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;

        
        const profile = data.userProfile[0];          

        const userAdded =  () => {

          console.log(data);
           
          uploadBytes(UserProfileStorageRef, profile)
          .then((snapshot) => {
            console.log("Blog Uploaded");
          })
          .catch((err) => {
            console.log('File upload error ===>' , err);
            
          })
           
        };
        userAdded();
    
      })
      .catch((error) => {
        const errorMessage = error.message;

        alert(errorMessage)
      });
  };


  return (
    <>
    <div className="container">
  <h3>REGISTER</h3>
  <form onSubmit={handleSubmit(RegisterUserToFirebase)}>
    <input className='text-white' type="text" placeholder="First Name" required="" {...register("firstName", { required: true })} />
    {errors.firstName && (
    <span className="text-red-600">FirstName is required</span>
    )}
    <input className='text-white' type="text" placeholder="Last Name" required="" {...register("lastName", { required: true })} />
    {errors.lastName && (
    <span className="text-red-600">LastName is required</span>
    )}
    <input className='text-white' type="email" placeholder="Email" required="" {...register("email", { required: true })} />
    {errors.email && (
    <span className="text-red-600">Email is required</span>
    )}
    <input className='text-white' type="password" placeholder="Password" required="" {...register("password", { required: true })} />
    {errors.password && (
    <span className="text-red-600">Password is required</span>
    )}
    <input className='text-white' type="password" placeholder="Repeat Password" required="" {...register("repeat password", { required: true })} />
    {errors.password && (
    <span className="text-red-600">Repeat Password is required</span>
    )}
    <br />
    <br />
    <button style={{
      backgroundColor: "purple",
      color: "white"
    }} className='btn' type="submit">Signup</button>
  </form>
  <div className="login">
    Already have an account? <a href="/login">Login</a>
  </div>
</div>

   </>
  )
}

export default Register