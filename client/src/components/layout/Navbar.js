import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/' href='index.html'>
          <i className='fas fa-code'></i> Hotels
        </Link>
      </h1>
      <ul>
        <li>
          {/* <a href='/'>Developers</a> */}
          <Link to='/room'>Reserve Room</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
};
