import initSate from './initState';
import { UPDATE_PARAMS } from '../../actions/hotel';

const hotelModel = (state = initSate, { type, payload }) => {
  switch ( type ) {
    case UPDATE_PARAMS:
      return { ...state, params: {...payload} };
    default:
      return state;
  }
};

export default hotelModel;
