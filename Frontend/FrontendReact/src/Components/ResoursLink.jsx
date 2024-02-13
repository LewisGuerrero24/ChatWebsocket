import React from "react";
import { Link } from 'react-router-dom';


const resoursLink = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={'Login'}>Login</Link>
        </li>
        <li>
            <Link to={'Register'}>Register</Link>
        </li>
        <li>
            <Link to={'temporallogin'}>Temporal Chat</Link>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default resoursLink;
