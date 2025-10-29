// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase"; // Assuming firebase.js is in the root of src/

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To manage initial auth state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      // Handle errors (e.g., display a message to the user)
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    user,
    loginWithGoogle,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Only render children once auth state is checked */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);