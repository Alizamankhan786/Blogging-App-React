import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { auth, storage } from '../config/firebase/firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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
        
        const UserProfileStorageRef = ref(storage, data.userProfile[0].name);

        const userAdded =  () => {

          console.log(data);
           
          uploadBytes(UserProfileStorageRef, profile)
            .then((snapshot) => {
              console.log("Uploaded a blob or file!");

              getDownloadURL(UserProfileStorageRef)
                .then((url) => {
                  console.log("URL ==>", url);

                  const setDataInFirebase = async () => {
                    const docRef = await addDoc(collection(db, "user"), {
                      userName: data.username,
                      email: data.email,
                      uid: user.uid,
                      profile: url,
                    });
                    console.log("Document written with ID: ", docRef.id);
                  };

                  setDataInFirebase();
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((err) => {
              console.log("File upload error ===>", err);
            });
        };
        UserAddedtoFirestore();

        alert("You have sucessfully Registered!");

        navigate("/");
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