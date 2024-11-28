import { onAuthStateChanged } from "firebase/auth"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../config/firebase/firebaseconfig"
import { getData } from "../config/firebase/firebasemethods"
import Post from "../Components/Post";
import Swal from 'sweetalert2'
import { Typography } from "@mui/material"



const Dashbord = () => {
  // check user status user loggedin or not
  let navigate = useNavigate()

  // here is input state...
  let titleRef = useRef()
  let articleRef = useRef()

  const [blogs, setBlogs] = useState([])
  const [SingalUserData, setSingalUserData] = useState([])
  const [loading, setloading] = useState(false)
  const generateData = new Date()
  console.log(generateData.toDateString())



  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user.uid)
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          setSingalUserData(doc.data())
        });
        const blogsData = await getData("blogs", user.uid)
        console.log(blogsData)
        setBlogs([...blogsData])
      }
    })
  }, [])

  // send data firestore
  const sendDataFromFireStore = async (event) => {
    setloading(true)
    event.preventDefault()
    if (titleRef.current.value === '' || articleRef.current.value === '') {
      alert('please check it!')
      setloading(false)
    } else {
      console.log(titleRef.current.value);
      console.log(articleRef.current.value);
      blogs.push({
        title: titleRef.current.value.toUpperCase(),
        article: articleRef.current.value.toUpperCase(),
        uid: auth.currentUser.uid,
        currentDate: generateData.toDateString()
      })
      setBlogs([...blogs])
      const sendBlogs = await sendData({
        title: titleRef.current.value.toUpperCase(),
        article: articleRef.current.value.toUpperCase(),
        uid: auth.currentUser.uid,
        currentDate: generateData.toDateString()
      }, "blogs")
      Swal.fire({
        title: 'Success!',
        text: 'Blog Post Successfully',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#234e94'
      })
        .then((result) => {
          if (result.isConfirmed) {
            navigate('/dashbord')
          }
        });
      setloading(false)

      console.log(sendBlogs);
      titleRef.current.value = ''
      articleRef.current.value = ''
    }
  };


  return (
    <form>
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
                ref={titleRef}
                  className="text-white w-full px-4 py-2 border-2 border-purple-300 rounded focus:outline-none focus:border-purple-500"
                  type="text"
                  placeholder="Title"
                />
                <br />
              </div>
              <div className="mb-4">
                <textarea
                ref={articleRef} 
                className="text-white w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-purple-500"
                rows="4"
                  placeholder="What is in your mind?"
                />
                <br />
              </div>
              <button
              onClick={sendDataFromFireStore}
                type="submit"
                className="w-full bg-purple text-white py-2 rounded"
              >
                Publish blog
              </button>
            </div>
          </div>
    
          <div className='mt-4'>
          <Typography variant='h4' className='mt-4'>
            Your Blogs.
          </Typography>
          <div className='mt-4 flex flex-col flex-wrap gap-3'>
            {blogs.length > 0 ? blogs.map((item, index) => (
              <Post index={index} user={SingalUserData} key={index} blogs={item} />
            )) : <h1>No Blogs Found...</h1>}
          </div>
        </div>

        </form>
  )
}

export default Dashbord;
