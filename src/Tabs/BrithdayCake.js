import CakeMenu from "./CakeMenu";
function BrithdayCake(){
    const cakes = [
  { 
    id: 1, 
    name: "Black Forest Bliss", 
    price: "₹899", 
    rating: 4.5, 
    img: "/assets/brithday/blackForest.png", 
    desc: "Indulge in the rich layers of chocolate sponge, whipped cream, and cherries. A perfect combination for your sweet tooth."
  },
  { 
    id: 2, 
    name: "Choco Truffle Fantasy", 
    price: "₹749", 
    rating: 4.8, 
    img: "/assets/brithday/chocolate.png", 
    desc: "A dream come true for chocolate lovers! Smooth chocolate truffle filling wrapped in a decadent chocolate cake."
  },
  { 
    id: 3, 
    name: "Vanilla Pinata Surprise", 
    price: "₹650", 
    rating: 4.3, 
    img: "/assets/brithday/fruit.png", 
    desc: "A soft and fluffy vanilla cake filled with a delightful surprise inside – perfect for every celebration!"
  },
  { 
    id: 4, 
    name: "Butterscotch Delight", 
    price: "₹699", 
    rating: 4.7, 
    img: "/assets/brithday/fudge.png", 
    desc: "A rich and creamy butterscotch cake with caramelized nuts, bringing a unique flavor to your taste buds."
  },
  { 
    id: 5, 
    name: "Pista Magic", 
    price: "₹899", 
    rating: 4.4, 
    img: "/assets/brithday/pista.png", 
    desc: "A delicious pista-flavored cake with creamy layers, perfect for those who love a nutty and aromatic touch."
  },
  { 
    id: 6, 
    name: "Strawberry Dream", 
    price: "₹750", 
    rating: 4.9, 
    img: "/assets/brithday/strawberry.png", 
    desc: "Sweet, fresh strawberries blend perfectly with the soft sponge cake, creating a dreamy, refreshing experience."
  },
  { 
    id: 7, 
    name: "Christmas Truffle Cake", 
    price: "₹670", 
    rating: 4.0, 
    img: "/assets/brithday/truffle.png", 
    desc: "A luxurious, festive chocolate truffle cake with rich flavors and a velvety smooth texture, perfect for the holidays."
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
export default BrithdayCake