import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  removeAllCartItems,
  closeCart,
} from "../features/cartSlice";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { useAddOrderMutation } from "../features/api/ordersApi";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const [totalItems, setTotalItems] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [addOrder, { isLoading }] = useAddOrderMutation();

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };

  useEffect(() => {
    let sum = 0;
    let sumAmount = 0;
    cartItems.forEach((item) => (sum += item.quantity));
    cartItems.forEach((item) => (sumAmount += item.quantity * item.price));

    setTotalItems(sum);
    setTotalCost(sumAmount);
  }, [cartItems]);

  const todayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    return formattedDate;
  };

  const handleCheckout = async () => {
    const user = jwtDecode(token);

    const myOrder = {
      customer_id: user.customer_id,
      date: todayDate(),
      products: cartItems,
    };
    // myOrder.products.forEach((item) => delete item.quantity);
    const updatedProducts = myOrder.products.map((item) => {
      const { quantity, ...rest } = item; // Destructure to exclude 'quantity'
      return rest;
    });

    myOrder.products = updatedProducts;
    await addOrder(myOrder);
    dispatch(removeAllCartItems());
    dispatch(closeCart());
    alert("Order placed successfully!");
  };

  return (
    <>
      <div className="p-3">
        <p
          className="text-center py-1"
          style={{
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "7px",
            fontSize: "24px",
          }}
        >
          Cart Summary
        </p>
        <p>{totalItems} cart items</p>
        {cartItems.length > 0 &&
          cartItems.map((cartItem) => (
            <div
              className="d-flex border bg-white mb-3 rounded p-3 justify-conetent-beatween"
              key={cartItem.product_id}
            >
              <div className="me-3" id="cart-image">
                <img src={cartItem.image} alt={cartItem.name} />{" "}
              </div>
              <div className="d-flex flex-column justify-content-around">
                <div>
                  <b>Product Name: </b>
                  {cartItem.name}{" "}
                  {cartItem.quantity > 0 && (
                    <span> &times; {cartItem.quantity}</span>
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <b>Price: </b>${cartItem.price}
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemove(cartItem)}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {cartItems.length === 0 && (
          <p className="text-center mt-5">No item in cart!</p>
        )}
      </div>
      {cartItems.length !== 0 && (
        <div>
          <p>
            <b>
              <i>Total Cost:</i>
            </b>{" "}
            ${totalCost}
          </p>
          <hr />
          <button
            className="btn btn-outline-dark"
            onClick={() => dispatch(removeAllCartItems())}
          >
            Clear Cart
          </button>

          <div className="mx-auto text-center mt-5">
            {!token ? (
              <Link to="/login">
                <button
                  className="btn btn-lg btn-warning w-75"
                  onClick={() => dispatch(closeCart())}
                >
                  <i className="bi bi-lock-fill"></i> Login to Checkout
                </button>
              </Link>
            ) : (
              <button
                className="btn btn-lg btn-warning w-75"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
