import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import { useGetAllCustomersQuery } from "../../features/api/customersApi";
import { useDeleteCustomerMutation } from "../../features/api/customersApi";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const { data, refetch } = useGetAllCustomersQuery();

  const [deleteCustomer] = useDeleteCustomerMutation();
  const handleDeleteCustomer = async (id) => {
    try {
      await deleteCustomer(id);
      refetch();
    } catch (error) {
      alert("Cannot Delete customer since customer has associated order");
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="w-50 mx-auto mt-5">
      {data?.length > 0 ? (
        <div>
          <h2>List of Customers</h2>
          <ListGroup>
            {data?.map((customer) => (
              <ListGroup.Item
                key={customer.customer_id}
                className="bg-light d-flex justify-content-between align-items-center"
              >
                <div>{customer.name}</div>
                <div>
                  <Link
                    className="btn-sm me-3 btn btn-outline-dark"
                    variant="outline-dark"
                    to={`/customers/${customer.customer_id}`}
                  >
                    Customer Details
                  </Link>
                  <Link
                    to={`/customers/edit/${customer.customer_id}`}
                    state={customer}
                  >
                    <i
                      className="bi bi-pencil-square text-primary me-3"
                      title="Edit Customer"
                    ></i>
                  </Link>
                  <i
                    className="bi bi-file-x-fill text-danger"
                    title="Delete Customer"
                    onClick={() => handleDeleteCustomer(customer.customer_id)}
                  ></i>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ) : (
        <h2 className="text-center">Please add customer</h2>
        // <Spinner animation="border" role="status">
        //   {" "}
        // </Spinner>
      )}
    </div>
  );
}

export default Customers;
