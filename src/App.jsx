

// // src/App.jsx
// import React from 'react'; // No need for useState here anymore for cart/wishlist
// import { Routes, Route } from "react-router-dom"; // useNavigate will be used in components
// import Navbar from "./Components/Navbar.jsx";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Wishlist from "./pages/Wishlist";
// import Cart from "./pages/Cart";
// import Orders from "./pages/Orders";
// import AdminPanel from "./pages/AdminPanel";
// import ProductList from "./Components/ProductList";
// import ProductDetail from "./pages/ProductDetail";
// import PrivateRoute from "./Components/PrivateRoute";
// import { AppProvider, useApp } from './context/AppContext'; // Import AppProvider and useApp

// import 'bootstrap/dist/css/bootstrap.min.css';

// // Move mock product data outside App component or fetch it
// const MOCK_PRODUCTS = [
//   { id: 1, name: 'Vintage Camera', description: 'A classic analog camera, perfect for enthusiasts. Capture timeless moments with its unique film aesthetics.', price: 249.99, imageUrl: 'https://via.placeholder.com/400x300?text=Vintage+Camera' },
//   { id: 2, name: 'Wireless Headphones', description: 'Immersive sound experience with active noise cancellation. Enjoy your music without distractions, featuring long-lasting battery life.', price: 199.99, imageUrl: 'https://via.placeholder.com/400x300?text=Wireless+Headphones' },
//   { id: 3, name: 'Smartwatch Pro', description: 'Advanced fitness tracking, notifications, and sleek design. Monitor your health and stay connected on the go.', price: 299.99, imageUrl: 'https://via.placeholder.com/400x300?text=Smartwatch+Pro' },
//   { id: 4, name: 'Mechanical Keyboard', description: 'Durable and responsive keyboard with satisfying tactile feedback. Ideal for both gaming and professional typing.', price: 129.99, imageUrl: 'https://via.placeholder.com/400x300?text=Mechanical+Keyboard' },
//   { id: 5, name: 'Designer Backpack', description: 'Stylish and spacious, perfect for daily commutes or travel. Features multiple compartments and water-resistant material.', price: 79.99, imageUrl: 'https://via.placeholder.com/400x300?text=Designer+Backpack' },
//   { id: 6, name: 'Espresso Machine', description: 'Brew barista-quality espresso at home with ease. Comes with a milk frother for lattes and cappuccinos.', price: 399.99, imageUrl: 'https://via.placeholder.com/400x300?text=Espresso+Machine' },
// ];

// function AppContent() { // Renamed App to AppContent to use AppProvider outside
//   const { cart } = useApp(); // Get cart from context to pass to Navbar

//   return (
//     <>
//       <Navbar cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)} />
//       <div className="container mt-4">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />

//           {/* Product Routes - Pass MOCK_PRODUCTS directly */}
//           <Route path="/products" element={<ProductList products={MOCK_PRODUCTS} />} />
//           <Route
//             path="/product/:id"
//             element={<ProductDetail products={MOCK_PRODUCTS} />} // No need to pass addToCart here
//           />

//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute>
//                 <Dashboard /> {/* Dashboard will use useApp to get cart/wishlist */}
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/wishlist"
//             element={
//               <PrivateRoute>
//                 <Wishlist /> {/* Wishlist page will use useApp to get wishlist items */}
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/cart"
//             element={
//               <PrivateRoute>
//                 <Cart /> {/* Cart page will use useApp to get cart items and functions */}
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/orders"
//             element={
//               <PrivateRoute>
//                 <Orders />
//               </PrivateRoute>
//             }
//           />
//           <Route path="/admin" element={<AdminPanel />} />
//         </Routes>
//       </div>
//     </>
//   );
// }

// function App() {
//   return (
//     <AppProvider> {/* Wrap your entire application with the provider */}
//       <AppContent />
//     </AppProvider>
//   );
// }

// export default App;

// src/App.jsx
import React, { useRef } from 'react'; // Import useRef
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminPanel from "./pages/AdminPanel";
import ProductList from "./Components/ProductList";
import ProductDetail from "./pages/ProductDetail";
import PrivateRoute from "./Components/PrivateRoute";
import ToastNotification from "./Components/ToastNotification"; // Import ToastNotification
import { AppProvider, useApp } from './context/AppContext';

import 'bootstrap/dist/css/bootstrap.min.css';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Vintage Camera', description: 'A classic analog camera, perfect for enthusiasts. Capture timeless moments with its unique film aesthetics.', price: 249.99, imageUrl: 'https://via.placeholder.com/400x300?text=Vintage+Camera' },
  { id: 2, name: 'Wireless Headphones', description: 'Immersive sound experience with active noise cancellation. Enjoy your music without distractions, featuring long-lasting battery life.', price: 199.99, imageUrl: 'https://via.placeholder.com/400x300?text=Wireless+Headphones' },
  { id: 3, name: 'Smartwatch Pro', description: 'Advanced fitness tracking, notifications, and sleek design. Monitor your health and stay connected on the go.', price: 299.99, imageUrl: 'https://via.placeholder.com/400x300?text=Smartwatch+Pro' },
  { id: 4, name: 'Mechanical Keyboard', description: 'Durable and responsive keyboard with satisfying tactile feedback. Ideal for both gaming and professional typing.', price: 129.99, imageUrl: 'https://via.placeholder.com/400x300?text=Mechanical+Keyboard' },
  { id: 5, name: 'Designer Backpack', description: 'Stylish and spacious, perfect for daily commutes or travel. Features multiple compartments and water-resistant material.', price: 79.99, imageUrl: 'https://via.placeholder.com/400x300?text=Designer+Backpack' },
  { id: 6, name: 'Espresso Machine', description: 'Brew barista-quality espresso at home with ease. Comes with a milk frother for lattes and cappuccinos.', price: 399.99, imageUrl: 'https://via.placeholder.com/400x300?text=Espresso+Machine' },
];

function AppContent() {
  const { cart } = useApp();
  const toastRef = useRef(); // Create a ref for the toast

  return (
    <>
      <Navbar cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)} />
      <div className="container mt-4" style={{backgroundColor:"rgb(236, 222, 205)",padding:"10px",borderRadius:"8px"}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/products" element={<ProductList products={MOCK_PRODUCTS} toastRef={toastRef} />} /> {/* Pass toastRef */}
          <Route
            path="/product/:id"
            element={<ProductDetail products={MOCK_PRODUCTS} toastRef={toastRef} />} // Pass toastRef
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <PrivateRoute>
                <Wishlist />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
      <ToastNotification ref={toastRef} /> {/* Render the ToastNotification */}
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;