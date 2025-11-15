import CakeMenu from "./CakeMenu";
function CoupleCake(){
const cakes = [
  { 
    id: 1, 
    name: "Forever Yours", 
    price: "₹899", 
    rating: 4.5, 
    img: "/assets/couple/couple1.png",
    desc: "A romantic cake for the lovebirds, perfect to celebrate your togetherness and special moments."
  },
  { 
    id: 2, 
    name: "Sweet Togetherness", 
    price: "₹749", 
    rating: 4.8, 
    img: "/assets/couple/couple2.png",
    desc: "Share the sweetness of life with this delicious couple-themed chocolate cake."
  },
  { 
    id: 3, 
    name: "Love Pinata", 
    price: "₹650", 
    rating: 4.3, 
    img: "/assets/couple/couple3.png",
    desc: "A fun surprise inside! Perfect for couples who enjoy playful and joyful celebrations."
  },
  { 
    id: 4, 
    name: "Hug & Chocolate", 
    price: "₹699", 
    rating: 4.7, 
    img: "/assets/couple/couple4.png",
    desc: "Chocolate cake with a cute couple design — because every hug deserves a sweet treat."
  },
  { 
    id: 5, 
    name: "Golden Romance", 
    price: "₹899", 
    rating: 4.4, 
    img: "/assets/couple/couple5.png",
    desc: "Celebrate love with a stunning golden-themed cake — a magical moment for couples."
  },
];


    return(
        <div className="container my-5">
      <h2 className="text-center mb-4 theme-title">🎂 Themed Cakes 🎉</h2>
      <div className="row justify-content-center">
        {cakes.map((cake) => (
          <div className="col-sm-6 col-md-4 mb-4" key={cake.id}>
            <CakeMenu cake={cake}/>
          </div>
        ))}
      </div>
    </div>
    )
}
export default CoupleCake