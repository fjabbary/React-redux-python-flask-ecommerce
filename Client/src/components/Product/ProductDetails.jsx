import { useGetOneProductQuery } from "../../features/api/productsApi";
import { useDeleteProductMutation } from "../../features/api/productsApi";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState({});

  const { data, isLoading, isError } = useGetOneProductQuery(id);
  const [deleteProduct] = useDeleteProductMutation();

  const handleRemove = async (id) => {
    await deleteProduct(id);
    navigate("/products");
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <Container className="mt-5 mx-auto">
      <Card style={{ width: "80%", margin: "auto" }}>
        <Row>
          <Col md={12} lg={6}>
            <Card.Img variant="top" src={data?.image} />
          </Col>
          <Col md={12} lg={6}>
            <Card.Body>
              <Card.Title>{data?.name}</Card.Title>
              <Card.Text>{data?.description}</Card.Text>
              <Card.Text>
                <b>Price: </b> ${data?.price}
              </Card.Text>
              <div className="mt-5 d-flex justify-content-between">
                <Button variant="success" onClick={() => handleAddToCart(data)}>
                  Add to Cart
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemove(id)}
                >
                  Remove Product
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Button variant="outline-dark" className="mt-5" as={Link} to="/products">
        Back to Products
      </Button>
    </Container>
  );
}

export default ProductDetails;
