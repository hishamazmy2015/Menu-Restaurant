import axios from 'axios';
import { setAlerts } from './AlertAction';
import { FAIL_ROOM_DATA, LOAD_ROOM_DATA } from './types';

export const getCurrentRoomData = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': 'c5f67862202f4577ab36a72ad04b38ca',
    },
  };
  try {
    const res = await axios.get(
      'https://dh-dev-apim.azure-api.net/restaurants/info/v1/QA-SUGARMASH/menu',
      config
    );
    dispatch({
      type: LOAD_ROOM_DATA,
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
      type: FAIL_ROOM_DATA,
    });
  }
};
