import React from "react";

const ElectionCard = ({ imgSrc, title, members, onClick  }) => {
  return (
    <div onClick={() => onClick(title)} className="cursor-pointer ...">
    <div className="relative group bg-gray-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
      <img
        className="w-20 h-20 object-cover object-center rounded-full"
        src={imgSrc}
        alt={title}
      />
      <h4 className="text-white text-2xl font-bold capitalize text-center">
        {title}
      </h4>
      <p className="text-white/50">{members} members</p>
    </div>
    </div>
  );
};

export default ElectionCard;
