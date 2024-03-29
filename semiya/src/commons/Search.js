import React from "react";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setWayToFilter } from "../state/wayToFilter";

const Search = () => {
  const navigate = useNavigate();
  const product = useInput();

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.defaultCategories);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(
    //   "🚀 ~ file: Search.js ~ line 18 ~ submitHandler ~ e.target[0].value",
    //   e.target[0].value
    // );
    const nameQuery = { value: product.value, type: "name" };
    e.target[0].value = "";
    product.onChange();
    nameQuery.value
      ? dispatch(setWayToFilter(nameQuery))
      : alert("Por favor indique algun parametro de busqueda");
    navigate(`/products?${nameQuery.type}=${nameQuery.value}`);
  };
  return (
    <div className="container littleMargin">
      <form onSubmit={submitHandler}>
        <div className="input-group">
          <input
            {...product}
            type="text"
            className="form-control"
            placeholder="What are you looking for?"
            aria-label="Product"
            aria-describedby="input-group-button-right"
          />
          <button
            type="submit"
            className="btn btn-outline-secondary"
            id="input-group-button-right"
          >
            Search
          </button>
        </div>

        <select
          className="form-select form-select-sm"
          aria-label="Small select"
          onChange={(e) => {
            const filterObj = { value: e.target.value, type: "category" };
            dispatch(setWayToFilter(filterObj));
            navigate(`/products?${filterObj.type}=${filterObj.value}`);
          }}
        >
          <option defaultValue="">Categories</option>
          {categories.map((category, i) => (
            <option key={i} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default Search;
