// // // import React from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';

// // // function ProductDetail({ products, addToCart }) {
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const product = products.find((p) => p.id === parseInt(id));

// // //   if (!product) {
// // //     return <div className="text-center text-red-500 text-xl mt-8">Product not found.</div>;
// // //   }

// // //   return (
// // //     <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-center min-h-screen">
// // //       <div className="max-w-4xl bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
// // //         <div className="md:w-1/2 flex justify-center items-center">
// // //           <img
// // //             src={product.imageUrl}
// // //             alt={product.name}
// // //             className="w-full h-auto max-h-96 object-contain rounded-lg shadow-md"
// // //           />
// // //         </div>
// // //         <div className="md:w-1/2">
// // //           <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
// // //           <p className="text-gray-700 text-lg mb-6 leading-relaxed">{product.description}</p>
// // //           <p className="text-blue-600 text-5xl font-bold mb-6">${product.price.toFixed(2)}</p>
// // //           <div className="flex space-x-4">
// // //             <button
// // //               onClick={() => addToCart(product)}
// // //               className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
// // //             >
// // //               Add to Cart
// // //             </button>
// // //             <button
// // //               onClick={() => navigate('/products')}
// // //               className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
// // //             >
// // //               Back to Products
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ProductDetail;

// // // src/Components/ProductDetail.jsx
// // import React from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';

// // function ProductDetail({ products, addToCart }) { // addToCart is now expected as a prop
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const product = products.find((p) => p.id === parseInt(id));

// //   if (!product) {
// //     return <div className="text-center text-red-500 text-xl mt-8">Product not found.</div>;
// //   }

// //   const handleAddToCart = () => {
// //     // Call the addToCart function passed from App.jsx
// //     // It will automatically navigate to /cart because of the default parameter in App.jsx
// //     addToCart(product);
// //   };

// //   return (
// //     <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-center min-h-screen">
// //       <div className="max-w-4xl bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
// //         <div className="md:w-1/2 flex justify-center items-center">
// //           <img
// //             src={product.imageUrl}
// //             alt={product.name}
// //             className="w-full h-auto max-h-96 object-contain rounded-lg shadow-md"
// //           />
// //         </div>
// //         <div className="md:w-1/2">
// //           <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
// //           <p className="text-gray-700 text-lg mb-6 leading-relaxed">{product.description}</p>
// //           <p className="text-blue-600 text-5xl font-bold mb-6">${product.price.toFixed(2)}</p>
// //           <div className="flex space-x-4">
// //             <button
// //               onClick={handleAddToCart} // Call our new handler
// //               className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
// //             >
// //               Add to Cart
// //             </button>
// //             <button
// //               onClick={() => navigate('/products')}
// //               className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
// //             >
// //               Back to Products
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ProductDetail;

// // src/Components/ProductDetail.jsx
// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useApp } from '../context/AppContext'; // Import your AppContext

// function ProductDetail({ products }) { // Removed addToCart from props, will use context
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useApp(); // Get addToCart from context

//   const product = products.find((p) => p.id === parseInt(id));

//   if (!product) {
//     return <div className="text-center text-red-500 text-xl mt-8">Product not found.</div>;
//   }

//   const handleAddToCart = () => {
//     addToCart(product); // Call the context's addToCart
//     navigate('/cart');  // Now, navigate to the cart page
//   };

//   return (
//     <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-center min-h-screen">
//       <div className="max-w-4xl bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
//         <div className="md:w-1/2 flex justify-center items-center">
//           <img
//             src={product.imageUrl}
//             alt={product.name}
//             className="w-full h-auto max-h-96 object-contain rounded-lg shadow-md"
//           />
//         </div>
//         <div className="md:w-1/2">
//           <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
//           <p className="text-gray-700 text-lg mb-6 leading-relaxed">{product.description}</p>
//           <p className="text-blue-600 text-5xl font-bold mb-6">${product.price.toFixed(2)}</p>
//           <div className="flex space-x-4">
//             <button
//               onClick={handleAddToCart}
//               className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={() => navigate('/products')}
//               className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
//             >
//               Back to Products
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;

// src/Components/ProductDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Accept toastRef as a prop
function ProductDetail({ products, toastRef }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useApp(); // Get addToWishlist if you want a toast for it

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="text-center text-red-500 text-xl mt-8">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    if (toastRef.current) {
      toastRef.current.showToast(`${product.name} added to cart!`); // Show toast
    }
    navigate('/cart'); // Navigate to the cart page
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    if (toastRef.current) {
      toastRef.current.showToast(`${product.name} added to wishlist!`); // Show toast
    }
    // You might or might not want to navigate to the wishlist page immediately
    // navigate('/wishlist');
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-center min-h-screen">
      <div className="max-w-4xl bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto max-h-96 object-contain rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">{product.description}</p>
          <p className="text-blue-600 text-5xl font-bold mb-6">${product.price.toFixed(2)}</p>
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist} // Added button for wishlist
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Add to Wishlist
            </button>
            <button
              onClick={() => navigate('/products')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;