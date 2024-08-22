import React, { useReducer } from 'react';
import './App.css';

const conversionRate = 83;

const initialState = {
  cart: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id)
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Shopping Cart</h1>
      </div>

      <div className="content">
        <div className="products">
          <h2>Products</h2>
          <div className="product-list">
            <div className="product-item">
              <button onClick={() => addItem({ id: 1, name: 'Ruby Chocolate', price: 0.99 * conversionRate })}>
                Add Ruby Chocolate (₹{(0.99 * conversionRate).toFixed(2)})
              </button>
            </div>
            <div className="product-item">
              <button onClick={() => addItem({ id: 2, name: 'White Chocolate', price: 0.69 * conversionRate })}>
                Add White Chocolate (₹{(0.69 * conversionRate).toFixed(2)})
              </button>
            </div>
            <div className="product-item">
              <button onClick={() => addItem({ id: 3, name: 'Bittersweet Chocolate', price: 0.79 * conversionRate })}>
                Add Bittersweet Chocolate (₹{(0.79 * conversionRate).toFixed(2)})
              </button>
            </div>
            <div className="product-item">
              <button onClick={() => addItem({ id: 4, name: 'Milk chocolate', price: 2.49 * conversionRate })}>
                Add Milk chocolate (₹{(2.49 * conversionRate).toFixed(2)})
              </button>
            </div>
            <div className="product-item">
              <button onClick={() => addItem({ id: 5, name: 'Dark chocolate', price: 1.99 * conversionRate })}>
                Add Dark chocolate (₹{(1.99 * conversionRate).toFixed(2)})
              </button>
            </div>
          </div>
        </div>

        <div className="cart">
          <h2>Selected Products</h2>
          {state.cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              <div className="cart-labels">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
              </div>
              {state.cart.map(item => (
                <div key={item.id} className="cart-item">
                  <p>{item.name}</p>
                  <p>₹{item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                  </div>
                  <button className="remove-button" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="total">
          <h2>
            Total: ₹
            {state.cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default App;






