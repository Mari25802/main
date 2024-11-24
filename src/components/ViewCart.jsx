import './css/Viewcart.css';
import { cartContext } from './CartContext';
import { useContext, useEffect, useState } from 'react';

export default function Viewcart() {
    const [total, setTotal] = useState(0);
    const { cart, setCart } = useContext(cartContext);

    useEffect(() => {
        const updatedCart = cart.map(product => ({
            ...product,
            Quantity: product.Quantity || 1,
        }));
        if (JSON.stringify(updatedCart) !== JSON.stringify(cart)) {
            setCart(updatedCart);
        }
    }, [cart, setCart]);

    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + Number(curr.Price) * curr.Quantity, 0));
    }, [cart]);

    const updateQuantity = (index, delta) => {
        const updatedCart = [...cart];
        updatedCart[index].Quantity = Math.max(1, updatedCart[index].Quantity + delta);
        setCart(updatedCart);
    };

    const removeProduct = (index) => {
        if (window.confirm("Are you sure you want to remove this product?")) {
            const updatedCart = cart.filter((_, i) => i !== index);
            setCart(updatedCart);
        }
    };

    if (cart.length === 0) {
        return <h1>Your cart is empty</h1>;
    }

    return (
        <div className="cart-container">
            <div className="products">
                {cart.map((product, index) => (
                    <div className="cart-product" key={index}>
                        <div className="cart-img">
                            <img
                                src={`${process.env.PUBLIC_URL}/${product.Image}`}
                                alt={product.Name}
                                onError={(e) => { e.target.src = `${process.env.PUBLIC_URL}/assets/fallback.jpg`; }}
                            />
                        </div>
                        <div className="cart-content">
                            <h2 className="name">{product.Name}</h2>
                            <h2>Rs: {product.Price}</h2>
                            <div className="quantity-controls">
                                <button onClick={() => updateQuantity(index, -1)}>-</button>
                                <span>{product.Quantity}</span>
                                <button onClick={() => updateQuantity(index, 1)}>+</button>
                            </div>
                        </div>
                        <div className="total2">
                            <h2>₹: {product.Price * product.Quantity}</h2>
                            <button 
                                className="remove-button" 
                                onClick={() => removeProduct(index)}
                            >
                                X
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="cart-total">
                <div className="total1">
                    <h1>Order Summary</h1>
                    <div className="total">
                        <h1>TOTAL</h1>
                        <span className="span">₹<span id="total-amount">{total}</span></span>
                        <div className="checkout">
                            <button 
                                className="checkout-button" 
                                disabled={cart.length === 0}
                                onClick={() => alert("Proceed to Checkout")}
                            >
                                CHECKOUT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
