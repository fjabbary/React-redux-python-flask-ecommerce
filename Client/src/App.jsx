import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import Products from "./components/Product/Products";
import ProductDetails from "./components/Product/ProductDetails";
import NotFound from "./components/NotFound";
import Navigation from "./components/Navigation";
import AddCustomer from "./components/Customer/AddCustomer";
import Login from "./components/Login";
import AddProduct from "./components/Product/AddProduct";
import EditProduct from "./components/Product/EditProduct";
import Customers from "./components/Customer/Customers";
import EditCustomer from "./components/Customer/EditCustomer";
import CustomerDetails from "./components/Customer/CustomerDetails";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";

function App() {
  const { isCartOpen } = useSelector((state) => state.cart);

  return (
    <>
      <ToastContainer />
      <Navigation />

      {/* <Container>
        <Row> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customers/add" element={<AddCustomer />} />
        <Route path="customers/edit/:id" element={<EditCustomer />} />
        <Route path="customers/:id" element={<CustomerDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {isCartOpen && (
        <div id="cart" className="p-3">
          <Cart />
        </div>
      )}
      {/* </Row>
      </Container> */}
    </>
  );
}

export default App;
