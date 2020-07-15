import initSate from './initState';
import { UPDATE_ORDER_VOUCHER } from '../../actions/order';

const orderModel = (state = initSate, { type, payload }) => {
  switch (type) {
    case UPDATE_ORDER_VOUCHER:
      return { ...state, orderDetail: payload };
    default:
      return state;
  }
};

export default orderModel;
