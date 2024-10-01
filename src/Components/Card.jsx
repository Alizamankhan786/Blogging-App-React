import React from 'react';

 export const Card = ({image , title , username , date , description , onButtonClick , editBtn , deleteBtn , button , onEditBtn , onDeleteBtn}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          <img
            src={image}
            alt="Author"
            className="rounded-full w-10 h-10"
          />
          <div className="ml-3">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-gray-600">{username}</p> •{" "}
            <span>
            {date}
            </span>
          </div>
        </div>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex justify-end space-x-2">
        <button onClick={onButtonClick} className="text-primary">{button}</button>
        <button onClick={onEditBtn} className="pl-6 text-primary">{editBtn}</button>
        <button onClick={onDeleteBtn} className="pl-6 text-primary">{deleteBtn}</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
