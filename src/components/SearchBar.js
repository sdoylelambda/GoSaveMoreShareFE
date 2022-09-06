import React from "react";
import { TextInput } from "react-materialize";

const SearchBar = ({ placeholder, handleChange }) => {
  return (
    <>
      <TextInput
        id="search"
        type="search"
        required
        placeholder={placeholder}
        onChange={handleChange}
      />
    </>
  );
};

export default SearchBar;
