// src/components/ProductCard.jsx
import React from 'react';
import { useApp } from "../context/AppContext";
import { Card, Button, Row, Col } from 'react-bootstrap';
import { BsCartPlus, BsHeart } from 'react-icons/bs'; // Importing icons

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist } = useApp();
  const outOfStock = product.stock === 0;

  return (
    <Card className="h-100 shadow-sm">
      {/* Assuming you might want an image later. For now, a placeholder. */}
      {/* <Card.Img variant="top" src={product.imageUrl || "https://via.placeholder.com/150"} /> */}
      <div className="d-flex justify-content-center align-items-center" style={{ height: '180px', backgroundColor: '#f8f9fa' }}>
      <img style={{height:"170px",width:"97%"}} src={product?.image}/>
        {/* <BsCartPlus size={60} className="text-muted" /> Placeholder icon */}
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate">{product.title}</Card.Title>
        <Card.Text>
          <strong>${product.price.toFixed(2)}</strong>
          <br />
          Stock: {product.stock} {outOfStock && <span className="text-danger">(Out of Stock)</span>}
        </Card.Text>
        <div className="mt-auto"> {/* Pushes buttons to the bottom */}
          <Row xs={1} sm={2} className="g-2">
            <Col>
              <Button
                variant="primary"
                onClick={() => addToCart(product)}
                disabled={outOfStock}
                className="w-100 d-flex align-items-center justify-content-center p-2"
                style={{fontSize:"12.5px",fontWeight:"bold",backgroundColor:"rgba(132, 100, 61, 1)",border:"none"}}
              >
                <BsCartPlus className="me-2" /> Add to Cart
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-secondary"
                onClick={() => addToWishlist(product)}
                disabled={outOfStock} // Or you might allow adding to wishlist even if out of stock
                className="w-100 d-flex align-items-center justify-content-center"
              >
                <BsHeart className="me-2" /> Wishlist
              </Button>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;