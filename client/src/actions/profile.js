import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { setAlerts } from './AlertAction';

import { GET_PROFILE, PROFILE_ERROR } from './types';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    console.log('object res', res); 

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    
  } catch (error) {
    console.log('error >>>>>> ', error);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
