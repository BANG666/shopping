import { combineReducers } from 'redux';
import userModel from './userModel/userModel';
import hotelModel from './hotelModel/hotelModel';
import voucherModel from './voucherModel/voucherModel';
import orderModel from './orderModel/orderModel';

export default combineReducers({
  userModel,
  hotelModel,
  voucherModel,
  orderModel
});
