import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductDetails from '../components/Product/ProductDetails';
import { addToCart } from '../features/cartSlice';
// import * as apiHooks from '../../features/api/productsApi';

const mockStore = configureStore([]);
const initialState = {
  cart: {
    isCartOpen: false,
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  },
};

// jest.mock('../../features/api/productsApi');

describe('ProductDetails', () => {
  let store;
  let mockProduct;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();

    mockProduct = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      image: 'test-image.jpg',
    };

    apiHooks.useGetOneProductQuery.mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
    });
  });

  test('adding an item to the cart updates the total price', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
        </Router>
      </Provider>
    );

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    expect(store.dispatch).toHaveBeenCalledWith(addToCart(mockProduct));

    // Verify the updated total price in the cart
    const actions = store.getActions();
    const addToCartAction = actions.find(action => action.type === 'cart/addToCart');
    expect(addToCartAction).not.toBeUndefined();
    expect(addToCartAction.payload).toEqual(mockProduct);

    // Assuming cart total amount gets updated correctly by addToCart reducer
    const updatedState = store.getState();
    const expectedTotalAmount = mockProduct.price;
    expect(updatedState.cart.cartTotalAmount).toBe(expectedTotalAmount);
  });
});
