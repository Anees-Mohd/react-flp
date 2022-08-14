import { combineReducers } from "redux";
import uiSlice from './ui';
import cartSlice from './cart';

export default combineReducers({
    ui: uiSlice,
    cart: cartSlice
})