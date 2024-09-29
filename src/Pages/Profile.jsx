import React, { useState } from 'react';

const Profile = () => {


  const [profile, setProfile] = useState({
  name: "Muhammad Ali Zaman Khan",
  image: 'https://cdn.pixabay.com/photo/2023/12/11/12/51/lynx-8443540_1280.jpg',
  });
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState(profile.name);
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  });

  // Function to handle name change
  const handleNameChange = () => {
    setProfile({ ...profile, name: newName });
    setEditName(false);
  };

  // image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile({ ...profile, image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  //  password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.repeatPassword) {
      alert("New passwords do not match!");
      return;
    }
    
    alert("Password updated successfully!");
    setPasswords({ oldPassword: '', newPassword: '', repeatPassword: '' });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-bold mb-4">Profile</h1>
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={profile.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <label
              htmlFor="imageUpload"
              className="absolute bottom-0 right-0 p-1 bg-purple-600 text-white rounded-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 3.487a2.25 2.25 0 113.182 3.183l-9.193 9.193a4.5 4.5 0 01-2.181 1.185l-3.308.827.828-3.308a4.5 4.5 0 011.184-2.181l9.193-9.193z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25L15.75 4.5"
                />
              </svg>
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              required = ""
            />
          </div>
          <div className="flex items-center mt-4">
            {editName ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border-b-2 border-purple-600 outline-none"
                onBlur={handleNameChange}
                autoFocus
              />
            ) : (
              <>
                <h2 className="text-xl font-bold">{profile.name}</h2>
                <button
                  className="ml-2 text-purple-600"
                  onClick={() => setEditName(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 3.487a2.25 2.25 0 113.182 3.183l-9.193 9.193a4.5 4.5 0 01-2.181 1.185l-3.308.827.828-3.308a4.5 4.5 0 011.184-2.181l9.193-9.193z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25L15.75 4.5"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        <form className="mt-6" onSubmit={handlePasswordChange}>
          <label className="block text-sm font-medium text-gray-700">Old Password</label>
          <input
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Old password"
            value={passwords.oldPassword}
            onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
          />
          <label className="block mt-4 text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="New password"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          />
          <label className="block mt-4 text-sm font-medium text-gray-700">Repeat Password</label>
          <input
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Repeat password"
            value={passwords.repeatPassword}
            onChange={(e) => setPasswords({ ...passwords, repeatPassword: e.target.value })}
          />
          <button
            type="submit"
            className="w-full mt-6 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200"
          >
            Update password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
