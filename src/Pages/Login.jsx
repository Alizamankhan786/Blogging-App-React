import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config/firebase/firebaseconfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  // NAVIGATE

  const navigate = useNavigate();

  const LoginUserFromFirebase = (data) => {

    // login user from firebase

    signInWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    

    const getData = async () => {
      const q = query(collection(db, "user"), where("uid", "==", user.uid));
      
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
  navigate('/')
});

  };

  getData();

  })
  .catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage)
  });

  };


  return (
    <>
    <div className="container">
  <h3>LOGIN</h3>
  <form onSubmit={handleSubmit(LoginUserFromFirebase)}>
    <input className='text-white' type="email" placeholder="Email" required="" {...register("email", { required: true })} />
    {errors.email && (
          <span className="text-red-600">Email is required</span>
        )}
    <input className='text-white' type="password" placeholder="Password" required="" {...register("password", { required: true })} />
    {errors.password && (
          <span className="text-red-600">Password is required</span>
        )}
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