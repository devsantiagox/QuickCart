import { ActionTypes } from "../constants/actionType";
const {
  UPDATE_PRODUCT_COUNTER,
  INCREMENT,
  DECREMENT,
  SET_PRODUCTS,
} = ActionTypes;

export function increment(id) {
  const payload = {
    id: id,
    updateType: INCREMENT,
  };
  return { type: UPDATE_PRODUCT_COUNTER, payload };
}
export function decrement(id) {
  const payload = {
    id: id,
    updateType: DECREMENT,
  };
  return { type: UPDATE_PRODUCT_COUNTER, payload };
}
export function setProducts(products) {
  return { type: SET_PRODUCTS, payload: products };
}