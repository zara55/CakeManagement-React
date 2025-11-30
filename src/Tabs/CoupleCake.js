import CakeMenu from "./CakeMenu";
import { useState } from "react";
function CoupleCake(){
    const [sortOption, setSortOption] = useState("");
  
const cakes = [
  { 
    id: 1, 
    name: "Forever Yours", 
    price: "899", 
    rating: 4.5, 
    img: "/assets/couple/couple1.png",
    desc: "A romantic cake for the lovebirds, perfect to celebrate your togetherness and special moments."
  },
  { 
    id: 2, 
    name: "Sweet Togetherness", 
    price: "749", 
    rating: 4.8, 
    img: "/assets/couple/couple2.png",
    desc: "Share the sweetness of life with this delicious couple-themed chocolate cake."
  },
  { 
    id: 3, 
    name: "Love Pinata", 
    price: "650", 
    rating: 4.3, 
    img: "/assets/couple/couple3.png",
    desc: "A fun surprise inside! Perfect for couples who enjoy playful and joyful celebrations."
  },
  { 
    id: 4, 
    name: "Hug & Chocolate", 
    price: "699", 
    rating: 4.7, 
    img: "/assets/couple/couple4.png",
    desc: "Chocolate cake with a cute couple design — because every hug deserves a sweet treat."
  },
  { 
    id: 5, 
    name: "Golden Romance", 
    price: "899", 
    rating: 4.4, 
    img: "/assets/couple/couple5.png",
    desc: "Celebrate love with a stunning golden-themed cake — a magical moment for couples."
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
      <h2 className="text-center mb-4 theme-title">🎂 Couple Cakes 🎉</h2>
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
export default CoupleCake