import axios from 'axios';
// import AddingAlert from '../../actions/AlertAction3'
import PropTypes from 'prop-types'; 
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { register } from '../../actions/auth';
import { AddingAlert } from '../../actions/AlertAction3';

function Register({ AddingAlert, register }) {
  const [formDate, setFormDate] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formDate;

  const onChange = (e) => {
    setFormDate({ ...formDate, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      AddingAlert('!!!Password is not matching ', 'danger');
    } else console.log('object data', formDate);

    const newUser = {
      name,
      email,
      password,
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(newUser);
      const res = await axios.post('localhost:5004/api/users', body, config);
      console.log('outpur of axios request ', res);
    } catch (error) {
    console.log("<<<<< error object 48 inside Register >>>>> ",error)
    register({ name, email, password });
    }
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form
        className='form'
        action='create-profile.html'
        onSubmit={(e) => onSubmit(e)}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => onChange(e)}
            name='email'
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link href='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
}

Register.prototype = {
  Alertss: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default connect(null, { AddingAlert, register })(Register);
