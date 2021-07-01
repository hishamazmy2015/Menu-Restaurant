import React from 'react';
import { Link } from 'react-router-dom';
export const Landing = () => {
  return (
    <section class='landing'>
      <div class='dark-overlay'>
        <div class='landing-inner'>
          {/* <h1 class='x-large'>Developer Connector</h1> */}
          <p class='lead'>
           You can reserve rooms in our Hotels  
          </p>
          <div class='buttons'>
            <Link to='register' href='register.html' class='btn btn-primary'>
              Register
            </Link>
            <Link to='login' href='login.html' class='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
