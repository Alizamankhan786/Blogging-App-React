import { Typography } from '@mui/material';
import { Button } from 'bootstrap';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebase/firebasemethods'
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2'


const Profile = () => {
  const [SingalUserData, setSingalUserData] = useState([])

  useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
          if (user) {
              try {
                  const q = query(collection(db, "users"), where("id", "==", user.uid));
                  const querySnapshot = await getDocs(q);
                  querySnapshot.forEach((doc) => {
                      console.log(doc.data());
                      setSingalUserData(doc.data())
                  });
                  console.log(user);

              } catch (error) {
                  console.log(error);
              }
          } else {
              console.log('user logout ho giya ha');
          }
      })
  }, [])

  const updatePasswordVal = useRef()
  // const currentPasswordVal = useRef()

  function updatePasswordFunc(event) {
      event.preventDefault()
      if (updatePasswordVal.current.value === '') {
          alert('please enter password')
      } else {
          const auth = getAuth();
          const user = auth.currentUser;
          const newPassword = updatePasswordVal.current.value;

          updatePassword(user, newPassword)
              .then(() => {
                  Swal.fire({
                      title: 'Success!',
                      text: 'Password Changed Successfully',
                      icon: 'success',
                      confirmButtonText: 'Changed',
                      confirmButtonColor: '#234e94'
                  })
                      .then((result) => {
                          if (result.isConfirmed) {
                              // navigate('/dashbord')
                          }
                      });
              }).catch((error) => {
                  alert(error)
              });

      }
      updatePasswordVal.current.value = ''
      // currentPasswordVal.current.value = ''
  }


  return (
    <>

<section className="text-gray-600 body-font container mx-auto p-2">
                <Typography variant='h4' fontWeight='bold' className='p-2 text-black'>Your Profile</Typography>
                <hr />
                <div
                    className="container mx-auto flex px-5 py-14 items-center justify-center flex-col"
                    bis_skin_checked={1}
                >
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        {SingalUserData.fullname}
                    </h1>
                    <img
                        className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
                        alt="hero"
                        src={SingalUserData.userProfile}
                    />
                    <div className="text-center container lg:w-2/3 w-full" bis_skin_checked={1}>

                        <div className='flex justify-center'>
                            <form onSubmit={updatePasswordFunc} className='flex flex-col gap-3'>
                            <input
                            ref={updatePasswordVal}
                            type="text"
                            placeholder="Enter New Password"
                            required
                            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-[350px] text-white bg-gray-800"/>

                                <button style={{
                                  borderRadius: "30px",
                                }} type='submit' variant='contained' color='primary'>Update Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )

};

export default Profile;
