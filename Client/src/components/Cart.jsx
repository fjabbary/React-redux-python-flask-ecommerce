import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, removeAllCartItems } from "../features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [totalItems, setTotalItems] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

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

  return (
    <>
      <div className="p-3">
        <h3 className="text-center py-1" style={{ backgroundColor: "#ffc118" }}>
          Cart Summary
        </h3>
        <p>{totalItems} cart items</p>
        {cartItems.length > 0 &&
          cartItems.map((cartItem) => (
            <div
              className="d-flex border bg-white mb-3 rounded p-3 justify-conetent-between"
              key={cartItem.product_id}
            >
              <div className="me-3" id="cart-image">
                <img src={cartItem.image} alt={cartItem.name} />{" "}
              </div>
              <div className="d-flex flex-column justify-content-between">
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
        </div>
      )}
    </>
  );
};

export default Cart;
