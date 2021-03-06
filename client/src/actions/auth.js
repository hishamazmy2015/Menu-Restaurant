import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOAD_USER,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from './types';
import axios from 'axios';
import { setAlerts } from './AlertAction';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post('/api/users', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.err;

      if (errors) {
        errors.forEach((element) => {
          dispatch(setAlerts(element.msg, 'danger'));
        });
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//login
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.err;

    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlerts(element.msg, 'danger'));
      });
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
