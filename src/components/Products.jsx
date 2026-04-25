import React, { useEffect} from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productSlice';
import { addToCart } from '../slices/cartSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
function Products() {
  const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status])

  if (status === 'loading') return (<h2>Loading Products...</h2>)
  if (status === 'failed') return (<h2>Failed to load the products..Try Again</h2>)

  return (
    <div>
      <Navbar />
      <div className='product-list'>
        {products &&
          products.map((prod) => {
            return (
              <div className='product-card'>
                <img src={prod.image} alt="Image" />
                <h2>{prod.title.length > 20 ? `${prod.title.slice(0, 20)}...` : prod.title}</h2>
                <p>Price : ${prod.price}</p>
                <button onClick={() => dispatch(addToCart(prod))}><ShoppingCartOutlinedIcon style={{ "fontSize": "10px" }} /> Add to Cart</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Products