// src/components/Views/Driver/SearchBar.jsx

import React from 'react';
import { FormControl } from 'react-bootstrap';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <FormControl
      type="text"
      placeholder="Search by Order ID"
      value={searchTerm}
      onChange={onSearchChange}
    />
  );
};

export default SearchBar;
