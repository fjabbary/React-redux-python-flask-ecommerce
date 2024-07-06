import { useGetAllProductsQuery } from "../../features/api/productsApi";

import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Products() {
  const location = useLocation();

  const customer = location.state;
  const { data, error, isError, isLoading, refetch } = useGetAllProductsQuery();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Container className="mt-5 products">
      <Row>
        {data?.length > 0 ? (
          data?.map((product) => (
            <Col key={product.product_id} className="mt-5 ">
              <Card style={{ width: "18rem" }} className="pb-3">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                />
                <Card.Body className="d-flex justify-content-between">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <b>Price:</b> ${product.price}
                  </Card.Text>
                </Card.Body>
                <Container>
                  <Row>
                    <Col>
                      <Button
                        variant="primary"
                        className="w-100"
                        as={Link}
                        to={`/products/${product.product_id}`}
                      >
                        Details
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="outline-warning"
                        className="w-100"
                        as={Link}
                        to={`/products/edit/${product.product_id}`}
                        state={product}
                      >
                        Edit
                      </Button>
                      {customer && (
                        <Button
                          variant="success"
                          className="btn-sm"
                          id="add-to-card"
                          title="Add to Cart"
                          onClick={() => handleAddToCart(product)}
                        >
                          <i className="bi bi-cart4"></i>
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Container>
              </Card>
            </Col>
          ))
        ) : (
          <h2 className="text-center mt-5">
            No product exists. Please add product.
          </h2>
        )}
      </Row>
    </Container>
  );
}

export default Products;
