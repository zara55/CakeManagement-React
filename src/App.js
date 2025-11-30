import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CarouselComponent from './components/Carousel';
import BrithdayCake from './Tabs/BrithdayCake';
import AnniversaryCake from './Tabs/AnniversaryCake';
import CoupleCake from './Tabs/CoupleCake';
import './App.css';
import ThemeCake from './Tabs/ThemeCake';
import CustomizedCake from './Tabs/CustomizedCake';
import CakeDetail from './Tabs/CakeDetail';
import Login from './auth/login';
import Signup from './auth/signup';
import PaymentSection from './cart/PaymentSection';
import TrackOrder from './cart/TrackOrder';
import Cart from './cart/Cart';
import { CartProvider } from './cart/CartContext';
import OrderHistory from './components/OrderHistory';
import ForgotPassword from './auth/forgotPassword';
function App() {
  return (
  // <Router>
  //     <Routes>
  //       <Route path="/*" element={<Content />} />  {/* Handles tabs */}
  //       <Route path="/cake/:id" element={<CakeDetail />} />  {/* Dynamic cake page */}
  //     </Routes>
  //   </Router>
      <CartProvider>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CarouselComponent />} />
          <Route path="birthday" element={<BrithdayCake />} />
          <Route path="theme" element={<ThemeCake />} />
          <Route path="anniversary" element={<AnniversaryCake />} />
           <Route path="couple" element={<CoupleCake />} />
            <Route path="customized" element={<CustomizedCake />} />
            <Route path="cake/:id" element={<CakeDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="track-order" element={<TrackOrder />} />
            <Route path='payment' element={<PaymentSection />} />
             <Route path='order-history' element={<OrderHistory />} />
           
            <Route path="*" element={<h2 style={{padding:"20px"}}>Page Not Found</h2>} />
        </Route>
           <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
