// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { getProducts } from "../api/fakeApi";
import ProductCard from "../Components/ProductCard";
import SearchBar from "../Components/SearchBar";
import SortDropdown from "../Components/SortDropdown";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProducts();
        setProducts(res.data);
        setFilteredProducts(res.data); // Initialize filtered products
      } catch (err) {
        setError("Failed to fetch products. Please ensure json-server is running.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let currentProducts = [...products];

    // Filter
    if (query) {
      currentProducts = currentProducts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Sort
    if (sort) {
      currentProducts.sort((a, b) => {
        if (sort === "low") return a.price - b.price;
        if (sort === "high") return b.price - a.price;
        // Add "name" sort if desired:
        // if (sort === "name") return a.title.localeCompare(b.title);
        return 0;
      });
    }

    setFilteredProducts(currentProducts);
  }, [products, query, sort]);


  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading products...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Our Products</h2>
      <Row className="mb-4 g-3">
        <Col md={8}>
          <SearchBar setQuery={setQuery} />
        </Col>
        <Col md={4}>
          <SortDropdown setSort={setSort} />
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {filteredProducts.map((p) => (
          <Col key={p.id}>
            <ProductCard product={p} />
          </Col>
        ))}
        {filteredProducts.length === 0 && (
          <Col xs={12} className="text-center">
            <p className="lead">No products found matching your criteria.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Home;