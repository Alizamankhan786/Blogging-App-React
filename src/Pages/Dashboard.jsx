import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { auth, db } from '../config/firebase/firebaseconfig';
import { addDoc, collection, getDocs, query, where , deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Card from '../Components/Card';
import Alert from '../Components/Alert';

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const currentDate = new Date();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();

  const blogDate = `${month} , ${date}, ${year}`;

  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const q = query(collection(db, "userblogs"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        const newData = querySnapshot.docs.map((doc) => ({...doc.data() , id: doc.id}));
        setCardData(newData);
      }
    });
  }, []);

  const userBlog = (data) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        const getUserImageName = async () => {
          const q = query(collection(db, "user"), where("uid", "==", uid));

         

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const setUserBlogInFirestore = async () => {
              const docRef = await addDoc(collection(db, "userblogs"), {
                title: data.title,
                description: data.description,
                image: doc.data().profile,
                userName: doc.data().userName,
                date: blogDate,
                uid: uid,
                
              });
              console.log("Document written with ID: ", docRef.id);

              <Alert />

            };

            setUserBlogInFirestore();

            const getData = async () => {
              const q = query(
                collection(db, "userblogs"),
                where("uid", "==", uid)
              );

              const querySnapshot = await getDocs(q);
              const newData = querySnapshot.docs.map((doc) => doc.data());
              setCardData(newData);
              console.log(cardData);
            };

            getData();
          });
        };

        getUserImageName();
      }
    });
  };


  const deleteBtn = async (index) => {
    console.log('delete button clicked!', index);
    console.log(cardData[index]);

    const deleteData = async() => {
      await deleteDoc(doc(db, "userblogs", cardData[index].id ));
    }

    deleteData();
  };

  return (
    <form onSubmit={handleSubmit(userBlog)}>
      <div
        style={{
          marginTop: "-7%",
        }}
        className="flex justify-center items-center min-h-screen bg-gray-100"
      >
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <div className="mb-4">
            <input
              className="text-white w-full px-4 py-2 border-2 border-purple-300 rounded focus:outline-none focus:border-purple-500"
              type="text"
              {...register("title", { required: true })}
              placeholder="Title"
            />
            <br />
            {errors.title && (
              <span className="text-red-600">Title is required</span>
            )}
          </div>
          <div className="mb-4">
            <textarea
              className="text-white w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-purple-500"
              rows="4"
              {...register("description", { required: true })}
              placeholder="What is in your mind?"
            />
            <br />
            {errors.description && (
              <span className="text-red-600">Description is required</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
          >
            Publish blog
          </button>
        </div>
      </div>

      <h1 className="text-center font-bold">My Blogs</h1>
      {cardData.length !== 0 ? (
        cardData.map((item, index) => (
          <div key={index} className="mt-5">
            <Card
              title={item.title}
              description={item.description}
              image={item.image}
              username={item.userName}
              date={item.date}
              editBtn={"Edit"}
              deleteBtn={"Delete"}


              onDeleteBtn={() => deleteBtn(index)}
              onEditBtn={() => editBtn(index)}
            />
          </div>
        ))
      ) : (
        <div className="text-center m-[20vh]">
          <span className="loading loading-spinner text-warning loading-lg"></span>
        </div>
      )}
    </form>
  );
};

export default Dashboard;
