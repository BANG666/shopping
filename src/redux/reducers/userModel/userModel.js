import initSate from './initState';
import { UPDATE_USER } from '../../actions/user';

const userModel = (state = initSate, { type, payload }) => {
  const { user } = state;
  switch (type) {
    case UPDATE_USER:
      return { ...state, user: { ...user, ...payload } };
    default:
      return state;
  }
};

export default userModel;
