import { useContext } from "react";
import CartContext from "./CartContext"; // adjust path if needed
import { useEffect } from "react";
const Cart= () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
console.log("Cart Items:", cartItems);
 useEffect(() => {
    console.log("Cart Items changed:", cartItems);
  }, [cartItems]);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <h2 className="text-center mt-5">Your cart is empty!</h2>;
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Your Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="d-flex align-items-center justify-content-between mb-3 p-3"
          style={{ background: "#fff7fb", borderRadius: "12px" }}
        >
          <img
            src={item.img}
            alt={item.name}
            style={{ width: 80, height: 80, borderRadius: "8px", objectFit: "cover" }}
          />
          <div className="flex-grow-1 ms-3">
            <h5>{item.name}</h5>
            <p>Flavor: {item.flavor} | Weight: {item.weight}kg</p>
            <p>Price: ₹{item.price.toFixed(2)}</p>
          </div>

          {/* Quantity controls */}
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => removeFromCart(item.id)}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="btn btn-sm btn-success"
              onClick={() => addToCart(item)}
            >
              +
            </button>
          </div>
        </div>
      ))}

      <hr />
      <h4>Total: ₹{totalPrice.toFixed(2)}</h4>
      <button
        className="btn btn-primary mt-3"
        onClick={() => alert("Proceed to Payment")}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
