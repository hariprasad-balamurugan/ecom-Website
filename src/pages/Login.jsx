// src/pages/Login.jsx
import React from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Button, Card } from 'react-bootstrap';

const Login = () => {
  const { loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to home or dashboard
  if (user) {
    navigate("/");
    return null; // Don't render anything if redirecting
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '24rem' }} className="shadow-lg p-3 mb-5 bg-white rounded">
        <Card.Body className="text-center">
          <Card.Title className="mb-4">Login to E-Shop</Card.Title>
          <Button
            variant="primary"
            onClick={loginWithGoogle}
            className="w-100"
            size="lg"
          >
            Login with Google
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;