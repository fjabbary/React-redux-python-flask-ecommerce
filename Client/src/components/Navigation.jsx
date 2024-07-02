import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../features/cartSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
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
            </div>
            <div className="d-flex align-items-center">
              <Nav.Link to="/customers/add" className="mx-1" as={Link}>
                <i className="bi bi-person-add me-2 text-warning"></i>Register
              </Nav.Link>
              <Nav.Link to="/login" className="mx-1" as={Link}>
                <i className="bi bi-box-arrow-in-right me-2 text-warning"></i>
                Login
              </Nav.Link>
              <Nav.Link className="mx-3" as={Link}>
                <i
                  className="bi bi-handbag-fill"
                  onClick={() => dispatch(toggleCart())}
                >
                  {" "}
                  <span id="cart-items-count">{cartItems.length}</span>
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
