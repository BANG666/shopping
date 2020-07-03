import { combineReducers } from 'redux';
import userModel from './userModel/userModel';
import hotelModel from './hotelModel/hotelModel';

export default combineReducers({
  userModel: userModel,
  hotelModel: hotelModel
});
