import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../service/commonService";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, deleteItemCompletely, setCartItems } = useContext(CartContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [popupMsg, setPopupMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = (msg) => {
    setPopupMsg(msg);
    setShowPopup(true);
  };

  const toggleSelectItem = (item) => {
    if (selectedItems.find(i => i.productId === item.productId)) {
      setSelectedItems(prev => prev.filter(i => i.productId !== item.productId));
    } else {
      setSelectedItems(prev => [...prev, item]);
    }
  };

  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const onPurchase = async () => {
    if (selectedItems.length === 0) return togglePopup("Please select at least one item to checkout!");

    const payload = {
      totalAmount: totalPrice,
      items: selectedItems.map((item) => ({
        productId: item.productId,
        orderName: item.orderName,
        quantity: item.quantity,
        price: item.price,
        weight: item.weight,
        flavour: item.flavour,
        imageUrl: item.imageUrl || item.mainImg,
      })),
    };

    try {
      const response = await createOrder(payload);
      const orderInfo = response.data;

      togglePopup(`🎉 Order placed successfully! 🎉\nOrder ID: ${orderInfo.data.orderId}`);

      setTimeout(() => {
        navigate("/payment", {
          state: {
            ...payload,
            items: selectedItems,
            orderId: orderInfo.data.orderId,
          },
        });
      }, 2000);

      // Remove selected items locally
      setCartItems(prev => prev.filter(item => !selectedItems.find(sel => sel.productId === item.productId)));
      setSelectedItems([]);
    } catch (error) {
      console.error("Failed to create order:", error);
      togglePopup("Failed to place order. Please try again.");
    }
  };

  if (cartItems.length === 0) return <h2 className="text-center mt-5" style={{ fontFamily: "'Playfair Display', serif" }}>Your cart is empty!</h2>;

  return (
    <div className="d-flex justify-content-center my-5">

      {/* Popup */}
      {showPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }}>
          <div className="bg-light p-4 rounded-3 text-center shadow" style={{ minWidth: "300px", fontFamily: "'Playfair Display', serif", color: "#8B4513" }}>
            <p className="mb-3" style={{ fontSize: "1.2rem", whiteSpace: "pre-line" }}>{popupMsg}</p>
            <button className="btn btn-danger" onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}

      {/* Cart */}
      <div style={{
        width: "90%",
        maxWidth: "750px",
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        fontFamily: "'Roboto', sans-serif"
      }}>
        <h2 className="mb-4 text-center" style={{ color: "#c15b78", fontFamily: "'Playfair Display', serif" }}>Your Cart</h2>

        {cartItems.map(item => {
          const isSelected = !!selectedItems.find(i => i.productId === item.productId);
          return (
            <div key={item.productId} className="d-flex align-items-center justify-content-between mb-3 p-3 shadow-sm" 
              style={{ background: isSelected ? "#ffe6f0" : "#fff7fb", borderRadius: "12px" }}>
              
              <input type="checkbox" className="me-3" checked={isSelected} onChange={() => toggleSelectItem(item)} />

              <div style={{ width: "80px", height: "80px", overflow: "hidden", borderRadius: "12px", flexShrink: 0 }}>
                <img src={item.imageUrl} alt={item.orderName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              <div className="flex-grow-1 ms-3">
                <h5 style={{ fontFamily: "'Playfair Display', serif", color: "#8B4513", marginBottom: "5px" }}>{item.orderName}</h5>
                <p className="mb-1"><i className="bi bi-palette me-2"></i>Flavour: {item.flavour} | Weight: {item.weight}kg</p>
                <p className="mb-0"><i className="bi bi-currency-rupee me-2"></i>{item.price.toFixed(2)}</p>
              </div>

              <div className="d-flex align-items-center gap-2 me-3">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => removeFromCart(item.productId)}>-</button>
                <span style={{marginTop:"12px"}}>{item.quantity}</span>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => addToCart(item)}>+</button>
              </div>

              <i className="bi bi-trash-fill text-danger fs-5" style={{ cursor: "pointer",marginTop:"15px" }} onClick={() => deleteItemCompletely(item.productId)}></i>
            </div>
          );
        })}

        <hr />

        <div className="d-flex justify-content-between align-items-center mt-3">
          <h4 style={{ fontFamily: "'Playfair Display', serif", color: "#8B4513" }}>Total: ₹{totalPrice.toFixed(2)}</h4>
          <button
            onClick={onPurchase}
            disabled={selectedItems.length === 0}
            className="btn btn-lg"
            style={{
              backgroundColor: selectedItems.length ? "#c15b78" : "#ccc",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "12px",
              cursor: selectedItems.length ? "pointer" : "not-allowed"
            }}
          >
            Checkout Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
