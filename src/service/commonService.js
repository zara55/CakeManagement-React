import { AppRegistrationTwoTone } from "@mui/icons-material";
import api from "./interceptor/Interceptor";
export const createOrder = (orderData) => {
return api.post("/orders/details", orderData); 
};
export const payment = (paymentData) => {
return api.post("/payment/savePayment", paymentData); 
};
export const addToCartAPI = async (cartItem) => {
  return api.post("/cart/add", cartItem);   // backend endpoint
};
export const deleteCartItemAPI = (itemId) => {
  return api.delete(`/cart/remove/${itemId}`);
};
export const getCartItemsAPI = (userId) => {
  return api.get(`/cart/user`, {
    params: { userId },
  });
};
export const trackOrderAPI = (orderId) =>
  api.get(`/payment/track/${orderId}`);

export const getUserOrdersAPI = () => {
  return api.get("/orders/user/orders");
};
export const registerAPI = (payload) => {
  return api.post("/cm/register", payload);
};
export const forgotPasswordService = (payload)=>{
    return api.post("/cm/forgot-password", payload);
}
