import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { auth, db } from '../config/firebase/firebaseconfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

function Navbar() {

  // NAVIGATE

  const navigate = useNavigate();
  
  const [isLoggedIn , setisLoggedIn] = useState(null);

  const [data , setData] = useState(null);


  const getData = async (user) => {
    const q = query(collection(db, "user"), where("uid", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

      const userProfile = doc.data().profile;

      setData(userProfile);

    });
  };

  {
    onAuthStateChanged(auth , (user) => {
      if(user){
        const uid = user.uid;
        setisLoggedIn(true);
        getData(user);

        return;
      };
    });
  };


  const loginButton = () => {
    navigate("/login")
  }


  const logoutButton = () => {
    signOut(auth)
    .then(() => {
      setisLoggedIn(false);
      alert("LogOut SuccessFuly");
    })
    .catch((error) => {
      alert(error);
    });
  };

  return (
    <>
    <div style={{
      backgroundColor: "purple"
    }} className="navbar">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white">
          Personal Blogging App
        </a>
      </div>

      <div className="flex-none">
        {isLoggedIn ? (
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={data}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <p className='text-white' onClick={logoutButton}>Logout</p>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button style={{
            backgroundColor: "purple"
          }} onClick={loginButton}>
            LOGIN
          </button>
        )}
      </div>
    </div>
  </>
);
}

export default Navbar