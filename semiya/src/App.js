import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate, useNavigate, useMatch } from "react-router";
import Header from "./components/Header";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ProductList from "./commons/ProductList.js";
import ProductDetail from "./commons/ProductDetail.js";
import NotFound from "./commons/NotFound.js";
import ShoppingCart from "./components/ShoppingCart";
import CheckOut from "./components/CheckOut.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import ForgotPassword from "./components/ForgotPassword.js";
import Contact from "./components/Contact.js";
import { useDispatch, useSelector } from "react-redux";
import { defaultProductRequest } from "./state/defaultProducts.js";
import { updateFromStorage } from "./state/cart.js";
import useLocalStorage from "./hooks/useLocalStorage";
import { setUser } from "./state/user";
import Profile from "./components/Profile";
import Admin from "./components/Admin";
import UserPurchases from "./components/UserPurchases.js";
import PastPurchase from "./components/PastPurchase.js";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import NewCategory from "./components/Admin/NewCategory";
import UpdateCategory from "./components/Admin/UpdateCategory";
import { defaultCategoriesRequest } from "./state/defaultCategories";
import { filteredProductRequest } from "./state/filteredProducts";
import { filteredCategoryRequest } from "./state/filteredByCategory";
import { renderedProducts } from "./state/renderedProducts";
import { virtualCart } from "./state/virtualCart";
import { totalAmount } from "./state/totalAmount";
import DeleteProduct from "./components/Admin/DeleteProduct";
import DeleteCategory from "./components/Admin/DeleteCategory";

function App() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  // const user = useSelector((state) => state.user);
  const wayToFilter = useSelector((state) => state.wayToFilter);
  const [, setStorageCart] = useLocalStorage("cart", cart);
  const [, setStorageUser] = useLocalStorage("user", "");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(defaultProductRequest()).then(() => dispatch(renderedProducts()));
    dispatch(defaultCategoriesRequest());
    const localUser = JSON.parse(localStorage.getItem("user"));
    localUser &&
      dispatch(setUser())
        .then((user) => user.payload && setStorageUser(user.payload))
        .catch((err) => console.log(err));
    !cart.length && dispatch(updateFromStorage());
  }, []);

  useEffect(() => {
    wayToFilter.type === "name" &&
      dispatch(filteredProductRequest()).then(() =>
        dispatch(renderedProducts())
      );
    wayToFilter.type === "category" &&
      dispatch(filteredCategoryRequest()).then(() =>
        dispatch(renderedProducts())
      );
    wayToFilter.type === null &&
      dispatch(filteredCategoryRequest()).then(() =>
        dispatch(renderedProducts())
      );
  }, [wayToFilter]);

  useEffect(() => {
    dispatch(totalAmount());
    cart.length && dispatch(virtualCart());
    cart.length && setStorageCart(cart);
  }, [cart]);

  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/products/*" element={<ProductList />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/shopping-cart/check-out" element={<CheckOut />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/:id/purchases" element={<UserPurchases />} />
          <Route
            path="/profile/1/purchases/:purchaseId"
            element={<PastPurchase />}
          />
          <Route path="/profile/:id/admin" element={<Admin />} />
          <Route
            path="/profile/:id/admin/new-product"
            element={<NewProduct />}
          />
          <Route
            path="/profile/:id/admin/delete-product"
            element={<DeleteProduct />}
          />
          <Route
            path="/profile/:id/admin/update-product"
            element={<UpdateProduct />}
          />
          <Route
            path="/profile/:id/admin/new-category"
            element={<NewCategory />}
          />
          <Route
            path="/profile/:id/admin/update-category"
            element={<UpdateCategory />}
          />
          <Route
            path="/profile/:id/admin/delete-category"
            element={<DeleteCategory />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
