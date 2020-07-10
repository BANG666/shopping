import initSate from './initState';
import { UPDATE_HOTEL_DETAIL, UPDATE_PARAMS, UPDATE_ROOM_TYPE, UPDATE_VOUCHER } from '../../actions/hotel';

const hotelModel = (state = initSate, { type, payload }) => {
  const params = state.params;
  switch (type) {
    case UPDATE_PARAMS:
      return { ...state, params: { ...params, ...payload } };
    case UPDATE_HOTEL_DETAIL:
      return { ...state, hotelDetail: payload };
    case UPDATE_ROOM_TYPE:
      return {...state, roomType: payload};
      case UPDATE_VOUCHER:
      return {...state, voucher: payload};
    default:
      return state;
  }
};

export default hotelModel;
