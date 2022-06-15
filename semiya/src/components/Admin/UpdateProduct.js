import React, { useState } from "react";
// import useInput from "../../hooks/useInput";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { singleProductRequest } from "../../state/singleProduct";

const UpdateProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  console.log(
    "🚀 ~ file: UpdateProduct.js ~ line 8 ~ UpdateProduct ~ selectedProduct",
    selectedProduct
  );
  // const [selectedCategory, setSelectedCategory] = useState(0);
  // const categories = useSelector((state) => state.defaultCategories);
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.defaultProducts);
  const singleProduct = useSelector((state) => state.singleProduct);
  const [name, setName] = useState(singleProduct?.name);
  const [price, setPrice] = useState(singleProduct?.price);
  const [stock, setStock] = useState(singleProduct?.stock);
  const [fraccionable, setFraccionable] = useState(singleProduct?.fraccionable);
  const [image, setImage] = useState(singleProduct?.image);
  const dispatch = useDispatch;

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name)
    console.log(price)
    console.log(stock)
    console.log(fraccionable)
    console.log(image)
    
  };

  // useEffect(()=>{
  //   dispatch(singleProductRequest(selectedProduct));

  //   console.log("🚀 Desde useEffect", selectedProduct)
  // }, [])

  return (
    <>
      <Link to={`/profile/${user.id}/admin`}>
        <button className="btn btn-success littleMargin">Back</button>
      </Link>
      <h1>Aca va el dropdown de productos</h1>
      <select
        className="form-select form-select-sm"
        aria-label="Small select"
        onChange={(e) => {
          setSelectedProduct(parseInt(e.target.value));
          // dispatch(singleProductRequest(parseInt(e.target.value)))
          // dispatch(singleProductRequest(selectedProduct))
        }}
      >
        <option defaultValue={singleProduct.id}>{singleProduct.name}</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      <div>
        <form onSubmit={submitHandler}>
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Name"
            aria-describedby="nameHelp"
            value={singleProduct.name ? singleProduct.name : ""}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="inputPrice" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="inputPrice"
            placeholder="Price"
            aria-describedby="priceHelp"
            defaultValue={singleProduct.price ? singleProduct.price : ""}
            onChange={(e) => {
              setPrice(parseInt(e.target.value));
            }}
          />
          <label htmlFor="inputStock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            className="form-control"
            id="inputStock"
            placeholder="Stock"
            aria-describedby="stockHelp"
            defaultValue={singleProduct.stock ? singleProduct.stock : ""}
            onChange={(e) => {
              setStock(parseInt(e.target.value));
            }}
          />
          <label htmlFor="inputFraccionable" className="form-label">
            Fraccionable
          </label>
          <input
            type="boolean"
            className="form-control"
            id="inputFraccionable"
            placeholder="Fraccionable"
            aria-describedby="fraccionableHelp"
            defaultValue={
              singleProduct.fraccionable ? singleProduct.fraccionable : false
            }
            onChange={(e) => {
              setFraccionable(e.target.value);
            }}
          />
          <label htmlFor="inputImage" className="form-label">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            id="inputImage"
            placeholder="Image"
            aria-describedby="imageHelp"
            defaultValue={singleProduct.image ? singleProduct.image : ""}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          {/* <select
              className="form-select form-select-sm"
              aria-label="Small select"
              onChange={(e) => {
                setSelectedCategory(e.target.id);
                console.log(
                  "🚀 ~ file: UpdateCategory.js ~ line 30 ~ UpdateCategory ~ e.target.id",
                  e.target
                );
              }}
            >
              <option defaultValue="">Categories</option>
              {categories.map((category, i) => (
                <option
                  key={category.id}
                  id={category.id}
                  value={category.name}
                >
                  {category.name}
                </option>
              ))}
            </select> */}
          <button type="submit" className="btn btn-primary littleMargin">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
