import React, { useState } from 'react'

const Post = ({ blogs, user}) => {
    const { title, article } = blogs
    console.log(user);
    const { email, fullname, userProfile , image } = user
    return (
        <>
             <div className="bg-white shadow-lg rounded-lg overflow-hidden ">
                <div className="flex items-center p-4">
                    <img
                        src={image}
                        alt=""
                        className="w-14 h-14 rounded-full border-2 border-gray-300 mr-4 object-cover"
                    />
                    <div>
                        <h2 className="text-xl font-semibold">{title}</h2>

                        <p className="text-black text-sm">Posted by: {email}</p>

                    </div>
                </div>
                <p className="text-black p-4 mb-4">{article}</p>
                <button style={{
                    marginLeft: "20px",
                    backgroundColor: "purple",
                    marginTop: "-10%"
                }} className=" text-white font-semibold py-2 px-4 rounded">Edit</button>
      <button style={{
        marginLeft: "20px",
        backgroundColor: "purple"
      }} className="text-white font-semibold py-2 px-4 rounded">
        Delete
      </button>         
        </div> 
        </>
    )
}

export default Post;