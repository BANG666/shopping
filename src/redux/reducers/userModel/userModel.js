import initSate from './initState';
import { UPDATE_USER } from '../../actions/user';

const userModel = (state = initSate, { type, payload }) => {
  switch ( type ) {
    case UPDATE_USER:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default userModel;
