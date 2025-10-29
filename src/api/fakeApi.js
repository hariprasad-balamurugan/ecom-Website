// import axios from "axios";

// const API_BASE = "http://localhost:5000"; // or your fakestoreapi.com

// export const getProducts = () => axios.get(`${API_BASE}/products`);
// export const getCategories = () => axios.get(`${API_BASE}/categories`);
// export const getOrders = () => axios.get(`${API_BASE}/orders`);
// export const addOrder = (data) => axios.post(`${API_BASE}/orders`, data);

// export const updateOrderStatus = (id, status) => {
//   return axios.patch(`${API_BASE}/orders/${id}`, { status });
// };

import axios from "axios";

const API_BASE = "http://localhost:5001"; // Ensure your json-server runs on this port

// --- Product/Category Endpoints (Existing) ---
export const getProducts = () => axios.get(`${API_BASE}/products`);
export const getCategories = () => axios.get(`${API_BASE}/categories`);

// --- Order Endpoints (Existing & Extended) ---
export const getOrders = () => axios.get(`${API_BASE}/orders`); // For Admin Panel
export const getUserOrders = (userId) => axios.get(`${API_BASE}/orders?userId=${userId}`); // For user's order history
export const placeOrder = (orderData) => axios.post(`${API_BASE}/orders`, orderData);
export const updateOrderStatus = (id, status) => {
  return axios.patch(`${API_BASE}/orders/${id}`, { status });
};

// --- User/Authentication Endpoints (New) ---
// Note: In a real app, login would typically hit a specific /login or /auth endpoint
// For json-server simulation, we fetch users and check credentials client-side.
export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.get(`${API_BASE}/users?email=${email}&password=${password}`);
    if (response.data && response.data.length > 0) {
      return { data: { user: response.data[0] } }; // Return the first matching user
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};

// --- Address Endpoints (New) ---
export const getUserAddresses = (userId) => axios.get(`${API_BASE}/addresses?userId=${userId}`);
export const addAddress = (addressData) => axios.post(`${API_BASE}/addresses`, addressData);
export const updateAddress = (addressId, updatedData) => axios.patch(`${API_BASE}/addresses/${addressId}`, updatedData);
export const deleteAddress = (addressId) => axios.delete(`${API_BASE}/addresses/${addressId}`);

// --- Initial Data for json-server (Optional, if you want to set up your db.json) ---
/*
If your `db.json` is initially empty, you might want to manually populate it with:
{
  "users": [
    { "id": 1, "email": "user@example.com", "password": "password", "name": "Regular User" },
    { "id": 2, "email": "admin@example.com", "password": "admin", "name": "Admin User" }
  ],
  "products": [
    { "id": 1, "name": "Vintage Camera", "description": "...", "price": 249.99, "imageUrl": "..." },
    { "id": 2, "name": "Wireless Headphones", "description": "...", "price": 199.99, "imageUrl": "..." }
  ],
  "categories": [],
  "orders": [],
  "addresses": [
    { "id": 1, "userId": 1, "name": "Home Address", "addressLine1": "123 Main St", "city": "Anytown", "state": "CA", "zip": "90210" },
    { "id": 2, "userId": 1, "name": "Work Address", "addressLine1": "456 Office Rd", "city": "Anycity", "state": "NY", "zip": "10001" }
  ]
}
*/