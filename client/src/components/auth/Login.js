import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { AddingAlert } from '../../actions/AlertAction3';
import { login } from '../../actions/auth';


function Login({ isAuthen, login }) {
  const [formDate, setFormDate] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formDate;

  const onChange = (e) => {
    setFormDate({ ...formDate, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    login(email, password);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    } catch (error) {
      console.log(error.response);
      AddingAlert('Login is False', 'danger');
    }
  };
  if (isAuthen) return <Redirect to='/dashboard' />;
  
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sing In Your Account
      </p>
      <form
        className='form'
        action='create-profile.html'
        onSubmit={(e) => onSubmit(e)}>

        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => onChange(e)}
            name='email'/>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Sing up to have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
}
Login.prototype = {
  login: PropTypes.func.isRequired,
  AddingAlert: PropTypes.func.isRequired,
  isAuthen: PropTypes.bool  ,
};

const mapStateToProps = (state) => ({
  isAuthen: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login, AddingAlert })(Login);
