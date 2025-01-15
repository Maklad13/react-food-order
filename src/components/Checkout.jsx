import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "./store/CartContext";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "./store/UserProgress";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "./hooks/useHttp";
import Error from "./UI/Error";
import { useActionState } from "react";

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const { error, sendRequests, clearData, data } = useHttp(
    "http://localhost:3000/orders",
    config
  );
  const cartTotal = cartCtx.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  function handleClose() {
    userProgressCtx.hideCheckout();
  }
  async function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries());
    await sendRequests(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }
  const [formState, formAction, pending] = useActionState(checkoutAction);
  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "showCheckout"}
        onClose={handleFinish}
      >
        <h2>Success</h2>
        <p>order placed successfully</p>
        <p>our rider will contact with you as soon as your order is ready</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal
      open={userProgressCtx.progress === "showCheckout"}
      onClose={handleClose}
    >
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="failed to place order" message={error} />}
        <p>
          {pending ? (
            <span>Placing order...</span>
          ) : (
            <>
              <Button textOnly type="button" onClick={handleClose}>
                Close
              </Button>
              <Button>Place order</Button>
            </>
          )}
        </p>
      </form>
    </Modal>
  );
}
