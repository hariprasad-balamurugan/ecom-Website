

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();
  const { cart, wishlist, orders } = useApp(); // Assuming 'orders' is also available from AppContext

  // Helper to get product details for cart/wishlist display if your context only stores IDs
  const getProductDetails = (item, allProducts) => {
    const product = allProducts.find(p => p.id === item.id);
    return product ? { ...product, quantity: item.quantity || 1 } : null;
  };

  // Assuming you have 'products' available globally or fetch them here for images
  // Replace with your actual products array from context/API
  const dummyProducts = [
    { id: 1, title: "Wireless Headphones", price: 120, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeZ4ir9_3fx7L8Ew2TUx3WanTGMfm2kUkPAA&s" },
    { id: 2, title: "Smart Watch", price: 85, image: "https://img.freepik.com/free-vector/smart-watch-realistic-image-black_1284-11873.jpg" },
    { id: 3, title: "Men's Cotton Shirt", price: 35, image: "https://www.punekarcotton.com/cdn/shop/products/light-orange-color-combed-cotton-shirts-for-men-783984.jpg?v=1671206408" },
    { id: 4, title: "Non-stick Frying Pan", price: 25, image: "https://m.media-amazon.com/images/I/51LbIlCt6XL.jpg" },
    { id: 5, title: "Leather Wallet", price: 50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-UHlyUSvLv5G0Npoe7ZOF83BIfvEW_cTXVA&s" },
    { id: 6, title: "LED Table Lamp", price: 40, image: "https://5.imimg.com/data5/SELLER/Default/2024/8/443791873/BC/MY/EL/89778672/led-table-lamp-500x500.jpg" },
    { id: 7, title: "Women's Handbag", price: 90, image: "https://www.lavieworld.com/cdn/shop/files/HPGH1465135M4_1.jpg?v=1756507201" },
    { id: 8, title: "Gaming Keyboard", price: 60, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ElkWrl6RAUl_wdLxx25XZmv3FtGR9Ko-sw&s" }
  ];

  const cartWithDetails = cart.map(item => getProductDetails(item, dummyProducts)).filter(Boolean);
  const wishlistWithDetails = wishlist.map(item => getProductDetails(item, dummyProducts)).filter(Boolean);

  const pendingOrders = orders.filter(order => order.status === "On Process" || order.status === "Shipped");

  return (
    <div className="container mt-5" style={{ backgroundColor: '#fdf9f3', padding: '30px', borderRadius: '10px', boxShadow: '0 0 15px rgba(0,0,0,0.05)' }}>
      <h2 className="mb-4" style={{ fontFamily: 'Georgia, serif', color: '#343a40', textAlign: 'center' }}>
        Welcome to Your Dashboard, {user?.name || 'User'}!
      </h2>

      <div className="row">
        {/* Your Current Cart */}
        <div className="col-md-6">
          <div className="card mb-4 shadow-sm" style={{ border: '1px solid #e0d9cf', borderRadius: '8px', backgroundColor: '#ffffff' }}>
            <div className="card-body">
              <h5 className="card-title" style={{ color: "black", borderBottom: '1px solid #e9ecef', paddingBottom: '10px', marginBottom: '15px' }}>
                Your Current Cart ({cartWithDetails.reduce((total, item) => total + item.quantity, 0)} items)
              </h5>
              {cartWithDetails.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {cartWithDetails.slice(0, 3).map(item => (
                    <li key={item.id} className="list-group-item d-flex align-items-center py-2" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #f0f0f0' }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', marginRight: '15px' }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-0" style={{ color: '#495057' }}>{item.title}</h6>
                        <small className="text-muted">Price: ${item.price} | Quantity: {item.quantity}</small>
                      </div>
                      <span className="badge rounded-pill"  style={{backgroundColor:"rgb(32, 126, 174)"}}>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                  {cartWithDetails.length > 3 && (
                    <li className="list-group-item text-center" style={{ backgroundColor: '#ffffff', fontStyle: 'italic', color: '#6c757d' }}>
                      ...and {cartWithDetails.length - 3} more items
                    </li>
                  )}
                  <li className="list-group-item text-end pt-3" style={{ backgroundColor: '#ffffff' }}>
                    <Link to="/cart" className="btn btn-success btn-sm" style={{backgroundColor:"rgba(132, 100, 61, 1)",border:"none"}}>
                      Go to Cart
                    </Link>
                  </li>
                </ul>
              ) : (
                <p className="text-center text-muted" style={{ color: '#6c757d' }}>Your cart is empty. Start <Link to="/products" style={{ color: '#6a0dad', textDecoration: 'none' }}>shopping</Link> now!</p>
              )}
            </div>
          </div>
        </div>

        {/* Your Wishlist */}
        <div className="col-md-6">
          <div className="card mb-4 shadow-sm" style={{ border: '1px solid #e0d9cf', borderRadius: '8px', backgroundColor: '#ffffff' }}>
            <div className="card-body">
              <h5 className="card-title" style={{ color: 'black', borderBottom: '1px solid #e9ecef', paddingBottom: '10px', marginBottom: '15px' }}>
                Your Wishlist ({wishlistWithDetails.length} items)
              </h5>
              {wishlistWithDetails.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {wishlistWithDetails.slice(0, 3).map(item => (
                    <li key={item.id} className="list-group-item d-flex align-items-center py-2" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #f0f0f0' }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', marginRight: '15px' }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-0" style={{ color: '#495057' }}>{item.title}</h6>
                        <small className="text-muted">Price: ${item.price}</small>
                      </div>
                      <span className="badge bg-success rounded-pill" style={{ backgroundColor: '#28a745 !important' }}>In Wishlist</span>
                    </li>
                  ))}
                  {wishlistWithDetails.length > 3 && (
                    <li className="list-group-item text-center" style={{ backgroundColor: '#ffffff', fontStyle: 'italic', color: '#6c757d' }}>
                      ...and {wishlistWithDetails.length - 3} more items
                    </li>
                  )}
                  <li className="list-group-item text-end pt-3" style={{ backgroundColor: '#ffffff' }}>
                    <Link to="/wishlist" className="btn btn-primary btn-sm" style={{backgroundColor:"rgba(132, 100, 61, 1)",border:"none"}}>
                      Go to Wishlist
                    </Link>
                  </li>
                </ul>
              ) : (
                <p className="text-center text-muted" style={{ color: '#6c757d' }}>Your wishlist is empty. Explore <Link to="/products" style={{ color: "black", textDecoration: 'none' }}>products</Link> to add some!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Your Orders */}
      <div className="card mt-4 shadow-sm" style={{ border: '1px solid #e0d9cf', borderRadius: '8px', backgroundColor: '#ffffff' }}>
        <div className="card-body">
          <h5 className="card-title" style={{ color: "black", borderBottom: '1px solid #e9ecef', paddingBottom: '10px', marginBottom: '15px' }}>
            Your Orders ({pendingOrders.length} Pending)
          </h5>
          {pendingOrders.length > 0 ? (
            <ul className="list-group list-group-flush">
              {pendingOrders.slice(0, 3).map(order => (
                <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center py-2" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #f0f0f0' }}>
                  <div>
                    <h6 className="mb-0" style={{ color: '#495057' }}>Order #{order.id}</h6>
                    <small className="text-muted">{order.items.length} items - Total: ${order.total?.toFixed(2) || 'N/A'}</small>
                  </div>
                  <span className={`badge ${order.status === 'On Process' ? 'bg-warning' : 'bg-secondary'}`} style={{ backgroundColor: order.status === 'On Process' ? '#ffc107 !important' : '#6c757d !important', color: '#343a40' }}>
                    {order.status}
                  </span>
                </li>
              ))}
              {pendingOrders.length > 3 && (
                <li className="list-group-item text-center" style={{ backgroundColor: '#ffffff', fontStyle: 'italic', color: '#6c757d' }}>
                  ...and {pendingOrders.length - 3} more orders
                </li>
              )}
              <li className="list-group-item text-end pt-3" style={{ backgroundColor: '#ffffff' }}>
                <Link to="/orders" className="btn btn-primary" style={{backgroundColor:"rgba(132, 100, 61, 1)"}}>
                  View All Orders
                </Link>
              </li>
            </ul>
          ) : (
            <p className="text-center text-muted" style={{ color: '#6c757d' }}>You have no pending orders. Browse our <Link to="/products" style={{ color: 'black', textDecoration: 'none' }}>products</Link>!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// Dashboard.js
// import React from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useApp } from '../context/AppContext';
// import { Link } from 'react-router-dom';

// function Dashboard() {
//   const { user } = useAuth();
//   // Destructure loadingOrders and errorOrders
//   const { cart, wishlist, orders, loadingOrders, errorOrders } = useApp();

//   // Helper to get product details for cart/wishlist display if your context only stores IDs
//   const getProductDetails = (item, allProducts) => {
//     const product = allProducts.find(p => p.id === item.id);
//     return product ? { ...product, quantity: item.quantity || 1 } : null;
//   };

//   // Assuming you have 'products' available globally or fetch them here for images
//   // Replace with your actual products array from context/API
//   const dummyProducts = [
//     { id: 1, title: "Wireless Headphones", price: 120, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeZ4ir9_3fx7L8Ew2TUx3WanTGMfm2kUkPAA&s" },
//     { id: 2, title: "Smart Watch", price: 85, image: "https://img.freepik.com/free-vector/smart-watch-realistic-image-black_1284-11873.jpg" },
//     { id: 3, title: "Men's Cotton Shirt", price: 35, image: "https://www.punekarcotton.com/cdn/shop/products/light-orange-color-combed-cotton-shirts-for-men-783984.jpg?v=1671206408" },
//     { id: 4, title: "Non-stick Frying Pan", price: 25, image: "https://m.media-amazon.com/images/I/51LbIlCt6XL.jpg" },
//     { id: 5, title: "Leather Wallet", price: 50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-UHlyUSvLv5G0Npoe7ZOF83BIfvEW_cTXVA&s" },
//     { id: 6, title: "LED Table Lamp", price: 40, image: "https://5.imimg.com/data5/SELLER/Default/2024/8/443791873/BC/MY/EL/89778672/led-table-lamp-500x500.jpg" },
//     { id: 7, title: "Women's Handbag", price: 90, image: "https://www.lavieworld.com/cdn/shop/files/HPGH1465135M4_1.jpg?v=1756507201" },
//     { id: 8, title: "Gaming Keyboard", price: 60, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ElkWrl6RAUl_wdLxx25XZmv3FtGR9Ko-sw&s" }
//   ];

//   const cartWithDetails = cart.map(item => getProductDetails(item, dummyProducts)).filter(Boolean);
//   const wishlistWithDetails = wishlist.map(item => getProductDetails(item, dummyProducts)).filter(Boolean);

//   // If orders are loading, display a message
//   if (loadingOrders) {
//     return (
//       <div className="container mt-5 text-center">
//         <p>Loading your orders...</p>
//         {/* You can add a spinner here */}
//       </div>
//     );
//   }

//   // If there was an error fetching orders, display an error message
//   if (errorOrders) {
//     return (
//       <div className="container mt-5 text-center alert alert-danger">
//         <p>Error loading orders: {errorOrders}</p>
//         <p>Please try again later or contact support.</p>
//       </div>
//     );
//   }

//   const pendingOrders = orders.filter(order => order.status === "On Process" || order.status === "Shipped");

//   return (
//     <div className="container mt-5" style={{ backgroundColor: '#fdf9f3', padding: '30px', borderRadius: '10px', boxShadow: '0 0 15px rgba(0,0,0,0.05)' }}>
//       <h2 className="mb-4" style={{ fontFamily: 'Georgia, serif', color: '#343a40', textAlign: 'center' }}>
//         Welcome to Your Dashboard, {user?.name || 'User'}!
//       </h2>

//       <div className="row">
//         {/* Your Current Cart */}
//         <div className="col-md-6">
//           <div className="card mb-4 shadow-sm" style={{ border: '1px solid #e0d9cf', borderRadius: '8px', backgroundColor: '#ffffff' }}>
//             <div className="card-body">
//               <h5 className="card-title" style={{ color: "black", borderBottom: '1px solid #e9ecef', paddingBottom: '10px', marginBottom: '15px' }}>
//                 Your Current Cart ({cartWithDetails.reduce((total, item) => total + item.quantity, 0)} items)
//               </h5>
//               {cartWithDetails.length > 0 ? (
//                 <ul className="list-group list-group-flush">
//                   {cartWithDetails.slice(0, 3).map(item => (
//                     <li key={item.id} className="list-group-item d-flex align-items-center py-2" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #f0f0f0' }}>
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', marginRight: '15px' }}
//                       />
//                       <div className="flex-grow-1">
//                         <h6 className="mb-0" style={{ color: '#495057' }}>{item.title}</h6>
//                         <small className="text-muted">Price: ${item.price} | Quantity: {item.quantity}</small>
//                       </div>
//                       <span className="badge rounded-pill"  style={{backgroundColor:"rgb(32, 126, 174)"}}>${(item.price * item.quantity).toFixed(2)}</span>
//                     </li>
//                   ))}
//                   {cartWithDetails.length > 3 && (
//                     <li className="list-group-item text-center" style={{ backgroundColor: '#ffffff', fontStyle: 'italic', color: '#6c757d' }}>
//                       ...and {cartWithDetails.length - 3} more items
//                     </li>
//                   )}
//                   <li className="list-group-item text-end pt-3" style={{ backgroundColor: '#ffffff' }}>
//                     <Link to="/cart" className="btn btn-success btn-sm" style={{backgroundColor:"rgba(132, 100, 61, 1)",border:"none"}}>
//                       Go to Cart
//                     </Link>
//                   </li>
//                 </ul>
//               ) : (
//                 <p className="text-center text-muted" style={{ color: '#6c757d' }}>Your cart is empty. Start <Link to="/products" style={{ color: '#6a0dad', textDecoration: 'none' }}>shopping</Link> now!</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Your Wishlist */}
//         <div className="col-md-6">
//           <div className="card mb-4 shadow-sm" style={{ border: '1px solid #e0d9cf', borderRadius: '8px', backgroundColor: '#ffffff' }}>
//             <div className="card-body">
//               <h5 className="card-title" style={{ color: 'black', borderBottom: '1px solid #e9ecef', paddingBottom: '10px', marginBottom: '15px' }}>
//                 Your Wishlist ({wishlistWithDetails.length} items)
//               </h5>
//               {wishlistWithDetails.length > 0 ? (
//                 <ul className="list-group list-group-flush">
//                   {wishlistWithDetails.slice(0, 3).map(item => (
//                     <li key={item.id} className="list-group-item d-flex align-items-center py-2" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #f0f0f0' }}>
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', marginRight: '15px' }}
//                       />
//                       <div className="flex-grow-1">
//                         <h6 className="mb-0" style={{ color: '#495057' }}>{item.title}</h6>
//                         <small className="text-muted">Price: ${item.price}</small>
//                       </div>
//                       <span className="badge bg-success rounded-pill" style={{ backgroundColor: '#28a745 !important' }}>In Wishlist</span>
//                     </li>
//                   ))}
//                   {wishlistWithDetails.length > 3 && (
//                     <li className="list-group-item text-center" style={{ backgroundColor: '#ffffff', fontStyle: 'italic', color: '#6c757d' }}>
//                       ...and {wishlistWithDetails.length - 3} more items
//                     </li>
//                   )}
//                   <li className="list-group-item text-end pt-3" style={{ backgroundColor: '#ffffff' }}>
//                     <Link to="/wishlist" className="btn btn-primary btn-sm" style={{backgroundColor:"rgba(132, 100, 61, 1)",border:"none"}}>
//                       Go to Wishlist
//                     </Link>
//                   </li>
//                 </ul>
//               ) : (
//                 <p className="text-center text-muted" style={{ color: '#6c757d' }}>Your wishlist is empty. Explore <Link to="/products" style={{ color: "black", textDecoration: 'none' }}>products</Link> to add some!</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Your Orders */}
//       <div className="card mt-4 shadow-sm" style={{ border: '1px solid #e0d9cf', borderRadius: '8px', backgroundColor: '#ffffff' }}>
//         <div className="card-body">
//           <h5 className="card-title" style={{ color: "black", borderBottom: '1px solid #e9ecef', paddingBottom: '10px', marginBottom: '15px' }}>
//             Your Orders ({pendingOrders.length} Pending)
//           </h5>
//           {pendingOrders.length > 0 ? (
//             <ul className="list-group list-group-flush">
//               {pendingOrders.slice(0, 3).map(order => (
//                 <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center py-2" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #f0f0f0' }}>
//                   <div>
//                     <h6 className="mb-0" style={{ color: '#495057' }}>Order #{order.id}</h6>
//                     <small className="text-muted">{order.items.length} items - Total: ${order.total?.toFixed(2) || 'N/A'}</small>
//                   </div>
//                   <span className={`badge ${order.status === 'On Process' ? 'bg-warning' : 'bg-secondary'}`} style={{ backgroundColor: order.status === 'On Process' ? '#ffc107 !important' : '#6c757d !important', color: '#343a40' }}>
//                     {order.status}
//                   </span>
//                 </li>
//               ))}
//               {pendingOrders.length > 3 && (
//                 <li className="list-group-item text-center" style={{ backgroundColor: '#ffffff', fontStyle: 'italic', color: '#6c757d' }}>
//                   ...and {pendingOrders.length - 3} more orders
//                 </li>
//               )}
//               <li className="list-group-item text-end pt-3" style={{ backgroundColor: '#ffffff' }}>
//                 <Link to="/orders" className="btn btn-primary" style={{backgroundColor:"rgba(132, 100, 61, 1)"}}>
//                   View All Orders
//                 </Link>
//               </li>
//             </ul>
//           ) : (
//             <p className="text-center text-muted" style={{ color: '#6c757d' }}>You have no pending orders. Browse our <Link to="/products" style={{ color: 'black', textDecoration: 'none' }}>products</Link>!</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;