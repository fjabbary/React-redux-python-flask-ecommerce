import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";

import { useGetOneProductQuery } from "../../features/api/productsApi";
import { useUpdateProductMutation } from "../../features/api/productsApi";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [show, setShow] = useState(false);

  const { data } = useGetOneProductQuery(id);
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (data) {
      setNewProduct(data);
    }
  }, [data]);

  const handleClose = () => {
    setShow(false);
    navigate("/products");
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    delete newProduct.product_id;
    updateProduct({ id, ...newProduct });
    setShow(true);
  };

  return (
    <Container className="mt-5 w-50">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                value={newProduct?.name}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                name="price"
                onChange={handleChange}
                value={newProduct?.price}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image"
            onChange={handleChange}
            value={newProduct?.image}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            onChange={handleChange}
            value={newProduct?.description}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Update Product
        </Button>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>{newProduct?.name} value has been updated</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose} className="border-0">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default EditProduct;
