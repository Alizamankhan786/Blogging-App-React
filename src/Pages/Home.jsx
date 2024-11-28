import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/firebase/firebaseconfig';
import Card from '../Components/Card';
import { json, useNavigate } from 'react-router-dom';
import { Button, CircularProgress, Typography } from '@mui/material';

function Home() {

  const [allBlogs, setallBlogs] = useState([])

  useEffect(() => {
    async function getAllBlogs() {
      let getAllDataFromDb = await getAllData("blogs")
      setallBlogs(getAllDataFromDb)
    }
    getAllBlogs()
    console.log(allBlogs);
  }, [])

  const [like, setlike] = useState(null)

  function likeFunc() {
    alert('this function is comming soon')
  }


  return (
    <>
    <h1 className='text-center mt-4 font-bold'>Good Morning Readers!</h1>
    <section className='container mx-auto p-2'>
        <Typography variant='h3' fontWeight='bold' className='p-2'>All Blogs</Typography>
        <hr />
        <div>
          {allBlogs.length > 0 ? <h1>{allBlogs.map((item, index) => (
            <div key={index} className='flex flex-col mt-3'>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex items-center p-4">
                  <img
                    src=''
                    alt=""
                    className="w-14 h-14 rounded-full border-2 border-gray-300 mr-4 object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{item.title}</h2>

                    <p className="text-gray-500 text-sm">Time: {item.currentDate} </p>

                  </div>
                </div>
                <p className="text-gray-600 p-4 mb-4">{item.article}</p>
                <div className="flex justify-between items-center p-4 border-t">
                  <Button variant='contained' onClick={() => likeFunc(1 + like)} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
                    Like
                  </Button>
                  <span className="text-gray-500">Likes: 0</span>
                </div>
              </div>
            </div>
          ))}</h1> : <div className='text-center mt-[150px]'>
            <p><CircularProgress /></p>
          </div>}
        </div>
      </section>
    </>
  )
}

export default Home