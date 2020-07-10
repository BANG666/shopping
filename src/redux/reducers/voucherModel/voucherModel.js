import initSate from './initState';
import { UPDATE_VOUCHER_DETAIL } from '../../actions/voucher';

const voucherModel = (state = initSate, { type, payload }) => {
  switch (type) {
    case UPDATE_VOUCHER_DETAIL:
      return { ...state, detail: payload };
    default:
      return state;
  }
};

export default voucherModel;
