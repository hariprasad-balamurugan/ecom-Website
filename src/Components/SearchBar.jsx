// src/components/SearchBar.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ setQuery }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Control
        type="text"
        placeholder="Search products..."
        onChange={(e) => setQuery(e.target.value)}
      />
    </Form.Group>
  );
};

export default SearchBar;