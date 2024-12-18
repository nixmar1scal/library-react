import Footer from "./components/Footer";
import Nav from "./components/Nav";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import Home from "./components/pages/Home";
import Books from "./components/pages/Books";
import { books } from "./data";
import BookInfo from "./components/pages/BookInfo";
import Cart from "./components/pages/Cart";
import { useEffect, useState } from "react";


function App() {
  const [cart, setCart] = useState([]);

  // 1:56:56
  function addToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }]);
  }

  //2:05:35
  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) =>
        item.id === book.id
          ? {
              ...item,
              quantity: +quantity,
            }
          : item
      )
    );
  }

  //2:18:30
  function removeItem(item) {
    setCart(cart.filter(book => book.id !== item.id))
    console.log("remove", item);
  }

  // 2:25:45
  function numOfItems() {
    let counter = 0;
    cart.forEach(book => {
      counter += book.quantity
    })
    return counter;
  }

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <Router>
      <div className="App">
        <Nav numOfItems={numOfItems()}/>
        <Route path="/" exact component={Home} />
        <Route path="/books" exact render={() => <Books books={books} />} />
        <Route
          path="/books/:id"
          render={() => (
            <BookInfo books={books} addToCart={addToCart} cart={cart} />
          )}
        />
        <Route
          path="/cart"
          render={() => (
            <Cart
              books={books}
              cart={cart}
              changeQuantity={changeQuantity}
              removeItem={removeItem}
            />
          )}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

//2:04:00 adding items to affect price
