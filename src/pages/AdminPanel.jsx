// // src/pages/AdminPanel.jsx
// import React, { useEffect, useState } from "react";
// import { getOrders, updateOrderStatus } from "../api/fakeApi";
// import { Container, Card, ListGroup, Form, Row, Col, Spinner, Alert } from 'react-bootstrap';
// import { useAuth } from '../context/AuthContext'; // To potentially restrict admin access

// const AdminPanel = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { user, loading: authLoading } = useAuth(); // Check for logged-in user

//   // Basic admin check - in a real app, you'd check roles/permissions
//   const isAdmin = user && user.email === "admin@example.com"; // Replace with your admin email or role logic

//   useEffect(() => {
//     const fetchAllOrders = async () => {
//       if (authLoading || !isAdmin) return; // Don't fetch if not admin or auth not loaded

//       try {
//         setLoading(true);
//         const res = await getOrders();
//         setOrders(res.data);
//       } catch (err) {
//         setError("Failed to fetch orders for admin panel. Please ensure json-server is running.");
//         console.error("Error fetching admin orders:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAllOrders();
//   }, [authLoading, isAdmin]);

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await updateOrderStatus(orderId, newStatus);
//       setOrders((prev) =>
//         prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
//       );
//       alert(`Order #${orderId} status updated to ${newStatus}`);
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       alert("Failed to update order status. Please try again.");
//     }
//   };

//   if (authLoading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Checking admin access...</span>
//         </Spinner>
//       </Container>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger" className="text-center">Access Denied: You do not have administrator privileges.</Alert>
//       </Container>
//     );
//   }

//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading all orders...</span>
//         </Spinner>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-4">
//       <h2 className="mb-4 text-center">Admin Panel - All Orders</h2>
//       {orders.length === 0 ? (
//         <Alert variant="info" className="text-center">No orders found.</Alert>
//       ) : (
//         <Row xs={1} md={1} lg={1} className="g-4">
//           {orders.map((order) => (
//             <Col key={order.id}>
//               <Card className="shadow-sm">
//                 <Card.Header className="d-flex justify-content-between align-items-center">
//                   <strong>Order #{order.id}</strong>
//                   <small className="text-muted">User ID: {order.userId}</small>
//                 </Card.Header>
//                 <Card.Body>
//                   <Card.Text>
//                     <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
//                   </Card.Text>
//                   <Card.Text>
//                     <strong>Total:</strong> ${order.total.toFixed(2)}
//                   </Card.Text>
//                   <h6>Items:</h6>
//                   <ListGroup variant="flush" className="mb-3">
//                     {order.items.map((item, index) => (
//                       <ListGroup.Item key={index}>
//                         {item.title} (${item.price.toFixed(2)})
//                       </ListGroup.Item>
//                     ))}
//                   </ListGroup>
//                   <Form.Group as={Row} className="mb-0 align-items-center">
//                     <Form.Label column sm="3">Order Status:</Form.Label>
//                     <Col sm="9">
//                       <Form.Select
//                         value={order.status}
//                         onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                       >
//                         <option value="On Process">On Process</option>
//                         <option value="Shipped">Shipped</option>
//                         <option value="Delivered">Delivered</option>
//                       </Form.Select>
//                     </Col>
//                   </Form.Group>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default AdminPanel;

// src/pages/AdminPanel.jsx
// import React, { useEffect, useState } from "react";
// import { Container, Card, ListGroup, Form, Row, Col, Spinner, Alert, Badge } from 'react-bootstrap';
// import { useAuth } from '../context/AuthContext';

// const AdminPanel = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { user, loading: authLoading } = useAuth();

//   // Basic admin check - in a real app, you'd check roles/permissions
//   const isAdmin = user && user.email === "admin@example.com"; // Replace with your admin email

//   useEffect(() => {
//     const fetchAllOrders = async () => {
//       if (authLoading || !isAdmin) return;

//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:5000/orders');
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch orders');
//         }
        
//         const allOrders = await response.json();
        
//         // Sort orders by date (newest first)
//         const sortedOrders = allOrders.sort((a, b) => 
//           new Date(b.orderDate || b.date) - new Date(a.orderDate || a.date)
//         );
        
//         setOrders(sortedOrders);
//       } catch (err) {
//         setError("Failed to fetch orders. Please ensure json-server is running on port 5000.");
//         console.error("Error fetching admin orders:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchAllOrders();
//   }, [authLoading, isAdmin]);

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       // Update the order status in json-server
//       const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update order status');
//       }

//       // Update local state
//       setOrders((prev) =>
//         prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
//       );

//       alert(`Order #${orderId} status updated to "${newStatus}"`);
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       alert("Failed to update order status. Please try again.");
//     }
//   };

//   if (authLoading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Checking admin access...</span>
//         </Spinner>
//         <p className="mt-3 text-muted">Checking admin access...</p>
//       </Container>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger" className="text-center">
//           <Alert.Heading>Access Denied</Alert.Heading>
//           <p>You do not have administrator privileges to access this panel.</p>
//         </Alert>
//       </Container>
//     );
//   }

//   if (loading) {
//     return (
//       <Container className="text-center mt-5">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading all orders...</span>
//         </Spinner>
//         <p className="mt-3 text-muted">Loading all orders...</p>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">
//           {error}
//           <br />
//           <small>Make sure json-server is running: <code>json-server --watch db.json --port 5000</code></small>
//         </Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-4 mb-5">
//       <h2 className="mb-4 text-center">Admin Panel - All Orders</h2>
//       <Alert variant="info" className="text-center mb-4">
//         <strong>Total Orders:</strong> {orders.length}
//       </Alert>
      
//       {orders.length === 0 ? (
//         <Alert variant="warning" className="text-center">No orders found in the system.</Alert>
//       ) : (
//         <Row xs={1} md={1} lg={1} className="g-4">
//           {orders.map((order) => (
//             <Col key={order.id}>
//               <Card className="shadow-sm">
//                 <Card.Header className="d-flex justify-content-between align-items-center bg-light">
//                   <div>
//                     <strong>Order #{order.id}</strong>
//                     <small className="text-muted ms-2">
//                       • User: {order.userName || 'Unknown'}
//                     </small>
//                   </div>
//                   <Badge 
//                     bg={
//                       order.status === "On Process" ? "warning" :
//                       order.status === "Shipped" ? "info" :
//                       order.status === "Delivered" ? "success" : "secondary"
//                     }
//                     text={order.status === "On Process" ? "dark" : "white"}
//                   >
//                     {order.status}
//                   </Badge>
//                 </Card.Header>
                
//                 <Card.Body>
//                   <Row className="mb-3">
//                     <Col md={6}>
//                       <Card.Text className="mb-2">
//                         <strong>Order Date:</strong>{' '}
//                         {new Date(order.orderDate || order.date).toLocaleDateString('en-US', {
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric',
//                           hour: '2-digit',
//                           minute: '2-digit'
//                         })}
//                       </Card.Text>
//                       <Card.Text className="mb-2">
//                         <strong>Total:</strong>{' '}
//                         <span className="text-success fs-5">${order.total.toFixed(2)}</span>
//                       </Card.Text>
//                       <Card.Text className="mb-2">
//                         <strong>User ID:</strong>{' '}
//                         <small className="text-muted">{order.userId || 'N/A'}</small>
//                       </Card.Text>
//                     </Col>
//                     <Col md={6}>
//                       <Card.Text className="mb-2">
//                         <strong>Shipping Address:</strong>
//                         {order.addressName && (
//                           <Badge bg="secondary" className="ms-2">{order.addressName}</Badge>
//                         )}
//                       </Card.Text>
//                       <Card.Text className="text-muted" style={{ fontSize: '0.9em' }}>
//                         {order.address}
//                       </Card.Text>
//                     </Col>
//                   </Row>
                  
//                   <h6 className="mb-3 border-top pt-3">Order Items:</h6>
//                   <ListGroup variant="flush" className="mb-3">
//                     {order.items.map((item, index) => (
//                       <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center px-0">
//                         <div>
//                           <span className="fw-semibold">{item.title}</span>
//                           {item.quantity > 1 && (
//                             <Badge bg="light" text="dark" className="ms-2">
//                               Qty: {item.quantity}
//                             </Badge>
//                           )}
//                         </div>
//                         <span className="text-end">
//                           <span className="text-muted" style={{ fontSize: '0.9em' }}>
//                             ${item.price.toFixed(2)}
//                             {item.quantity > 1 && ` × ${item.quantity}`}
//                           </span>
//                           {item.quantity > 1 && (
//                             <span className="d-block fw-semibold">
//                               ${(item.price * item.quantity).toFixed(2)}
//                             </span>
//                           )}
//                         </span>
//                       </ListGroup.Item>
//                     ))}
//                   </ListGroup>
                  
//                   <div className="border-top pt-3">
//                     <Form.Group as={Row} className="mb-0 align-items-center">
//                       <Form.Label column sm="3" className="fw-bold">
//                         Update Status:
//                       </Form.Label>
//                       <Col sm="9">
//                         <Form.Select
//                           value={order.status}
//                           onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                           className="fw-semibold"
//                         >
//                           <option value="On Process">On Process</option>
//                           <option value="Shipped">Shipped</option>
//                           <option value="Delivered">Delivered</option>
//                         </Form.Select>
//                       </Col>
//                     </Form.Group>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default AdminPanel;


// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup, Form, Row, Col, Spinner, Alert, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: authLoading } = useAuth();

  // Basic admin check - in a real app, you'd check roles/permissions
  // TEMPORARY: Allow any logged-in user (for testing only)
  const isAdmin = user && user.email; // Remove this line and use proper admin check later
  
  // PRODUCTION: Use this instead:
  // const adminEmails = ["admin@example.com", "your-email@example.com"];
  // const isAdmin = user && adminEmails.includes(user.email);

  useEffect(() => {
    const fetchAllOrders = async () => {
      if (authLoading || !isAdmin) return;

      try {
        setLoading(true);
        const response = await fetch('http://localhost:5001/orders');
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const allOrders = await response.json();
        
        // Filter out any invalid orders and ensure data integrity
        const validOrders = allOrders.filter(order => {
          if (!order || !order.id) return false;
          // Ensure total exists, calculate if missing
          if (!order.total && order.items && Array.isArray(order.items)) {
            order.total = order.items.reduce((sum, item) => 
              sum + ((item.price || 0) * (item.quantity || 1)), 0
            );
          }
          return true;
        });
        
        // Sort orders by date (newest first)
        const sortedOrders = validOrders.sort((a, b) => 
          new Date(b.orderDate || b.date) - new Date(a.orderDate || a.date)
        );
        
        setOrders(sortedOrders);
      } catch (err) {
        setError("Failed to fetch orders. Please ensure json-server is running on port 5000.");
        console.error("Error fetching admin orders:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllOrders();
  }, [authLoading, isAdmin]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Update the order status in json-server
      const response = await fetch(`http://localhost:5001/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      // Update local state
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );

      alert(`Order #${orderId} status updated to "${newStatus}"`);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  if (authLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Checking admin access...</span>
        </Spinner>
        <p className="mt-3 text-muted">Checking admin access...</p>
      </Container>
    );
  }

  if (!isAdmin) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Access Denied</Alert.Heading>
          <p>You do not have administrator privileges to access this panel.</p>
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading all orders...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading all orders...</p>
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
      <h2 className="mb-4 text-center">Admin Panel - All Orders</h2>
      <Alert variant="info" className="text-center mb-4">
        <strong>Total Orders:</strong> {orders.length}
      </Alert>
      
      {orders.length === 0 ? (
        <Alert variant="warning" className="text-center">No orders found in the system.</Alert>
      ) : (
        <Row xs={1} md={1} lg={1} className="g-4">
          {orders.map((order) => (
            <Col key={order.id}>
              <Card className="shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                  <div>
                    <strong>Order #{order.id}</strong>
                    <small className="text-muted ms-2">
                      • User: {order.userName || 'Unknown'}
                    </small>
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
                        <span className="text-success fs-5">
                          ${order.total ? order.total.toFixed(2) : '0.00'}
                        </span>
                      </Card.Text>
                      <Card.Text className="mb-2">
                        <strong>User ID:</strong>{' '}
                        <small className="text-muted">{order.userId || 'N/A'}</small>
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
                  <ListGroup variant="flush" className="mb-3">
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
                            ${item.price ? item.price.toFixed(2) : '0.00'}
                            {item.quantity > 1 && ` × ${item.quantity}`}
                          </span>
                          {item.quantity > 1 && (
                            <span className="d-block fw-semibold">
                              ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                            </span>
                          )}
                        </span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  
                  <div className="border-top pt-3">
                    <Form.Group as={Row} className="mb-0 align-items-center">
                      <Form.Label column sm="3" className="fw-bold">
                        Update Status:
                      </Form.Label>
                      <Col sm="9">
                        <Form.Select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="fw-semibold"
                        >
                          <option value="On Process">On Process</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </Form.Select>
                      </Col>
                    </Form.Group>
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

export default AdminPanel;