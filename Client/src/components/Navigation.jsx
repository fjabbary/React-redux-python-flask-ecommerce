import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-dark">
      <Container>
        <Navbar.Brand href="/">Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex navbar-nav justify-content-between w-100">
            <div>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1" className="text-dark">
                  Action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" className="text-dark">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" className="text-dark">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" className="text-dark">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </div>
            <div className="d-flex">
              <Nav.Link href="#home" className="mx-3">
                <i className="bi bi-person-add me-2 text-warning"></i>Register
              </Nav.Link>
              <Nav.Link href="#link" className="mx-3">
                <i className="bi bi-box-arrow-in-right me-2 text-warning"></i>
                Login
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
