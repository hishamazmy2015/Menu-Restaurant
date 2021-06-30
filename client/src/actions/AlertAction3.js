import { SET_ALERT ,REMOVE_ALERT} from './types';

import { v4 as uuidv4 } from 'uuid';

export const AddingAlert = (message, addType) => (dispatch) => {
  
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
    }, 100);
};

// export default AddingAlert;
