import CakeMenu from "./CakeMenu";

function ThemeCake() {
//   const [liked, setLiked] = useState({}); // store heart state per cake

  const cakes = [
    { id: 1, name: "Classic Theme Space Delight", price: "₹899", rating: 4.5, img: "/assets/theme/space.png" ,desc:"A delightful space-themed cake adorned with edible stars, planets, and a rocket ship topper. Perfect for aspiring astronauts and space enthusiasts."},
    { id: 2, name: "Choco Theme Soccer", price: "₹749", rating: 4.8, img: "/assets/theme/soccer.png" ,desc:"A chocolate lover's dream, this soccer-themed cake features a rich chocolate base decorated with edible soccer balls, goalposts, and green icing to mimic a soccer field."},
    { id: 3, name: "Vanilla Theme Pinata Burst", price: "₹650", rating: 4.3, img: "/assets/theme/pinata.png", desc:"A fun and festive vanilla cake designed to look like a colorful piñata. Filled with candy and sprinkles, this cake is sure to bring joy to any celebration."},
    { id: 4, name: "Chocolate Theme Teddy Cream", price: "₹699", rating: 4.7, img: "/assets/theme/teddy.png" ,desc:"A charming chocolate cake featuring an adorable teddy bear made of creamy frosting. Perfect for kids' birthdays and baby showers."},
    { id: 5, name: "Golden Theme Unicorn Fantasy", price: "₹899", rating: 4.4, img: "/assets/theme/unicorn.png" ,desc:"A magical golden cake adorned with a unicorn topper, rainbow sprinkles, and edible glitter. A whimsical treat for those who believe in fairy tales."},
    { id: 6, name: "Strawberry Flavor Cocomelon", price: "₹750", rating: 4.9, img: "/assets/theme/cocomelan.png",desc:"A delightful strawberry-flavored cake inspired by the beloved Cocomelon character. Decorated with vibrant colors and playful designs, it's perfect for young fans."},
    { id: 7, name: "Vannila Flavor Christmas", price: "₹670", rating: 4.0, img: "/assets/theme/christmas.png" ,desc:"A festive vanilla cake celebrating the holiday season. Decorated with Christmas-themed icing, edible ornaments, and a touch of holiday cheer."},
    { id: 8, name: "Delight Cartoon Cake", price: "₹900", rating: 4.2, img: "/assets/theme/cartoon.png" ,desc:"A vibrant cartoon-themed cake featuring popular animated characters. Perfect for kids' parties, this cake is sure to bring smiles and laughter to the celebration."},
  ];

//   // Render stars with full and half
//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const halfStar = rating - fullStars >= 0.5;
//     const stars = [];
//     for (let i = 0; i < fullStars; i++) stars.push(<i key={i} className="fas fa-star"></i>);
//     if (halfStar) stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
//     return stars;
//   };

//   const toggleHeart = (id) => {
//     setLiked(prev => ({ ...prev, [id]: !prev[id] }));
//   };

  return (
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
  );
};


export default ThemeCake;
