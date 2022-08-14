import { useState } from 'react';
import { useSelector } from 'react-redux';
import CartItem from './cartItem';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const [pricing, setPricing] = useState(0);
    let price = 0.00;
    for (var i = 0; i < cartItems.length; i++) {
        price = parseFloat(parseFloat(price) + parseFloat(cartItems[i].totalPrice.toFixed(2)));
    }


    return (<>
        <div className="cartbox col-4">
            <div className="mt-3 mb-2">
                <div className="cartheading mb-4">
                    Cart
                </div>
                {cartItems.map((item) => (
                    <CartItem
                        key={item.id}
                        item={{
                            id: item.id,
                            title: item.name,
                            quantity: item.quantity,
                            total: item.totalPrice,
                            price: item.price,
                            image: item.image
                        }}
                    />
                ))}
                {cartItems.length === 0 && <p>No Items are Added. </p>}
            </div>
            {cartItems.length !== 0 &&
                <div className="mt-5 col-12">
                    <button className="btn btncheckout" ><span className='btnleft'> checkout </span>  <span className='btnright'> ${price}</span></button>
                </div>
            }

        </div>
    </>);
}

export default Cart;