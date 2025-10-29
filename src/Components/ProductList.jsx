// import React from 'react';
// import { Link } from 'react-router-dom';

// function ProductList({ products }) {
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div key={product.id} className="border rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
//             <Link to={`/product/${product.id}`}>
//               <img
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
//                 <p className="text-gray-700 mb-2">{product.description.substring(0, 100)}...</p>
//                 <p className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
//                 <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
//                   View Details
//                 </button>
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductList;

import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useApp } from "../context/AppContext"; // Import useApp

// Accept toastRef as a prop
function ProductList({ products, toastRef }) {
    console.log(products,"hhhhh");
    
  const { addToCart } = useApp(); // Get addToCart from context
  const navigate = useNavigate(); // Initialize useNavigate here

  const handleAddToCart = (product, event) => {
    event.stopPropagation(); // Prevent Link navigation when clicking button
    event.preventDefault(); // Prevent default button behavior
    addToCart(product);
    if (toastRef.current) {
      toastRef.current.showToast(`${product.name} added to cart!`);
    }
    // Optionally navigate to cart or just show toast
    // navigate('/cart');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Link to={`/product/${product.id}`}>
              {" "}
              {/* This link should wrap the whole card except the button if you want separate clicks */}
              {/* {console.log(products, "product")} */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-2">
                  {product.description.substring(0, 100)}...
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </p>
                {/* Add to cart button directly in ProductList */}
                <button
                  className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
                  onClick={(e) => handleAddToCart(product, e)} // Pass event to handler
                >
                  Add to Cart
                </button>
                {/* Existing View Details button if desired */}
                <button className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                  View Details
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
