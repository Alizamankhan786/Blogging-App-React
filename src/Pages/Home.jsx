import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/firebase/firebaseconfig';
import Card from '../Components/Card';
import { json, useNavigate } from 'react-router-dom';

function Home() {

  const [homeCardData , setHomeCardData] = useState([]);

  const navigate = useNavigate();

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "userblogs"));
    querySnapshot.forEach((doc) => {
      homeData.push(doc.data());
      setHomeCardData([...homeCardData]);
      console.log(homeCardData);
    });
  };



  useEffect(() => {
    getData();
  } , [])


  const singleBlog = (index) => {
    console.log(index);
    console.log(homeCardData[index]);

    let storeSingleBlog = [];

    storeSingleBlog.push(homeCardData[index]);
    localStorage.setItem('userSingleBlog' , JSON.stringify(storeSingleBlogToLocalStore));
    navigate("/profile");
    
    

  }

  return (
    <>
    <h1 className='text-center mt-4 font-bold'>Good Morning Readers!</h1>

    <h2 className='text-center mt-3 font-serif'>All Blogs</h2>
    <div className="mt-5 px-4 md:px-8 lg:px-16">
        {homeCardData.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {homeCardData.map((item, index) => (
              <div className="mt-3" key={index}>
                <Card
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  username={item.userName}
                  image={item.image}
                  onButtonClick={() => singleBlog(index)}
                  button={"All From This User"}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center my-10">
            <span className="loading loading-spinner text-warning loading-lg"></span>
          </div>
        )}
      </div>
    </>
  )
}

export default Home