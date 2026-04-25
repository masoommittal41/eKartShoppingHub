import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import '../App.css'
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
function Navbar() {
  const { items: cartItems} = useSelector((state) => state.cart);
  return (
    <div>
      <nav>
        <h2>E-Kart</h2>
        <div>
          <Link to="/"><HomeIcon style={{ "fontSize": "2.2rem" }} /></Link>
          <Link to="/cart"> <div className='cart-icon'><ShoppingCartOutlinedIcon style={{ "fontSize": "2.2rem" }} /><span>{cartItems.length}</span></div> </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar