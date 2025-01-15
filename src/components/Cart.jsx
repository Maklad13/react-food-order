import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "./store/CartContext";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "./store/UserProgress";
import Button from "./UI/Button";
import CartItem from "./CartItem";

export default function Cart() {
  const { items, addItem, removeItem } = useContext(CartContext);
  const ctx = useContext(UserProgressContext);
  const cartTotal = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  function handleCloseCart() {
    ctx.hideCart();
  }
  function handleGoToCheckout() {
    ctx.showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={ctx.progress === "showCart"}
      onClose={ctx.progress === "showCart" ? handleCloseCart : null}
    >
      <h2>Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => addItem(item)}
            onDecrease={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
