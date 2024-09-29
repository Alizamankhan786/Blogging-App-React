import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { auth, db } from '../config/firebase/firebaseconfig';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import Card from '../Components/Card';


const Dashboard = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [dataCard , setDataCard] = useState([]);
  const [load , setLoad] = useState(true);

  useEffect(() => {

    const renderCards = async () => {
      const q = query(collection(db, "userblogs"));
      const querySnapshot = await getDocs(q);
      const cards = [];
      querySnapshot.forEach((doc) => {
        cards.push(doc.data());
      });
      setDataCard(cards);
      setLoad(false);
    };
    renderCards();

  } , [])

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default" , {month: "long"});
  const currentYear = currentDate.getFullYear();
  const localDate = currentDate.getDate();
  
  const userBlogs = async (data) => {
    onAuthStateChanged(auth , (user) => {
      if (user){
        const uid = user.uid;
        const userImageAndName = async () => {
          const q = query(collection(db, "user"), where("uid", "==", uid));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const storeBlog = async () => {
            const docRef = await addDoc(collection(db , "userBlogs"),{
              userName: doc.data().userName,
              image: doc.data().profile,
              title: data.title,
              description: data.description,
              date: date,
            });
            console.log(docRef.id);
            const card = {
            userName: doc.data().userName,
            image: doc.data().profile,
            title: data.title,
            description: data.description,
            date: date,
            };
            setDataCard([...dataCard , card]);
            };
            storeBlog();
          });
        };
        userImageAndName();
      };
    });

  }

  
  return (
    <form onSubmit={handleSubmit(userBlogs)} >
    <div style={{
      marginTop: "-7%"
    }} className=" flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="mb-4">
          <input className="text-white w-full px-4 py-2 border-2 border-purple-300 rounded focus:outline-none focus:border-purple-500"
            type="text" {...register("title", { required: true })}
            placeholder="Title"/> <br />
            {errors.title && (
          <span className="text-red-600">Title is required</span>
        )}

        </div>
        <div className="mb-4">
          <textarea className="text-white w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-purple-500"
            rows="4"  {...register("description", { required: true })}
            placeholder="What is in your mind?" /> <br />
             {errors.description && (
          <span className="text-red-600">description is required</span>
        )}
        </div>
        <button type='submit' className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
          Publish blog
        </button>
      </div>
    </div>

    <h1 className='text-center font-bold'>My Blogs</h1>
    {load ? (
      <h2 className="text-center mt-3">Loading...</h2>
    ): dataCard.length > 0 ? (
      dataCard.map((item , index) => {
        return(
          <div key={index} className="mt-5">
              <Card
                title={item.title}
                description={item.description}
                image={item.image}
                username={item.userName}
              />
            </div>
        );
      })
    ):(
      <h1 className="text-center font-bold text-lg mt-9">No Blogs Publish</h1>
    )}
    </form>
  )
}

export default Dashboard