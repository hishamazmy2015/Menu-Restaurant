import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT ,REMOVE_ALERT } from './types';

export const setAlerts = (message, addType) => (dispatch) => {
  console.log(" -------------------- Inside Set Alert--------------------------- ")
  const id = uuidv4();

  dispatch({
    type: SET_ALERT,
    payload: { message, addType, id },
  });

  setTimeout(() => {
    console.log('object  id ', id);

    dispatch({
      type: REMOVE_ALERT,
      payload: { id, message, addType },
    });
  }, 10000);

};
