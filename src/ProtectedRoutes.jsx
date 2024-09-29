import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from './config/firebase/firebaseconfig';

const ProtectedRoutes = ({component}) => {

    let [isUser , setisUser] = useState(false);

    // use Navigate

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth , (user) => {
            if(user) {
                setisUser(true);

                return;
            } else{
                navigate("/login");
            }
        } , []);
    })





  return (
    <>
    {setisUser ? component : <h1>LOADING...</h1>}
    </>
  )
}

export default ProtectedRoutes