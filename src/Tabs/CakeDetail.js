import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import styles from './ThemeCake.module.css';
import CartContext from "../cart/CartContext";

const CakeDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cake = location.state?.cake; // safely get cake from state

  // hooks must be called unconditionally
  const [mainImg, setMainImg] = useState(cake ? cake.img : "");
  const [weight, setWeight] = useState(1);
  const [flavor, setFlavor] = useState(cake?.flavors ? cake.flavors[0] : "Vanilla");
  const [message, setMessage] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (!cake) {
      navigate("/"); // redirect if cake is missing
    }
  }, [cake, navigate]);
 if (!cake) return null;
  // now we can safely return
  const stars = Array.from({ length: 5 }, (_, index) =>
    index < cake.rating ? "★" : "☆"
  );

  const images = [cake.img]; // for thumbnails
  const weightOptions = [0.5, 1, 2, 3];


  const handleAddToCart = () => {
    addToCart({
      id: cake.id,
      name: cake.name,
      img: mainImg,
      price: Number(cake.price.replace('₹', '')),
      weight,
      flavor,
      message,
    });
    alert("Cake added to cart!");
  };

  const onPurchase = () => {
    navigate("/payment", {
      state: {
        price: cake.price,
        weight,
        flavor,
        name: cake.name,
        message,
        img: mainImg
      }
    });
  };

  return (
    <div className={styles.appContent}>
      <div className="container my-5 d-flex gap-5" style={{ background: "white", borderRadius: "17px" }}>
        {/* Left thumbnails */}
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

        {/* Main image */}
        <div>
          <img src={mainImg} alt={cake.name} style={{ width: 400, height: 400 }} />
        </div>

        <div>
          <h2 style={{ fontFamily: "cursive" }}>{cake.name}</h2>
          <p style={{ fontWeight: "500" }}>Price: {cake.price}</p>
          <p style={{ fontWeight: "500" }}>Description: {cake.desc}</p>

          <div className={styles.rating}>
            Rating: {stars.map((star, idx) => (
              <span key={idx} className={styles.ratingIcon}>{star}</span>
            ))}
          </div>

          {/* Weight selector */}
          <div className="mb-3">
            <p style={{ fontWeight: "500", marginBottom: "0px" }}>Weight:</p>
            {weightOptions.map((w) => (
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
            <div className={styles.flavorSelectorWrapper}>
              <select
                className={styles.flavorSelector}
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
              >
                {cake.flavors
                  ? cake.flavors.map((f, idx) => (
                      <option key={idx} value={f}>{f}</option>
                    ))
                  : ["Vanilla", "Chocolate", "Strawberry"].map((f, idx) => (
                      <option key={idx} value={f}>{f}</option>
                    ))
                }
              </select>
            </div>
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

          {/* Delivery info */}
          <div className={styles.deliveryInfo}>
            <div className="d-flex align-items-center">
              <i className="fas fa-clock" style={{ fontSize: "1rem", color: "black", marginRight: "10px" }}></i>
              <span className={styles.timer}>Delivery in 4-5 hours</span>
            </div>
          </div>

          {/* Buttons */}
          <button className={styles.buyButton} onClick={onPurchase}>Buy Now</button>
          <button className={styles.buyButton} onClick={handleAddToCart}>Add Cart</button>
        </div>
      </div>
    </div>
  );
};

export default CakeDetail;
