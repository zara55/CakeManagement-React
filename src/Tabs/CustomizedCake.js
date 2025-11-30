import CakeMenu from "./CakeMenu";
import { useState } from "react";
function CustomizedCake(){
    const [sortOption, setSortOption] = useState("");
  
const cakes = [
  { 
    id: 1, 
    name: "Classic Photo Delight", 
    price: "899", 
    rating: 4.5, 
    img: "/assets/customized/pic1.png",
    desc: "Personalized cake with your favorite photo – sweet memories baked in every bite."
  },
  { 
    id: 2, 
    name: "Choco Theme Soccer", 
    price: "749", 
    rating: 4.8, 
    img: "/assets/customized/pic2.png",
    desc: "Chocolatey delight with soccer-themed decorations – perfect for sports lovers."
  },
  { 
    id: 3, 
    name: "Strawberry Theme Pinata Burst", 
    price: "650", 
    rating: 4.3, 
    img: "/assets/customized/pic3.png",
    desc: "Fresh strawberries with a fun pinata burst – a playful surprise inside!"
  },
  { 
    id: 4, 
    name: "Pista Pinata Brust", 
    price: "699", 
    rating: 4.7, 
    img: "/assets/customized/pic4.png",
    desc: "Rich pista-flavored cake with a pinata center – elegance meets fun."
  },
  { 
    id: 5, 
    name: "Elegant Engagement Cake", 
    price: "899", 
    rating: 4.4, 
    img: "/assets/customized/pic5.png",
    desc: "Beautifully crafted cake for engagement celebrations – love in every slice."
  },
];
 const sortedCakes = [...cakes].sort((a, b) => {
        if (sortOption === "priceAsc") return a.price - b.price;
        if (sortOption === "priceDesc") return b.price - a.price;
        if (sortOption === "ratingAsc") return a.rating - b.rating;
        if (sortOption === "ratingDesc") return b.rating - a.rating;
        return 0; // default, no sorting
    });

    return(
        <div className="container my-5">
      <h2 className="text-center mb-4 theme-title">🎂 Customized Cakes 🎉</h2>
       <div className="d-flex justify-content-center mb-4">
                <select 
                    className="form-select w-auto" 
                    value={sortOption} 
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="ratingAsc">Rating: Low to High</option>
                    <option value="ratingDesc">Rating: High to Low</option>
                </select>
            </div>
      <div className="row justify-content-center" style={{ width: "70%" }}>
        {sortedCakes.map((cake) => (
          <div className="col-sm-6 col-md-4 mb-4" key={cake.id}>
            <CakeMenu cake={cake}/>
          </div>
        ))}
      </div>
    </div>
    )
}
export default CustomizedCake