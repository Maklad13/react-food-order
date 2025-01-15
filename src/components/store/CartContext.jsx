import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItem = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const itemsCopy = [...state.items];
    if (existingCartItem > -1) {
      const updatedItem = {
        ...state.items[existingCartItem],
        quantity: state.items[existingCartItem].quantity + 1,
      };
      itemsCopy[existingCartItem] = updatedItem;
    } else {
      itemsCopy.push({ ...action.item, quantity: 1 });
    }
    return {
      ...state,
      items: itemsCopy,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const itemsCopy = [...state.items];
    if (existingCartItem.quantity === 1) {
      itemsCopy.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      itemsCopy[existingCartItemIndex] = updatedItem;
    }
    return {
      ...state,
      items: itemsCopy,
    };
  }
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      items: [],
    };
  }
}
export function CartProvider({ children }) {
  const [cart, cartDispatch] = useReducer(cartReducer, { items: [] });
  function addItem(item) {
    cartDispatch({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    cartDispatch({ type: "REMOVE_ITEM", id });
  }
  function clearCart() {
    cartDispatch({ type: "CLEAR_CART" });
  }
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return <CartContext value={cartContext}>{children}</CartContext>;
}

export default CartContext;
