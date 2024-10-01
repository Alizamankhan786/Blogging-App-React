import { onAuthStateChanged } from "firebase/auth"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../config/firebase/firebaseconfig"
import { getData } from "../config/firebase/firebasemethods"
import Post from "../Components/Post";


const Dashbord = () => {

  let navigate = useNavigate()

  let titleRef = useRef()
  let articleRef = useRef()

  const [blogs, setBlogs] = useState([])
  const [SingalUserData, setSingalUserData] = useState([])

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

  const sendDataFromFireStore = async (event) => {
    event.preventDefault()
    if (titleRef.current.value === '' || articleRef.current.value === '') {
      alert('please check it!')
    } else {
      console.log(titleRef.current.value);
      console.log(articleRef.current.value);
      blogs.push({
        title: titleRef.current.value.toUpperCase(),
        article: articleRef.current.value.toUpperCase(),
        uid: auth.currentUser.uid
      })
      setBlogs([...blogs])
      const sendBlogs = await sendData({
        title: titleRef.current.value.toUpperCase(),
        article: articleRef.current.value.toUpperCase(),
        uid: auth.currentUser.uid
      }, "blogs")

      console.log(sendBlogs);
      titleRef.current.value = ''
      articleRef.current.value = ''
    }
  }
  



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
    
          <h1 className="text-center font-bold">My Blogs</h1>
          <div className='mt-4 flex flex-col flex-wrap gap-3'>
             {blogs.length > 0 ? blogs.map((item, index) => (
               <Post user={SingalUserData} key={index} blogs={item} />
             )) : <div className="text-center my-10">
             <span className="loading loading-spinner text-warning loading-lg"></span>
           </div>}
        </div>

        </form>
  )
}

export default Dashbord;
