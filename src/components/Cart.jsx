import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../slices/cartSlice';
import { updateCart } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { updateQuantity } from '../slices/cartSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FaCartShopping } from "react-icons/fa6";

function Cart() {
    const { items: cartItems, tempItems, totalPrice } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const updateItem = (id, qty) => {
        dispatch(updateCart({ id, qty }));
    }
    const handleUpdateQuantity = (id, qty) => {
        dispatch(updateQuantity({ id, qty }));
    }
    return (
        <div className='wrapper'>
            <div className='cart-page-container'>
                {cartItems.length === 0 ? (
                    <div className='cart-empty'>
                        <h3><FaCartShopping /> Your cart is empty...</h3>
                        <button className='back-button' onClick={() => navigate('/')}>
                            Back to Shopping
                        </button>
                    </div>
                ) :
                    (
                        <div className='cart-container'>
                            <h2>Your Cart</h2>
                            {
                                cartItems.map((item) => {
                                    return (
                                        <div className='cart-item'>
                                            <img src={item.image} alt="cart item" />
                                            <div className='cart-item-details'>
                                                <h2>{item.title}</h2>
                                                <p>Price : $ {item.price}</p>
                                                <div>
                                                    <input type="number" min="1" value={tempItems.find((temp) => temp.id === item.id)?.quantity || item.quantity} onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))} />
                                                    <button onClick={() => updateItem(item.id, tempItems.find((temp) => temp.id === item.id)?.quantity)}><EditIcon fontSize='1rem' /> Update</button>
                                                    <button onClick={() => dispatch(removeFromCart(item.id))}><DeleteIcon fontSize='1rem' /> Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            <div className='cart-total'>
                                <p>Total : ${totalPrice.toFixed(2)}</p>
                            </div>
                            <button className='back-button' onClick={() => navigate('/')}>
                                Back to Shopping
                            </button>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Cart