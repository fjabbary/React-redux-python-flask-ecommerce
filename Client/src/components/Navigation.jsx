import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../features/cartSlice";

import { removeToken } from "../features/authSlice";
import { ListGroup } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useMemo, useState } from "react";

const Navigation = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [cartTotalItems, setCartTotalItems] = useState(0);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const token = useSelector((state) => state.auth.token) || "";

  useEffect(() => {
    try {
      const user = jwtDecode(token);
      setLoggedInUser(user);
    } catch (error) {
      console.log("error");
    }
  }, [token]);

  const handleRemoveToken = useCallback(() => {
    setTimeout(() => {
      dispatch(removeToken());
      setLoggedInUser({});
    }, 500);
  });

  useMemo(() => {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += item.quantity;
    });
    setCartTotalItems(sum);
  }, [cartItems]);

  return (
    <Navbar expand="lg" className="bg-dark">
      <Container>
        <Navbar.Brand to="/" as={Link}>
          E-Commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex navbar-nav justify-content-between w-100 align-items-center">
            <div className="d-flex">
              <NavDropdown title="Manage Products " className="mx-3">
                <NavDropdown.Item
                  to="products/add"
                  className="text-dark"
                  as={Link}
                >
                  Add Product
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/products"
                  className="text-dark"
                >
                  Display Products
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Manage Customers" className="mx-3">
                <NavDropdown.Item
                  className="text-dark"
                  as={Link}
                  to="/customers/add"
                >
                  Add Customer
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/customers"
                  className="text-dark"
                >
                  Display Customers
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link to="/orders" as={Link}>
                Orders
              </Nav.Link>
            </div>
            <div className="d-flex align-items-center">
              {!loggedInUser.customer_id ? (
                <>
                  <Nav.Link to="/login" className="mx-1" as={Link}>
                    <i className="bi bi-box-arrow-in-right me-2 text-warning"></i>
                    Login
                  </Nav.Link>
                </>
              ) : (
                <>
                  <span className="me-3">
                    <span className="text-white">Hi </span>
                    <span
                      style={{ color: "#ffc118", textDecoration: "underline" }}
                    >
                      {loggedInUser.name.split(" ")[0]}
                    </span>
                  </span>
                  <Nav.Link
                    className="mx-1"
                    as={Link}
                    onClick={handleRemoveToken}
                  >
                    <i className="bi bi-box-arrow-in-left me-2 text-warning"></i>
                    Logout
                  </Nav.Link>
                </>
              )}
              <Nav.Link className="mx-3" as={Link}>
                <i
                  className="bi bi-handbag-fill"
                  onClick={() => dispatch(toggleCart())}
                >
                  <span className="ms-1" id="cart-items-count">
                    {cartTotalItems}
                  </span>
                </i>
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
