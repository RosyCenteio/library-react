import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Books from "./components/pages/Books";
import BookInfo from "./components/pages/BookInfo";
import {books} from './data';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Cart from "./components/pages/Cart";
import { useEffect, useState } from "react";

function App() {

  const [cart,setCart] = useState([]);
  
  
  function addToCart(book){
    setCart([...cart,{ ...book, quantity:1} ]);
  }

  function changeQuantity(book,quantity){
    setCart(
      cart.map((item) =>
        item.id === book.id ? { ...item, quantity: +quantity} : item
      )
    );
  }

  function removeItem(item){
    setCart(cart.filter((cartItem) => cartItem.id !== item.id));
  }

  function numberOfItems(){
    let counter = 0;
    cart.forEach((item) => {
      counter += item.quantity;
    });
    return counter;
  }

  useEffect(() => {
    console.log(cart);
  },[cart])


  return (
    <Router>
      <div className="App">
          <Nav numberOfItems={numberOfItems()}/>
          <Routes>          
            <Route path="/" exact element = {<Home />} /> 
            <Route path="/books" exact element = {<Books  books={books}/>} /> 
            <Route path="/book/:id" element = {<BookInfo  books={books} addToCart={addToCart} cart={cart}/>} /> 
            <Route path="/cart" element = {<Cart  books={books} cart={cart} changeQuantity={changeQuantity} removeItem={removeItem}/>} /> 
          </Routes>
          
          <Footer />
      </div>
    </Router>
  );
}
export default App;
