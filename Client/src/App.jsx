import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import Products from "./components/Product/Products";
import ProductDetails from "./components/Product/ProductDetails";
import NotFound from "./components/NotFound";
import Navigation from "./components/Navigation";
import AddCustomer from "./components/Customer/AddCustomer";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
