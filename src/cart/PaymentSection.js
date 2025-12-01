// import { useLocation, useNavigate } from "react-router-dom";
// import { useState,useContext  } from "react";
// import { payment } from "../service/commonService";
// import { CartContext } from "./CartContext";
// import { deleteCartItemAPI } from "../service/commonService";
// function PaymentSection() {
//   const location = useLocation();
//   const navigate = useNavigate();
//     const { cartItems, setCartItems } = useContext(CartContext); // CartContext here

//   const order = location.state; // contains only selected items

//   const [paymentMethod, setPaymentMethod] = useState("");

//   if (!order) return <h2 className="text-center mt-5">No order details found!</h2>;

//   const gst = order.totalAmount * 0.18;
//   const totalPayable = order.totalAmount + gst;

//   const handlePayment = async () => {
//   if (!paymentMethod) {
//     alert("Please select a payment method.");
//     return;
//   }

//   const payload = {
//     orderId: order.orderId,
//     paymentId: "PAY123456",
//     totalAmount: order.totalAmount,
//     taxPercent: 18,
//     paymentType: paymentMethod,
//     userAddress: "123, Baker Street, London",
//   };

//   try {
//     await payment(payload);

//     // Remove paid items from backend first
//     await Promise.all(order.items.map(item => deleteCartItemAPI(item.productId)));

//     // Update local cart state
//     setCartItems(prev => prev.filter(item => !order.items.find(i => i.productId === item.productId)));

//     alert(
//       `🎉 Payment Successful! 🎉\n\n` +
//       `Order ID: ${order.orderId}\n` +
//       `Thank you for shopping with Cake Aura! 🍰🚚`
//     );

//     navigate("/"); // go back to cart or home
//   } catch (error) {
//     console.error("Payment failed:", error);
//     alert("Payment failed. Your cart remains unchanged.");
//   }
// };

//   return (
//     <div className="container my-5 d-flex justify-content-center">
//       <div className="card p-4 shadow-sm border-0" style={{ background: "#fff7fb", borderRadius: "12px", maxWidth: "500px", width: "100%" }}>
//         <h4 className="fw-bold mb-4 text-center">Order Summary</h4>

//         {order.items.map((item, index) => (
//           <div key={index} className="d-flex align-items-center mb-4">
//             <img src={item.imageUrl} alt={item.orderName} style={{ width: "90px", height: "90px", borderRadius: "10px", objectFit: "cover" }} />
//             <div className="ms-3">
//               <h5 className="fw-bold mb-1">{item.orderName}</h5>
//               <p className="mb-1"><strong>Flavor:</strong> {item.flavour}</p>
//               <p className="mb-1"><strong>Weight:</strong> {item.weight}kg</p>
//               <p className="mb-1"><strong>Price:</strong> ₹{item.price}</p>
//             </div>
//           </div>
//         ))}

//         <div className="d-flex justify-content-between mb-2">
//           <span>Base Price:</span>
//           <span>₹{order.totalAmount.toFixed(2)}</span>
//         </div>
//         <div className="d-flex justify-content-between mb-2">
//           <span>GST (18%):</span>
//           <span>₹{gst.toFixed(2)}</span>
//         </div>
//         <hr />
//         <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
//           <span>Total Payable:</span>
//           <span>₹{totalPayable.toFixed(2)}</span>
//         </div>

//         <h5 className="fw-bold mb-2">Select Payment Method</h5>
//         {["UPI", "COD", "Credit/Debit Card"].map((method) => (
//           <div className="form-check mt-2" key={method}>
//             <input
//               className="form-check-input"
//               type="radio"
//               name="payment"
//               value={method}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             />
//             <label className="form-check-label">{method}</label>
//           </div>
//         ))}

//         <button className="btn w-100 text-white mt-4" style={{ backgroundColor: "#ff6f91", fontWeight: "bold" }} onClick={handlePayment}>
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PaymentSection;
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { payment } from "../service/commonService";
import { CartContext } from "./CartContext";
import { deleteCartItemAPI } from "../service/commonService";

function PaymentSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCartItems } = useContext(CartContext);

  const order = location.state;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");
  const [popupMsg, setPopupMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  if (!order) return <h2 className="text-center mt-5">No order details found!</h2>;

  const gst = order.totalAmount * 0.18;
  const totalPayable = order.totalAmount + gst;

  const togglePopup = (msg) => {
    setPopupMsg(msg);
    setShowPopup(true);
  };

  const isFormValid = () =>
    address && landmark && pincode && city && stateName && country && paymentMethod;

  const handlePayment = async () => {
    if (!isFormValid()) {
      togglePopup("Please fill all address fields and select a payment method!");
      return;
    }

    const userAddress = `${address}, ${landmark}, ${city} - ${pincode}, ${stateName}, ${country}`;

    const payload = {
      orderId: order.orderId,
      paymentId: "PAY123456",
      totalAmount: order.totalAmount,
      taxPercent: 18,
      paymentType: paymentMethod,
      userAddress,
    };

    try {
      await payment(payload);

      await Promise.all(order.items.map(item => deleteCartItemAPI(item.productId)));
      setCartItems(prev => prev.filter(item => !order.items.find(i => i.productId === item.productId)));

      togglePopup(`🎉 Payment Successful! 🎉\nOrder ID: ${order.orderId}`);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error(error);
      togglePopup("Payment failed. Please try again.");
    }
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      {/* Popup */}
      {showPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }}>
          <div className="bg-light p-4 rounded-3 text-center shadow" style={{ minWidth: "300px", fontFamily: "'Playfair Display', serif", color: "#8B4513" }}>
            <p className="mb-3" style={{ fontSize: "1.2rem", whiteSpace: "pre-line" }}>{popupMsg}</p>
            <button className="btn btn-danger" onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}

    <div className="card p-4 shadow-sm border-0" style={{ background: "#fff7fb", borderRadius: "12px", width: "100%", maxWidth: "700px", fontFamily: "'Roboto', sans-serif" }}>
  <h4 className="fw-bold mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Order Summary</h4>

  {/* Order Items */}
  {order.items.map((item, index) => (
    <div key={index} className=" mb-3 shadow-sm" style={{ borderRadius: "12px", backgroundColor: "#fff3f8" }}>
      <div className="row g-3 align-items-center p-3">
       <div className="col-4 col-md-3 d-flex justify-content-center align-items-center">
  <div style={{ width: "90px", height: "90px", overflow: "hidden", borderRadius: "12px" }}>
    <img
      src={item.imageUrl}
      alt={item.orderName}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </div>
</div>
        <div className="col-8 col-md-9">
          <h5 className="fw-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#8B4513" }}>
            {item.orderName}
          </h5>
          <p className="mb-1"><i className="bi bi-palette me-2"></i><strong>Flavor:</strong> {item.flavour}</p>
          <p className="mb-1"><i className="bi bi-bag me-2"></i><strong>Weight:</strong> {item.weight}kg</p>
          <p className="mb-0"><i className="bi bi-currency-rupee me-2"></i><strong>Price:</strong> ₹{item.price}</p>
        </div>
      </div>
    </div>
  ))}

  {/* Summary */}
  <div className="d-flex justify-content-between mb-2">
    <span>Base Price:</span>
    <span>₹{order.totalAmount.toFixed(2)}</span>
  </div>
  <div className="d-flex justify-content-between mb-2">
    <span>GST (18%):</span>
    <span>₹{gst.toFixed(2)}</span>
  </div>
  <hr />
  <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
    <span>Total Payable:</span>
    <span>₹{totalPayable.toFixed(2)}</span>
  </div>

  {/* Address Form */}
  <h5 className="fw-bold mb-2">Delivery Address</h5>
  <div className="row g-3 mb-3">
    <div className="col-md-6">
      <div className="input-group">
        <span className="input-group-text"><i className="bi bi-house"></i></span>
        <input type="text" className="form-control" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
    </div>
    <div className="col-md-6">
      <div className="input-group">
        <span className="input-group-text"><i className="bi bi-geo-alt"></i></span>
        <input type="text" className="form-control" placeholder="Landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
      </div>
    </div>
    <div className="col-md-6">
      <div className="input-group">
        <span className="input-group-text"><i className="bi bi-123"></i></span>
        <input type="text" className="form-control" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
      </div>
    </div>
    <div className="col-md-6">
      <div className="input-group">
        <span className="input-group-text"><i className="bi bi-building"></i></span>
        <input type="text" className="form-control" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
    </div>
    <div className="col-md-6">
      <div className="input-group">
        <span className="input-group-text"><i className="bi bi-flag"></i></span>
        <input type="text" className="form-control" placeholder="State" value={stateName} onChange={(e) => setStateName(e.target.value)} />
      </div>
    </div>
    <div className="col-md-6">
      <div className="input-group">
        <span className="input-group-text"><i className="bi bi-globe"></i></span>
        <input type="text" className="form-control" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
      </div>
    </div>
  </div>

  {/* Payment Mode */}
  <h5 className="fw-bold mb-2">Select Payment Mode</h5>
  <select className="form-select mb-3" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
    <option value="">--Select Payment Mode--</option>
    <option value="UPI">UPI</option>
    <option value="COD">COD</option>
    <option value="Credit/Debit Card">Credit/Debit Card</option>
  </select>

  <button
    className="btn w-100 mt-2"
    style={{
      backgroundColor: isFormValid() ? "#c15b78" : "#ccc",
      color: "#fff",
      fontWeight: "bold",
      cursor: isFormValid() ? "pointer" : "not-allowed"
    }}
    disabled={!isFormValid()}
    onClick={handlePayment}
  >
    Pay Now
  </button>
</div>

    </div>
  );
}

export default PaymentSection;


