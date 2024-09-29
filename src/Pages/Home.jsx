import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/firebase/firebaseconfig';
import Card from '../Components/Card';

function Home() {

  const [homeData , setHomeData] = useState([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "userblogs"));
    querySnapshot.forEach((doc) => {
      homeData.push(doc.data());
      setHomeData([...homeData]);
      console.log(homeData);
    });
  };

  useEffect(() => {
    getData();
  } , [])


  return (
    <>
    <h1 className='text-center mt-4 font-bold'>Good Morning Readers!</h1>

    <h2 className='text-center mt-3 font-serif'>All Blogs</h2>

    <div className='mt-5'>
    {
      homeData ? homeData.map((item , index) => {
        return(
          <div className='mt-3' key={index}>
          <Card title={item.title} description={item.description} date={'August 17,2024'} username={'Muhammad Ali Zaman khan'} button1={'See All From This User'}/>
          </div>
        )
      }):<h1 className='text-5xl'>Loading...</h1>
    }
   </div>
    </>
  )
}

export default Home