import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import styles from './ThemeCake.module.css';
import { CartContext } from "../cart/CartContext";
import { createOrder, addToCartAPI } from "../service/commonService";

const CakeDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cake = location.state?.cake;

  const [mainImg, setMainImg] = useState(cake ? cake.img : "");
  const [weight, setWeight] = useState(1);
  const [flavor, setFlavor] = useState("Vanilla");
  const [message, setMessage] = useState("");
  const [popupMsg, setPopupMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (!cake) navigate("/");
  }, [cake, navigate]);

  if (!cake) return null;

  const stars = Array.from({ length: 5 }, (_, i) => i < cake.rating ? "★" : "☆");
  const images = [cake.img];
  //const weightOptions = [0.5, 1, 2, 3];

  const togglePopup = (msg) => {
    setPopupMsg(msg);
    setShowPopup(true);
  };

  const handleAddToCart = async () => {
    const item = {
      orderName: cake.name,
      imageUrl: mainImg,
      price: Number(cake.price.replace("₹", "")),
      weight,
      flavour: flavor,
      message,
      quantity: 1,
    };
    try {
      await addToCartAPI(item);
      addToCart(item);
      togglePopup("Cake added to cart!");
    } catch (err) {
      console.error(err);
      togglePopup("Failed to add item to cart!");
    }
  };

  const onPurchase = async () => {
    const payload = {
      totalAmount: Number(cake.price.replace(/[^0-9.]/g, "")),
      items: [{
        productId: cake.id,
        orderName: cake.name,
        quantity: 1,
        price: Number(cake.price.replace(/[^0-9.]/g, "")),
        weight,
        flavour: flavor,
        imageUrl: mainImg,
      }]
    };
    try {
      const response = await createOrder(payload);
      navigate("/payment", {
        state: {
          ...payload,
          message,
          img: mainImg,
          orderId: response.data.data.orderId,
        },
      });
    } catch (err) {
      console.error(err);
      togglePopup("Failed to place order. Please try again.");
    }
  };

  return (
    <div className={styles.appContent}>
      {/* Popup */}
      {showPopup && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: "#fff8f0",
            padding: "25px 35px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
            fontFamily: "'Playfair Display', serif",
            color: "#8B4513",
            minWidth: "300px"
          }}>
            <p style={{ marginBottom: "20px", fontSize: "1.2rem" }}>{popupMsg}</p>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                backgroundColor: "#c15b78",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1rem"
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Cake Details */}
      <div className="container my-5 d-flex gap-5" style={{ background: "white", borderRadius: "17px", padding: "25px" }}>
        {/* Thumbnails */}
        <div className="d-flex flex-column gap-2">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={cake.name}
              style={{ width: 50, height: 50, cursor: "pointer" }}
              onClick={() => setMainImg(img)}
            />
          ))}
        </div>

        {/* Main Image */}
        <div>
          <img src={mainImg} alt={cake.name} style={{ width: 400, height: 400, borderRadius: "15px" }} />
        </div>

        {/* Info Section */}
        <div>
          <h2 style={{ fontFamily: "cursive", color: "#8B4513" }}>{cake.name}</h2>
          <p style={{ fontWeight: "500", fontSize: "1.1rem" }}>Price: {cake.price}</p>
          <p style={{ fontWeight: "500", fontSize: "1rem" }}>{cake.desc}</p>

          <div className={styles.rating}>
            Rating: {stars.map((star, idx) => (
              <span key={idx} className={styles.ratingIcon} style={{color: "#eddb4eff", fontSize: "1.2rem" }}>{star}</span>
            ))}
          </div>

          {/* Weight selector */}
          <div className="mb-3">
            <p style={{ fontWeight: "500", marginBottom: "0px" }}>Weight:</p>
            {[0.5, 1, 2, 3].map(w => (
              <button
                key={w}
                className={`${styles.weightButton} ${weight === w ? styles.selected : ""}`}
                onClick={() => setWeight(w)}
              >
                {w}kg
              </button>
            ))}
          </div>

          {/* Flavor selector */}
          <div className="mb-3">
  <p style={{ fontWeight: "500", marginBottom: "0px" }}>Select Flavor:</p>
  <select
    className={styles.flavorSelector}
    value={flavor}
    onChange={(e) => setFlavor(e.target.value)}
  >
    {["Vanilla", "Strawberry", "Chocolate", "Blueberry", "Butterscotch"].map((f, idx) => (
      <option key={idx} value={f}>{f}</option>
    ))}
  </select>
</div>

          {/* Message input */}
          <div className="mb-3">
            <p style={{ fontWeight: "500", marginBottom: "0px" }}>Leave a special message:</p>
            <input
              type="text"
              className={styles.messageInput}
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="d-flex gap-3 mt-3">
            <button
              onClick={onPurchase}
              style={{
                backgroundColor: "#8B4513",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "10px",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              style={{
                backgroundColor: "#c15b78",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "10px",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Add Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeDetail;
