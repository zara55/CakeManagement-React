import { useNavigate } from "react-router-dom";
import './Carousel.css';
import CakeMenu from "../Tabs/CakeMenu";
function Carousel() {
  const navigate = useNavigate();

  const slides = [
    { img: "/assets/carousel/bdy1.png", route: "/birthday" },
    { img: "/assets/carousel/ann1.png", route: "/anniversary" },
    { img: "/assets/carousel/cou1.png", route: "/couple" },
    { img: "/assets/carousel/the1.png", route: "/theme" },
    { img: "/assets/carousel/gor1.png", route: "/gourmet" },
  ];
  const cakes = [
    {img:"/assets/cake/1.png", name: "Birthday Cake", route: "/birthday" },
    { img:"/assets/cake/2.png",name: "Anniversary Cake", route: "/anniversary" },
    {img:"/assets/cake/3.png", name: "Couple Cake", route: "/couple" },
    {img:"/assets/cake/4.png", name: "Theme Cake", route: "/theme" },
    { img:"/assets/cake/5.png",name: "Gourmet Cake", route: "/gourmet" }
  ];

  const randomCakes = [
    { id: 1, name: "Classic Theme Space Delight", price: "₹899", rating: 4.5, img: "/assets/brithday/chocolate.png" },
    { id: 2, name: "Vanilla Theme Pinata Burst", price: "₹650", rating: 4.3, img: "/assets/couple/couple3.png" },
    { id: 3, name: "Chocolate Theme Teddy Cream", price: "₹699", rating: 4.7, img: "/assets/brithday/fudge.png" },
    { id: 4, name: "Golden Theme Unicorn Fantasy", price: "₹899", rating: 4.4, img: "/assets/customized/pic5.png" },
  ];
  return (
    <>
        <div style={{ backgroundColor: "#fff0f5", minHeight: "100vh", paddingBottom: "50px" }}>

    <div className="carousel-container">
      <div
        id="mainCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
        data-bs-pause="false"
      >
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              onClick={() => navigate(slide.route)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={slide.img}
                alt="slide"
                className="d-block carousel-image"
              />
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
 
      {/* Menu Section */}
      <div className="menu-section">
        <h2 style={{ color: "goldenrod" }}>Enjoy the Cake</h2>
        <p style={{ fontSize: "1.2rem" }}>
          Celebrate life’s little moments with a cake made just for you. Soft, fluffy, and irresistibly delicious. 
          Because every day deserves a touch of sweetness.
        </p>
      </div>

      {/* Cake Cards */}
      <div className="card-deck">
        {cakes.map((cake, index) => (
          <div key={index} className="card" onClick={() => navigate(cake.route)}>
            <img
              src={cake.img}
              alt={cake.name}
            />
            <div className="card-body">
              <h5 className="card-title">{cake.name}</h5>
            </div>
          </div>
        ))}
      </div>

     
    </div>
    
 <div className="random-cake-section">
        {randomCakes.map((cake, index) => (
            <div className="col-sm-6 col-md-4 mb-4" key={cake.id}>
            <CakeMenu cake={cake}/>
          </div>
        ))}
      </div>
      </>
  );
}

export default Carousel;
