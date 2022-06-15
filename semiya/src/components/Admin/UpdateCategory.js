import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useInput from "../../hooks/useInput";

const UpdateCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = useSelector((state) => state.defaultCategories);
  const user = useSelector((state) => state.user);
  const newName = useInput();

  const submitHandler = (e) => {
    e.preventDefault();


  };

  return (
    <>
      <Link to={`/profile/${user.id}/admin`}>
        <button className="btn btn-success littleMargin">Back</button>
      </Link>
      <h1>Update Category</h1>

      <select
        className="form-select form-select-sm"
        aria-label="Small select"
        onChange={(e) => {
          setSelectedCategory(e.target.value)
          console.log("🚀 ~ file: UpdateCategory.js ~ line 30 ~ UpdateCategory ~ e.target.value", e.target.value)
          
        }}
      >
        <option defaultValue="">Categories</option>
        {categories.map((category, i) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <form onSubmit={submitHandler}>
        <label htmlFor="inputNewName" className="form-label">
          New Name
        </label>
        <input
          type="text"
          className="form-control"
          id="inputNewName"
          placeholder="New Name"
          aria-describedby="newNameHelp"
          {...newName}
        />
        <button type="submit" className="btn btn-primary littleMargin">
          Submit
        </button>
      </form>
    </>
  );
};

export default UpdateCategory;
