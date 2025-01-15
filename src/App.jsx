import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartProvider } from "./components/store/CartContext";
import { UserProgressProvider } from "./components/store/UserProgress";
function App() {
  return (
    <UserProgressProvider>
      <CartProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartProvider>
    </UserProgressProvider>
  );
}

export default App;
