// src/pages/Wishlist.jsx
import React from 'react';
import { useApp } from "../context/AppContext";
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { BsTrashFill, BsCartPlus } from 'react-icons/bs';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
    //alert(`${item.title} moved to cart!`);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <Alert variant="info" className="text-center">Your wishlist is empty. Browse products to add some!</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {wishlist.map((item) => (
            <Col key={item.id}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    <strong>${item.price.toFixed(2)}</strong>
                    <br />
                    Stock: {item.stock}
                  </Card.Text>
                  <div className="mt-auto d-grid gap-2">
                    <Button
                      variant="primary"
                      onClick={() => handleMoveToCart(item)}
                      disabled={item.stock === 0}
                      className="d-flex align-items-center justify-content-center"
                      style={{backgroundColor:"rgba(132, 100, 61, 1)",border:"none"}}
                    >
                      <BsCartPlus className="me-2"  /> {item.stock === 0 ? "Out of Stock" : "Move to Cart"}
                    </Button>
                    <Button variant="outline-danger" onClick={() => removeFromWishlist(item.id)} className="d-flex align-items-center justify-content-center">
                      <BsTrashFill className="me-2" /> Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Wishlist;