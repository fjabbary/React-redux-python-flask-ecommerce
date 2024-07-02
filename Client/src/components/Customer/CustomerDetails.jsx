import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

function CustomerDetails() {
  const { id } = useParams();
  const [customerDetails, setCustomerDetails] = useState({});

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const response = await axios.get(`http://localhost:5000/customers/${id}`);
      setCustomerDetails(response.data);
    };
    fetchCustomerDetails();
  }, []);

  const deliveryDate = (orderDate) => {
    const specificDate = new Date(orderDate);
    let specificDay = specificDate.getDate();
    specificDate.setDate(specificDay + 5);

    return specificDate.toISOString().split("T")[0];
  };

  const { name, email, phone, customer_account, orders } = customerDetails;

  const calcTotalPrice = (associatedProducts) => {
    let total = 0;
    associatedProducts.forEach((p) => {
      total += p.price;
    });
    return total;
  };

  const cancelOrder = async (orderId) => {
    console.log(orderId);
    const res = await axios.post(
      `http://127.0.0.1:5000/orders/cancel/${orderId}`
    );
    alert(res.data.message);
    const response = await axios.get(`http://localhost:5000/customers/${id}`);
    setCustomerDetails(response.data);
  };

  return (
    <div className="my-5 mx-auto w-75 customer-details">
      <h2>Customer Details</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <b>Name: </b> {name}
        </li>
        <li className="list-group-item">
          <b>Email: </b> {email}
        </li>
        <li className="list-group-item">
          <b>Phone: </b> {phone}
        </li>
        <li className="list-group-item">
          <b>
            <h4>Assoicated Orders: </h4>
          </b>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="bg-dark text-white">Order #</th>
                <th className="bg-dark text-white">Order Date</th>
                <th className="bg-dark text-white">Est. Delivery Date</th>
                <th className="bg-dark text-white">Products</th>
                <th className="bg-dark text-white">Total Price</th>
                <th className="bg-dark text-white">Status</th>
                <th className="bg-dark text-white"> Action </th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order, index) => (
                  <tr key={order.order_id}>
                    <td>{index + 1}</td>
                    <td>{order.date}</td>
                    <td>{deliveryDate(order.date)} </td>
                    <td>
                      <ul className="list-group">
                        {order.products.map((product) => (
                          <div key={product.product_id}>
                            <li className="list-group-item order-info">
                              <div>
                                {" "}
                                <b>Product Name: </b>
                                {product.name}{" "}
                              </div>
                              <div>
                                <b>Price:</b> ${product.price}
                              </div>
                            </li>
                          </div>
                        ))}
                      </ul>
                    </td>
                    <td>${calcTotalPrice(order.products)}</td>
                    <td>{order.status}</td>
                    <td className="text-center">
                      {" "}
                      <Button
                        disabled={order.status === "cancelled"}
                        variant="danger"
                        size="sm"
                        onClick={() => cancelOrder(order.order_id)}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </li>
      </ul>

      <Link to="/customers" className="btn btn-sm btn-warning mt-3">
        Back to Customers
      </Link>
    </div>
  );
}

export default CustomerDetails;
