import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="p-3">
      <h3 className="text-center">Cart Summary</h3>
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
                  <button className="btn btn-sm btn-danger">X</button>
                </div>
              </div>
            </div>
          </div>
        ))}

      {cartItems.length === 0 && (
        <p className="text-center mt-5">No item in cart!</p>
      )}
    </div>
  );
};

export default Cart;
