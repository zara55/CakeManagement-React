import { useLocation } from "react-router-dom";
import { useState } from "react";

function PaymentSection() {
  const location = useLocation();
  const order = location.state;

  const [paymentMethod, setPaymentMethod] = useState(""); // <--- ALWAYS runs

  // If user accessed directly without state
  if (!order) {
    return <h2 className="text-center mt-5">No order details found!</h2>;
  }

  const gst = order.price * 0.18;
  const total = order.price + gst;

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }

    alert(
      `🎉 Order Placed Successfully! 🎉\n\n` +
      `Cake: ${order.name}\n` +
      `Flavor: ${order.flavor}\n` +
      `Weight: ${order.weight}kg\n` +
      `Message: ${order.message || "No message"}\n\n` +
      `Total Paid: ₹${total}\n` +
      `Payment Method: ${paymentMethod}`
    );
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card p-4 shadow-sm border-0" style={{ background: "#fff7fb", borderRadius: "12px", maxWidth: "500px", width: "100%" }}>
        <h4 className="fw-bold mb-4 text-center">Order Summary</h4>

        {/* Cake Info */}
        <div className="d-flex align-items-center mb-4">
          <img 
            src={order.img} 
            alt={order.name} 
            style={{ width: "90px", height: "90px", borderRadius: "10px", objectFit: "cover" }} 
          />
          <div className="ms-3">
            <h5 className="fw-bold mb-1">{order.name}</h5>
            <p className="mb-1"><strong>Flavor:</strong> {order.flavor}</p>
            <p className="mb-1"><strong>Weight:</strong> {order.weight}kg</p>
            <p className="mb-1"><strong>Message:</strong> {order.message || "No message"}</p>
          </div>
        </div>

        {/* Price Details */}
        <div className="d-flex justify-content-between mb-2">
          <span>Base Price:</span>
          {console.log(order.price)}
          <span>₹{order?.price}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>GST (18%):</span>
          <span>₹{gst}</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
          <span>Total Payable:</span>
          <span>₹{total}</span>
        </div>

        {/* Payment Methods */}
        <h5 className="fw-bold mb-2">Select Payment Method</h5>
        <div className="form-check mt-2">
          <input 
            className="form-check-input" 
            type="radio" 
            name="payment" 
            value="UPI"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label">UPI</label>
        </div>
        <div className="form-check mt-2">
          <input 
            className="form-check-input" 
            type="radio" 
            name="payment" 
            value="COD"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label">Cash on Delivery (COD)</label>
        </div>
        <div className="form-check mt-2 mb-4">
          <input 
            className="form-check-input" 
            type="radio" 
            name="payment" 
            value="Credit/Debit Card"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label">Credit / Debit Card</label>
        </div>

        {/* Pay Now Button */}
        <button 
          className="btn w-100 text-white"
          style={{ backgroundColor: "#ff6f91", fontWeight: "bold" }}
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default PaymentSection;
