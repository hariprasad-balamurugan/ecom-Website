

import React, { useEffect, useState } from 'react';
import { useApp } from "../context/AppContext";
import { Container, Card, ListGroup, Row, Col, Spinner, Alert, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const { orders: appOrders, setOrders: setAppOrders } = useApp(); // This line will now correctly get setOrders
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndSetOrders = async () => {
      console.log('Orders.jsx: useEffect triggered for order fetch.');
      console.log('Orders.jsx: Current authLoading:', authLoading);
      console.log('Orders.jsx: Current user object:', user);

      if (authLoading) {
        console.log('Orders.jsx: Auth is still loading. Waiting...');
        return; // Wait for user info to load
      }

      try {
        setLoading(true);
        setError(null); // Clear previous errors

        // Check if user is logged in and has a UID
        if (!user || !user.uid) {
          console.log('Orders.jsx: User is not logged in or user.uid is missing. Setting appOrders to empty.');
          setAppOrders([]); // Clear orders if no user or no UID
          setLoading(false);
          return;
        }

        console.log(`Orders.jsx: User logged in. UID: ${user.uid}. Attempting to fetch all orders from http://localhost:5001/orders`);
        const response = await fetch('http://localhost:5001/orders');

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const allOrders = await response.json();
        console.log('Orders.jsx: Successfully fetched ALL orders from API:', allOrders);

        // Filter orders by the current user's Firebase UID
        const userOrders = allOrders.filter(order => order.userId === user.uid);
        console.log('Orders.jsx: Orders filtered by user.uid:', user.uid, 'Result:', userOrders);

        // Sort orders by date (newest first)
        const sortedOrders = userOrders.sort((a, b) =>
          new Date(b.orderDate || b.date) - new Date(a.orderDate || a.date)
        );
        console.log('Orders.jsx: Sorted user orders:', sortedOrders);

        setAppOrders(sortedOrders); // Update orders in AppContext
      } catch (err) {
        setError(`Failed to fetch or process orders: ${err.message}. Please ensure json-server is running.`);
        console.error("Orders.jsx: Error in fetchAndSetOrders:", err);
        setAppOrders([]); // Clear orders on error
      } finally {
        setLoading(false);
        console.log('Orders.jsx: fetchAndSetOrders finished.');
      }
    };

    fetchAndSetOrders();
  }, [user, authLoading, setAppOrders]); // setAppOrders is from AppContext, stable

  // The rest of your rendering logic can use appOrders, loading, error directly
  // ... (no changes needed below this line in your JSX) ...
  if (loading || authLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading orders...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading your order history...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          {error}
          <br />
          <small>Make sure json-server is running: <code>json-server --watch db.json --port 5001</code></small>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4 mb-5">
      <h2 className="mb-4 text-center">Your Order History</h2>

      {!user && (
        <Alert variant="warning" className="text-center">
          Please log in to view your order history.
        </Alert>
      )}

      {user && appOrders.length === 0 ? ( // Use appOrders here
        <Alert variant="info" className="text-center">
          You haven't placed any orders yet. Start shopping to see your orders here!
        </Alert>
      ) : (
        <Row xs={1} md={1} lg={1} className="g-4">
          {appOrders.map((order) => ( // Use appOrders here
            <Col key={order.id}>
              <Card className="shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                  <div>
                    <strong>Order #{order.id}</strong>
                    {order.userName && (
                      <small className="text-muted ms-2">• {order.userName}</small>
                    )}
                  </div>
                  <Badge
                    bg={
                      order.status === "On Process" ? "warning" :
                      order.status === "Shipped" ? "info" :
                      order.status === "Delivered" ? "success" : "secondary"
                    }
                    text={order.status === "On Process" ? "dark" : "white"}
                  >
                    {order.status}
                  </Badge>
                </Card.Header>

                <Card.Body>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Card.Text className="mb-2">
                        <strong>Order Date:</strong>{' '}
                        {new Date(order.orderDate || order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Card.Text>
                      <Card.Text className="mb-2">
                        <strong>Total:</strong>{' '}
                        <span className="text-success fs-5">${order.total.toFixed(2)}</span>
                      </Card.Text>
                    </Col>
                    <Col md={6}>
                      <Card.Text className="mb-2">
                        <strong>Shipping Address:</strong>
                        {order.addressName && (
                          <Badge bg="secondary" className="ms-2">{order.addressName}</Badge>
                        )}
                      </Card.Text>
                      <Card.Text className="text-muted" style={{ fontSize: '0.9em' }}>
                        {order.address}
                      </Card.Text>
                    </Col>
                  </Row>

                  <h6 className="mb-3 border-top pt-3">Order Items:</h6>
                  <ListGroup variant="flush">
                    {order.items.map((item, index) => (
                      <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center px-0">
                        <div>
                          <span className="fw-semibold">{item.title}</span>
                          {item.quantity > 1 && (
                            <Badge bg="light" text="dark" className="ms-2">
                              Qty: {item.quantity}
                            </Badge>
                          )}
                        </div>
                        <span className="text-end">
                          <span className="text-muted" style={{ fontSize: '0.9em' }}>
                            ${item.price.toFixed(2)}
                            {item.quantity > 1 && ` × ${item.quantity}`}
                          </span>
                          {item.quantity > 1 && (
                            <span className="d-block fw-semibold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          )}
                        </span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <div className="border-top mt-3 pt-3 d-flex justify-content-between align-items-center">
                    <strong>Order Total:</strong>
                    <strong className="text-success fs-5">${order.total.toFixed(2)}</strong>
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

export default Orders;