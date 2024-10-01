import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../config/firebase/firebaseconfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

function Navbar() {

  const navigate = useNavigate();
  const [isloggedIn, setisloggedIn] = useState(false);
  const [userData, setUserData] = useState(null);


  const getData = async (user) => {
    const q = query(collection(db, "user"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const profile = doc.data().profile;
      setUserData(profile);
    });
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setisloggedIn(true);
        getData(user);
      } else {
        setisloggedIn(false);
      }
    });


    return () => unsubscribe();
  }, []);

  // Login button functionality
  const loginButton = () => {
    navigate("/login");
  };

  
  const logoutBtn = () => {
    signOut(auth)
      .then(() => {
        setisloggedIn(false);
        alert("Logout successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
    <div style={{
      backgroundColor: "purple"
    }} className="navbar">
      <span className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-white">
          Personal Blogging App
        </Link>
      </span>

      <div className="flex-none">
        {isloggedIn ? (
          <nav className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User Profile" src={userData} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <p className='text-white' onClick={logoutBtn}>Logout</p>
                </li>
              </ul>
            </div>
          </nav>
        ) : (
          <button style={{
            backgroundColor: "purple",
            color: "white",
          }} className="btn" onClick={loginButton}>
            LOGIN
          </button>
        )}
      </div>
    </div>
  </>
);
}

export default Navbar