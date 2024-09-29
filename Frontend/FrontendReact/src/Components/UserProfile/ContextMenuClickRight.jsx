import React from "react";
import tokenUtils from '../../Hooks/utils';

const ContextMenuClickRight = ({ options, xPos, yPos, handleMenuAction }) => {
    return (
      <div className="absolute bg-white shadow-md rounded-md z-50" style={{ top: yPos, left: xPos }}>
        {options.map((option, index) => (
          <div
            key={index}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleMenuAction(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    );
  };
  

export default ContextMenuClickRight;