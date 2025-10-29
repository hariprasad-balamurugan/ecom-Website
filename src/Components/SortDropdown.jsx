// src/components/SortDropdown.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

const SortDropdown = ({ setSort }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Select aria-label="Sort by" onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort by</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
        {/* You can add a "Name (A-Z)" option here as well if your product data supports it easily */}
      </Form.Select>
    </Form.Group>
  );
};

export default SortDropdown;