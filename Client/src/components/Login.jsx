import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLoginCustomerMutation } from "../features/api/customersApi";
import { useNavigate } from "react-router-dom";
import { setToken } from "../features/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState("");
  const [customerLoginInfo, setCustomerLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [loginCustomer, { data, error, isLoading }] =
    useLoginCustomerMutation();

  const handleChange = (e) => {
    setCustomerLoginInfo({
      ...customerLoginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginCustomer(customerLoginInfo);

      dispatch(setToken(token.data.access_token));
      navigate("/products");
    } catch (error) {
      setErrMsg(error.data.message);
    }
  };

  return (
    <div className="w-50 mx-auto mt-5 border p-5 bg-light">
      <h2 className="text-center">Customer Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={handleChange}
            required
            value={customerLoginInfo.email}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter a valid email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
            required
            value={customerLoginInfo.name}
          />
        </Form.Group>
        <p className="text-danger">
          <small>{errMsg}</small>
        </p>

        <Button variant="success" type="submit">
          <b>Login</b>
        </Button>
      </Form>
    </div>
  );
};

export default Login;
