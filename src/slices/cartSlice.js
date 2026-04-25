import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [], //to store final cart items
    tempItems: [], //to store qty related changes on cart items
    totalPrice: 0 //total cart price
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const exists = state.items.find((item) => item.id === action.payload.id);
            if (exists) {
                exists.quantity += 1;
            }
            else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
            state.tempItems = [...state.items];
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        updateQuantity: (state, action) => {
            const tempItem = state.tempItems.find((item) => item.id === action.payload.id);
            if (tempItem) { tempItem.quantity = (action.payload.qty); }
        },
        removeFromCart: (state, action) => {
            const removeItem = state.items.find((item) => item.id === action.payload);
            if (removeItem.quantity > 1) {
                removeItem.quantity -= 1;
            }
            else {
                state.items = state.items.filter((item) => item.id !== action.payload);
            }
            state.tempItems = [...state.items];
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        updateCart: (state, action) => {
            const updateItem = state.items.find((item) => item.id === action.payload.id);
            updateItem.quantity = (action.payload.qty);
            state.tempItems = [...state.items];
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }
    }
})
export const { addToCart, removeFromCart, updateCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;