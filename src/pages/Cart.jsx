
// // // src/pages/Cart.jsx (Revised, based on your working code)
// // import React from 'react';
// // import { useApp } from '../context/AppContext';
// // import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate and Link

// // function Cart() {
// //   const { cart, removeFromCart, updateCartQuantity } = useApp();
// //   const navigate = useNavigate(); // Initialize useNavigate

// //   const calculateTotal = () => {
// //     return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
// //   };

// //   const handleProceedToCheckout = () => {
// //     if (cart.length === 0) {
// //       alert("Your cart is empty. Please add items before proceeding to checkout.");
// //       return;
// //     }
// //     // Navigate to the dedicated checkout page
// //     navigate('/checkout');
// //   };

// //   if (cart.length === 0) {
// //     return (
// //       <div className="container mt-5 text-center">
// //         <h2 className="mb-4">Your Cart is Empty</h2>
// //         <p>Looks like you haven't added anything to your cart yet. Go to <Link to="/products">products</Link> to start shopping!</p> {/* Use Link */}
// //         <div className="mt-4">
// //           {/* If you had other content here, keep it */}
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mt-5">
// //       <h2 className="mb-4">Your Shopping Cart</h2>
// //       <div className="row">
// //         <div className="col-md-8">
// //           {cart.map((item) => (
// //             <div key={item.id} className="card mb-3">
// //               <div className="card-body d-flex align-items-center">
// //                 <img src={item.imageUrl} alt={item.name} className="img-thumbnail me-3" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
// //                 <div>
// //                   <h5 className="card-title">{item.name}</h5>
// //                   <p className="card-text text-muted mb-2" style={{ fontSize: '0.9em' }}>
// //                     {item.description}
// //                   </p>
// //                   <p className="card-text">${item.price.toFixed(2)} x {item.quantity}</p>
// //                   <div className="d-flex align-items-center">
// //                     <button
// //                       className="btn btn-outline-secondary btn-sm me-2"
// //                       onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
// //                       disabled={item.quantity <= 1}
// //                     >
// //                       -
// //                     </button>
// //                     <span className="me-2">{item.quantity}</span>
// //                     <button
// //                       className="btn btn-outline-secondary btn-sm"
// //                       onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
// //                     >
// //                       +
// //                     </button>
// //                     <button
// //                       className="btn btn-danger btn-sm ms-3"
// //                       onClick={() => removeFromCart(item.id)}
// //                     >
// //                       Remove
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //         <div className="col-md-4">
// //           <div className="card">
// //             <div className="card-body">
// //               <h5 className="card-title">Order Summary</h5>
// //               <ul className="list-group list-group-flush">
// //                 <li className="list-group-item d-flex justify-content-between align-items-center">
// //                   Subtotal
// //                   <span>${calculateTotal()}</span>
// //                 </li>
// //                 <li className="list-group-item d-flex justify-content-between align-items-center font-weight-bold">
// //                   Total
// //                   <span>${calculateTotal()}</span>
// //                 </li>
// //               </ul>
// //               {/* This button now navigates to the new Checkout page */}
// //               <button
// //                 className="btn btn-success btn-block mt-3"
// //                 onClick={handleProceedToCheckout}
// //               >
// //                 Proceed to Checkout
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Cart;

// import React, { useState, useEffect } from 'react';
// import { useApp } from '../context/AppContext';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// function Cart() {
//   const { cart, removeFromCart, updateCartQuantity } = useApp();
//   const { user } = useAuth();
//   const navigate = useNavigate();
  
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch user addresses
//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         // Fetch addresses for the logged-in user
//         const userId = user?.id || 1; // Fallback to user ID 1 for testing
//         const response = await fetch(`http://localhost:3001/addresses?userId=${userId}`);
//         const data = await response.json();
//         setAddresses(data);
        
//         // Auto-select first address if available
//         if (data.length > 0) {
//           setSelectedAddressId(data[0].id);
//         }
//       } catch (error) {
//         console.error("Error fetching addresses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAddresses();
//   }, [user]);

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
//   };

//   const handleAddressSelect = (addressId) => {
//     setSelectedAddressId(addressId);
//   };

//   const handleProceedToCheckout = async () => {
//     if (cart.length === 0) {
//       alert("Your cart is empty. Please add items before proceeding to checkout.");
//       return;
//     }

//     if (!selectedAddressId) {
//       alert("Please select a delivery address before proceeding.");
//       return;
//     }

//     const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
    
//     if (!selectedAddress) {
//       alert("Invalid address selected. Please try again.");
//       return;
//     }

//     // Format address string
//     const fullAddress = `${selectedAddress.addressLine1}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.zip}`;

//     // Create order object
//     const orderData = {
//       userId: user?.id || 1,
//       userName: user?.name || selectedAddress.name || "Guest User",
//       items: cart.map(item => ({
//         id: item.id,
//         title: item.name,
//         price: item.price,
//         quantity: item.quantity
//       })),
//       total: parseFloat(calculateTotal()),
//       address: fullAddress,
//       addressId: selectedAddressId,
//       addressName: selectedAddress.name,
//       status: "On Process",
//       orderDate: new Date().toISOString()
//     };

//     try {
//       // Post order to database
//       const response = await fetch('http://localhost:3001/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(orderData)
//       });

//       if (response.ok) {
//         const createdOrder = await response.json();
//         alert(`Order #${createdOrder.id} placed successfully!\nDelivering to: ${fullAddress}`);
        
//         // Clear cart (you may need to add this function to your AppContext)
//         // clearCart();
        
//         // Navigate to orders page
//         navigate('/orders');
//       } else {
//         throw new Error('Failed to create order');
//       }
//     } catch (error) {
//       console.error("Error creating order:", error);
//       alert("Failed to place order. Please ensure json-server is running and try again.");
//     }
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="container mt-5 text-center">
//         <h2 className="mb-4">Your Cart is Empty</h2>
//         <p>Looks like you haven't added anything to your cart yet. Go to <Link to="/products">products</Link> to start shopping!</p>
//         <div className="mt-4"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Your Shopping Cart</h2>
//       <div className="row">
//         <div className="col-md-8">
//           {cart.map((item) => (
//             <div key={item.id} className="card mb-3">
//               <div className="card-body d-flex align-items-center">
//                 <img 
//                   src={item.imageUrl || item.image} 
//                   alt={item.name || item.title} 
//                   className="img-thumbnail me-3" 
//                   style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
//                 />
//                 <div className="flex-grow-1">
//                   <h5 className="card-title">{item.name || item.title}</h5>
//                   <p className="card-text text-muted mb-2" style={{ fontSize: '0.9em' }}>
//                     {item.description}
//                   </p>
//                   <p className="card-text">${item.price.toFixed(2)} x {item.quantity}</p>
//                   <div className="d-flex align-items-center">
//                     <button
//                       className="btn btn-outline-secondary btn-sm me-2"
//                       onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
//                       disabled={item.quantity <= 1}
//                     >
//                       -
//                     </button>
//                     <span className="me-2">{item.quantity}</span>
//                     <button
//                       className="btn btn-outline-secondary btn-sm"
//                       onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
//                     >
//                       +
//                     </button>
//                     <button
//                       className="btn btn-danger btn-sm ms-3"
//                       onClick={() => removeFromCart(item.id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         <div className="col-md-4">
//           <div className="card">
//             <div className="card-body">
//               <h5 className="card-title mb-3">Order Summary</h5>
              
//               <ul className="list-group list-group-flush mb-3">
//                 <li className="list-group-item d-flex justify-content-between align-items-center">
//                   Subtotal
//                   <span>${calculateTotal()}</span>
//                 </li>
//                 <li className="list-group-item d-flex justify-content-between align-items-center">
//                   <strong>Total</strong>
//                   <strong>${calculateTotal()}</strong>
//                 </li>
//               </ul>

//               {/* Delivery Address Selection */}
//               <div className="mb-3">
//                 <h6 className="mb-3">Select Delivery Address</h6>
//                 {loading ? (
//                   <div className="text-center py-3">
//                     <div className="spinner-border spinner-border-sm" role="status">
//                       <span className="visually-hidden">Loading addresses...</span>
//                     </div>
//                   </div>
//                 ) : addresses.length === 0 ? (
//                   <div className="alert alert-warning py-2" role="alert" style={{ fontSize: '0.9em' }}>
//                     No saved addresses found. Please add an address in your profile.
//                   </div>
//                 ) : (
//                   <div className="border rounded" style={{ maxHeight: '300px', overflowY: 'auto' }}>
//                     {addresses.map((address) => (
//                       <label 
//                         key={address.id} 
//                         className={`d-block p-3 border-bottom ${selectedAddressId === address.id ? 'bg-light' : ''}`}
//                         style={{ cursor: 'pointer' }}
//                       >
//                         <div className="d-flex align-items-start">
//                           <input
//                             type="radio"
//                             className="form-check-input me-3 mt-1"
//                             name="addressSelection"
//                             checked={selectedAddressId === address.id}
//                             onChange={() => handleAddressSelect(address.id)}
//                             style={{ cursor: 'pointer' }}
//                           />
//                           <div className="flex-grow-1">
//                             <strong className="d-block mb-1">{address.name}</strong>
//                             <small className="d-block text-muted">{address.addressLine1}</small>
//                             <small className="d-block text-muted">
//                               {address.city}, {address.state} {address.zip}
//                             </small>
//                           </div>
//                         </div>
//                       </label>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <button
//                 className="btn btn-success w-100 mt-3"
//                 onClick={handleProceedToCheckout}
//                 disabled={!selectedAddressId || addresses.length === 0}
//               >
//                 {selectedAddressId ? 'Proceed to Checkout' : 'Select Address to Continue'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Cart() {
  const { cart, removeFromCart, updateCartQuantity } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // For testing: Use userId 1 which exists in your db.json
        // In production, you would map Firebase UID to your database user ID
        // or update your database to use Firebase UIDs
        const userId = 1; // Hardcoded for testing with your current db.json
        
        console.log('Fetching addresses for userId:', userId); // Debug log
        console.log('Current user:', user); // Debug: show actual user object
        
        const response = await fetch(`http://localhost:5001/addresses?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch addresses');
        }
        
        const data = await response.json();
        console.log('Fetched addresses:', data); // Debug log
        
        setAddresses(data);
        
        // Auto-select first address if available
        if (data.length > 0) {
          setSelectedAddressId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [user]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const handleProceedToCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before proceeding to checkout.");
      return;
    }

    if (!selectedAddressId) {
      alert("Please select a delivery address before proceeding.");
      return;
    }

    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
    
    if (!selectedAddress) {
      alert("Invalid address selected. Please try again.");
      return;
    }

    // Format address string
    const fullAddress = `${selectedAddress.addressLine1}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.zip}`;

    // Determine user ID and name
    const userId = user?.id || user?.uid || 1;
    const userName = user?.name || user?.displayName || selectedAddress.name || "Guest User";

    // Create order object
    const orderData = {
      userId: userId,
      userName: userName,
      items: cart.map(item => ({
        id: item.id,
        title: item.name || item.title,
        price: item.price,
        quantity: item.quantity
      })),
      total: parseFloat(calculateTotal()),
      address: fullAddress,
      addressId: selectedAddressId,
      addressName: selectedAddress.name,
      status: "On Process",
      orderDate: new Date().toISOString()
    };

    console.log('Creating order:', orderData); // Debug log

    try {
      // Post order to database
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const createdOrder = await response.json();
        //alert(`Order #${createdOrder.id} placed successfully!\nDelivering to: ${fullAddress}`);
        
        // Clear cart (you may need to add this function to your AppContext)
        // clearCart();
        
        // Navigate to orders page
        navigate('/orders');
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to create order: ${errorText}`);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      //alert("Failed to place order. Please ensure json-server is running and try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="mb-4">Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet. Go to <Link to="/products">products</Link> to start shopping!</p>
        <div className="mt-4"></div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Shopping Cart</h2>
      <div className="row">
        <div className="col-md-8">
          {cart.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="card-body d-flex align-items-center">
                <img 
                  src={item.imageUrl || item.image} 
                  alt={item.name || item.title} 
                  className="img-thumbnail me-3" 
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                />
                <div className="flex-grow-1">
                  <h5 className="card-title">{item.name || item.title}</h5>
                  <p className="card-text text-muted mb-2" style={{ fontSize: '0.9em' }}>
                    {item.description}
                  </p>
                  <p className="card-text">${item.price.toFixed(2)} x {item.quantity}</p>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary btn-sm me-2"
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="me-2">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-danger btn-sm ms-3"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Order Summary</h5>
              
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Subtotal
                  <span>${calculateTotal()}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Total</strong>
                  <strong>${calculateTotal()}</strong>
                </li>
              </ul>

              {/* Delivery Address Selection */}
              <div className="mb-3">
                <h6 className="mb-3">Select Delivery Address</h6>
                
                {loading ? (
                  <div className="text-center py-3">
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading addresses...</span>
                    </div>
                  </div>
                ) : error ? (
                  <div className="alert alert-danger py-2" role="alert" style={{ fontSize: '0.9em' }}>
                    Error loading addresses: {error}
                    <br />
                    <small>Please check if json-server is running on port 5000</small>
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="alert alert-warning py-2" role="alert" style={{ fontSize: '0.9em' }}>
                    No saved addresses found. Please add an address in your profile.
                    <br />
                    <small className="text-muted">Current user ID: {user?.id || user?.uid || 1}</small>
                  </div>
                ) : (
                  <div className="border rounded" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {addresses.map((address) => (
                      <label 
                        key={address.id} 
                        className={`d-block p-3 border-bottom ${selectedAddressId === address.id ? 'bg-light' : ''}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="d-flex align-items-start">
                          <input
                            type="radio"
                            className="form-check-input me-3 mt-1"
                            name="addressSelection"
                            checked={selectedAddressId === address.id}
                            onChange={() => handleAddressSelect(address.id)}
                            style={{ cursor: 'pointer' }}
                          />
                          <div className="flex-grow-1">
                            <strong className="d-block mb-1">{address.name}</strong>
                            <small className="d-block text-muted">{address.addressLine1}</small>
                            <small className="d-block text-muted">
                              {address.city}, {address.state} {address.zip}
                            </small>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <button
                className="btn btn-success w-100 mt-3"
                onClick={handleProceedToCheckout}
                disabled={!selectedAddressId || addresses.length === 0}
              >
                {selectedAddressId ? 'Proceed to Checkout' : 'Select Address to Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;