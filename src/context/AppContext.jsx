

// import { createContext, useContext, useState, useEffect } from "react"; // Import useEffect

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   // Initialize state from localStorage, or with an empty array if nothing is found
//   const [cart, setCart] = useState(() => {
//     try {
//       const savedCart = localStorage.getItem('cart');
//       return savedCart ? JSON.parse(savedCart) : [];
//     } catch (error) {
//       console.error("Failed to parse cart from localStorage", error);
//       return [];
//     }
//   });

//   const [wishlist, setWishlist] = useState(() => {
//     try {
//       const savedWishlist = localStorage.getItem('wishlist');
//       return savedWishlist ? JSON.parse(savedWishlist) : [];
//     } catch (error) {
//       console.error("Failed to parse wishlist from localStorage", error);
//       return [];
//     }
//   });

//   const [orders, setOrders] = useState([]);

//   // useEffect to save cart to localStorage whenever it changes
//   useEffect(() => {
//     try {
//       localStorage.setItem('cart', JSON.stringify(cart));
//     } catch (error) {
//       console.error("Failed to save cart to localStorage", error);
//     }
//   }, [cart]); // Dependency array: run effect when 'cart' changes

//   // useEffect to save wishlist to localStorage whenever it changes
//   useEffect(() => {
//     try {
//       localStorage.setItem('wishlist', JSON.stringify(wishlist));
//     } catch (error) {
//       console.error("Failed to save wishlist to localStorage", error);
//     }
//   }, [wishlist]); // Dependency array: run effect when 'wishlist' changes


//   const addToCart = (itemToAdd) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((i) => i.id === itemToAdd.id);

//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === itemToAdd.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...itemToAdd, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (id) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   const updateCartQuantity = (id, newQuantity) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       ).filter(item => item.quantity > 0)
//     );
//   };

//   const addToWishlist = (itemToAdd) => {
//     setWishlist((prevWishlist) => {
//       if (prevWishlist.find((i) => i.id === itemToAdd.id)) {
//         return prevWishlist;
//       }
//       return [...prevWishlist, itemToAdd];
//     });
//   };

//   const removeFromWishlist = (id) => {
//     setWishlist((prev) => prev.filter((item) => item.id !== id));
//   };

//   const value = {
//     cart,
//     setCart,
//     wishlist,
//     setWishlist,
//     orders,
//     setOrders,
//     addToCart,
//     removeFromCart,
//     updateCartQuantity,
//     addToWishlist,
//     removeFromWishlist,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useApp = () => useContext(AppContext);

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from './AuthContext'; // Import useAuth to get user info

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user, isAuthenticated, loading: loadingAuth } = useAuth(); // Get user, auth status, and auth loading state

  // Initialize state from localStorage, or with an empty array if nothing is found
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
      return [];
    }
  });

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true); // Set to true initially
  const [errorOrders, setErrorOrders] = useState(null);

  // --- Persistence for Cart and Wishlist ---
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage", error);
    }
  }, [wishlist]);

  // --- API Fetching for Orders ---
  // Memoize the fetchOrders function to prevent unnecessary re-creations
  const fetchOrders = useCallback(async (userId, token) => {
    if (!userId || !token) { // Ensure both userId and token are available
      setOrders([]);
      setLoadingOrders(false); // No user or token, so not loading orders
      return;
    }

    setLoadingOrders(true);
    setErrorOrders(null); // Clear previous errors
    try {
      // NOTE: Your Orders.jsx uses http://localhost:5001/orders.
      // This AppContext.js uses `/api/users/${userId}/orders`.
      // Ensure your backend routes align, or adjust one to match the other.
      // For now, I'm leaving it as is, assuming a proxy might handle `/api`
      // or that this specific fetchOrders is meant for a different endpoint.
      // The Orders.jsx fetch will directly hit the json-server.
      const response = await fetch(`/api/users/${userId}/orders`, { // Use user.id here
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch orders with status: ${response.status}`);
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setErrorOrders(error.message);
      setOrders([]); // Clear orders on error
    } finally {
      setLoadingOrders(false);
    }
  }, []); // No dependencies for the function itself, will be called with latest values


  useEffect(() => {
    // Only attempt to fetch if Auth is NOT loading and user status is determined
    if (!loadingAuth) {
      const token = localStorage.getItem('token');
      if (isAuthenticated && user?.id && token) {
        fetchOrders(user.id, token);
      } else {
        // If not authenticated or no user ID, clear orders
        setOrders([]);
        setLoadingOrders(false); // Indicate that loading is complete for orders
        setErrorOrders(null);
      }
    }
  }, [isAuthenticated, user?.id, loadingAuth, fetchOrders]); // Add loadingAuth to dependencies

  // --- Cart/Wishlist Action Functions (remain the same) ---
  const addToCart = (itemToAdd) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === itemToAdd.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === itemToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...itemToAdd, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const addToWishlist = (itemToAdd) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.find((i) => i.id === itemToAdd.id)) {
        return prevWishlist;
      }
      return [...prevWishlist, itemToAdd];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const value = {
    cart,
    setCart,
    wishlist,
    setWishlist,
    orders,
    setOrders, // <--- UNCOMMENTED/ADDED THIS LINE! This is the fix.
    loadingOrders,
    errorOrders,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    addToWishlist,
    removeFromWishlist,
    // You might also want to expose fetchOrders if you need to manually refresh from a component
    // fetchOrders: () => fetchOrders(user?.id, localStorage.getItem('token')),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);