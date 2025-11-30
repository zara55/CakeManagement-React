import CakeMenu from "./CakeMenu";
import { useState } from "react";
function AnniversaryCake(){
    const [sortOption, setSortOption] = useState("");
  
   const cakes = [
  { 
    id: 1, 
    name: "Classic Red Velvet Romance", 
    price: "899", 
    rating: 4.5, 
    img: "/assets/anniversary/ac1.png", 
    desc: "A timeless red velvet cake with smooth cream cheese frosting, perfect for celebrating love and togetherness."
  },
  { 
    id: 2, 
    name: "Choco Bliss Anniversary", 
    price: "749", 
    rating: 4.8, 
    img: "/assets/anniversary/ac2.png", 
    desc: "Indulge in layers of rich chocolate sponge, topped with a velvety chocolate mousse – the ultimate sweet treat for your anniversary."
  },
  { 
    id: 3, 
    name: "Vanilla Elegance", 
    price: "650", 
    rating: 4.3, 
    img: "/assets/anniversary/ac3.png", 
    desc: "A soft, delicate vanilla cake with a light, fluffy texture, perfect for a sweet celebration of love and memories."
  },
  { 
    id: 4, 
    name: "Chocolate Teddy Bliss", 
    price: "699", 
    rating: 4.7, 
    img: "/assets/anniversary/ac4.png", 
    desc: "A charming chocolate cake filled with sweet teddy bear decoration, bringing a playful touch to your special day."
  },
  { 
    id: 5, 
    name: "Golden Love Fantasy", 
    price: "899", 
    rating: 4.4, 
    img: "/assets/anniversary/ac5.png", 
    desc: "A luxurious golden-themed cake adorned with delicate accents, perfect for celebrating a golden moment with your partner."
  },
  { 
    id: 6, 
    name: "Strawberry Sweetheart", 
    price: "750", 
    rating: 4.9, 
    img: "/assets/anniversary/ac6.png", 
    desc: "A fresh and fruity strawberry-flavored cake topped with creamy layers, making your anniversary even sweeter."
  },
];
 const sortedCakes = [...cakes].sort((a, b) => {
        if (sortOption === "priceAsc") return a.price - b.price;
        if (sortOption === "priceDesc") return b.price - a.price;
        if (sortOption === "ratingAsc") return a.rating - b.rating;
        if (sortOption === "ratingDesc") return b.rating - a.rating;
        return 0; // default, no sorting
    });
        // Actual code
    // const [liked,setLiked] = useState({});
    // const renderStars = (rating)=>{
    //     const fullStars = Math.floor(rating);
    //     const halfStar = rating - fullStars >=0.5;
    //     const stars =[];
    //     for(let i=0;i<fullStars;i++)
    //         stars.push(<i key={i} className="fas fa-star"></i>);
    //     if(halfStar)
    //         stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    //     return stars;
    // }
    // const toggleClick =(id)=>{
    //     setLiked(prev =>({ ...prev,[id]:!prev[id]}))
    // }

    return(
        <div className="container my-5">
            <h2 className="text-center mb-4 theme-title">🎂 Anniversary Cakes 🎉</h2>
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
                {sortedCakes.map((cake)=>(
                    <div className="col-sd-6 col-md-4 mb-4" key={cake.id}>
                         <CakeMenu cake={cake} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default AnniversaryCake