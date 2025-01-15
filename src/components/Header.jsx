import CartContext from "../components/store/CartContext";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import { useContext } from "react";
import UserProgressContext from "./store/UserProgress";
export default function Header() {
  const { items } = useContext(CartContext);
  const ctx = useContext(UserProgressContext);
  const totalCartItems = items.reduce((acc, item) => acc + item.quantity, 0);
  function handleShowCart() {
    ctx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
