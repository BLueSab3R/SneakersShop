import Header from "./Header/Header";
import Cart from "./Cart/Cart";
import { db } from './firebase-config';
import { useEffect, useState, useRef } from "react";
import Favourites from './pages/Favourites'
import { collection, doc, getDocs } from 'firebase/firestore'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from "./pages/Home";
function App() {
  const [isItem, setIsItem] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const itemsCollectionRef = collection(db, "item")
  const [counter, setCounter] = useState(0);
  const [favouriteItem, setFavoiriteItem] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        setIsLoading(true);
        getCartItems();
        getFavouriteItems();
        const item = await getDocs(itemsCollectionRef);
        setIsItem(item.docs.map((item) => ({ ...item.data(), id: item.id })))
      }
      catch (error) {
        throw error;
      }
      finally {
        setIsLoading(false);
      }
    };
    getItems();
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(cartItem);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [cartItem])

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(favouriteItem);
      localStorage.setItem('favourites', json);
    }
    isMounted.current = true;
  }, [favouriteItem])

  const getCartItems = () => {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]))
    }
    if (JSON.parse(localStorage.getItem('cart')).length > 0) {
      setCartItem(JSON.parse(localStorage.getItem('cart')))
    }
  }

  const getFavouriteItems = () => {
    if (!localStorage.getItem('favourites')) {
      localStorage.setItem('favourites', JSON.stringify([]))
    }
    if (JSON.parse(localStorage.getItem('favourites')).length > 0) {
      setFavoiriteItem(JSON.parse(localStorage.getItem('favourites')))
    }
  }

  const removeItemCart = (id) => {
    setCartItem((items) => (items.filter(item => item.id != id)))
    const items = JSON.parse(localStorage.getItem('cart'));
    localStorage.setItem('cart', JSON.stringify(items.filter(item => item.id != id)));
    setCounter(count => count + 1)
    // setCartItem((items) => items.filter(item => item.id != id))
    /*
     items має метод filter ->
    проходить по кожному елменту і шукає співпадіння ->
    проходить пошук усіх id і шукає, той який не дорівнює тому, який передали
     */
  }
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }
  const itemInCart = (item) => {
    const i = cartItem.filter(obj => obj.id === item.id);
    return i.length > 0;
  }

  const onAddtoCart = (obj) => {
    setCartItem((prev) => [...prev, obj]);
    const items = JSON.parse(localStorage.getItem('cart'));
    localStorage.setItem('cart', JSON.stringify([...items, obj]));
  }

  const addToFavourite = (obj) => {
    setFavoiriteItem((prev) => [...prev, obj]);
    const items = JSON.parse(localStorage.getItem('favourites'));
    localStorage.setItem('favourites', JSON.stringify([...items, obj]));
  }


  return (<>
    {!isLoading && (
      <div className="wrapper clear">
        {isCartOpen ? <Cart onRemove={removeItemCart} items={cartItem} closeCart={(() => setIsCartOpen(!isCartOpen))} /> : null}
        <Header showCart={(() => setIsCartOpen(!isCartOpen))} />
        {/* !isCartOpen - це інверсія і тому переводиться у протилежну сторону */}
        <hr></hr>
        <Routes>
          <Route path="/" exact
            element={
              <Home addToFavourite={addToFavourite}
                isItem={isItem}
                counter={counter}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddtoCart={onAddtoCart}
                itemInCart={itemInCart} />
            }
          />
          <Route path="/favourites" exact
            element={<Favourites
              favouriteItem = {favouriteItem}
              onAddtoCart = {onAddtoCart}
              itemInCart={itemInCart}
            />}
          >

          </Route>
        </Routes>

      </div>

    )
    }
  </>)
}

export default App;
