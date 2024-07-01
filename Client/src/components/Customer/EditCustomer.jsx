import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  useUpdateCustomerMutation,
  useGetOneCustomerQuery,
} from "../../features/api/customersApi";

function EditCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateCustomer] = useUpdateCustomerMutation();
  const { data } = useGetOneCustomerQuery(id);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (data) {
      setNewCustomer({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        password: data.password || "",
      });
    }
  }, [data]);

  const [feedback, setFeedback] = useState("");
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    const form = event.target;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      await updateCustomer({ id, newCustomer });
      setFeedback(`${newCustomer.name} has been updated`);
      navigate("/customers");
    }
  };

  return (
    <div className="w-50 mx-auto mt-5 border p-5 bg-light">
      <h2>Edit Customer</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={handleChange}
            pattern="^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$"
            required
            value={newCustomer?.name}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Full name must include first and last name and they have to be at
            least 3 characters each (E.g. Jonh Doe)
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={handleChange}
            pattern="[\w.]+@[\w]+[.][a-z]{2,}"
            required
            value={newCustomer?.email}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter a valid email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            onChange={handleChange}
            pattern="[\d]{10}"
            required
            value={newCustomer?.phone}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Phone number has to be 10 digits
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
            pattern="[a-zA-Z0-9]{6,}"
            required
            value={newCustomer?.password}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Password has to be at least 6 characters
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="outline-success" type="submit">
          <b>Update Customer Info</b>
        </Button>
      </Form>

      {feedback && (
        <Alert key="info" variant="info" className="mt-3">
          {feedback}
        </Alert>
      )}
    </div>
  );
}

export default EditCustomer;
