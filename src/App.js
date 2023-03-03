import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import {useItems} from './hooks';

import Header from "./Header/Header";
import Cart from "./Cart/Cart";
import Home from "./pages/Home";
import Favourites from './pages/Favourites'
import {addToStorage, getFromStorage} from './utils/localStorage';

function App() {
  const [items, setItems] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favouriteItems, setFavouriteItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const {
    getItems,
    getCartItems,
    getFavouriteItems
  } = useItems();

  useEffect(() => {
    (async () => {
      await retrieveItems();
    })();
  }, []);

  const retrieveItems = async () => {
    try {
      setLoading(true);
      setCartItems(getCartItems());
      setFavouriteItems(getFavouriteItems());
      setItems(await getItems());
    }
    catch (error) {
      throw error;
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    addToStorage('cart', cartItems);
  }, [cartItems]);

  useEffect(() => {
    addToStorage('favourites', favouriteItems);
  }, [favouriteItems]);

  const getFromCartStorage = () => {
    return getFromStorage('cart');
  }

  const removeItemCart = (id) => {
    setCartItems((items) => (items.filter(item => item.id != id)))
    const items = getFromCartStorage();
    addToStorage('cart', JSON.stringify(items.filter(item => item.id != id)));
    setCounter(count => count + 1);
  }
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }
  const itemInCart = (item) => {
    const i = cartItems.filter(obj => obj.id === item.id);
    return i.length > 0;
  }

  const onAddToCart = (obj) => {
    setCartItems((prev) => [...prev, obj]);
    const items = getFromCartStorage();
    addToStorage('cart', JSON.stringify([...items, obj]));
  }

  const addToFavourite = (obj) => {
    setFavouriteItems((prev) => [...prev, obj]);
    const items = JSON.parse(localStorage.getItem('favourites'));
    localStorage.setItem('favourites', JSON.stringify([...items, obj]));
  }

  return (<>
    {!isLoading && (
      <div className="wrapper clear">
        {isCartOpen && <Cart
            onRemove={removeItemCart}
            items={cartItems}
            closeCart={(() => setCartOpen(!isCartOpen))}
        />}
        <Header
            showCart={(() => setCartOpen(!isCartOpen))}
        />
        {/* !isCartOpen - це інверсія і тому переводиться у протилежну сторону */}
        <hr></hr>
        <Routes>
          <Route path="/" exact
            element={
              <Home addToFavourite={addToFavourite}
                isItem={items}
                counter={counter}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                itemInCart={itemInCart} />
            }
          />
          <Route path="/favourites" exact
            element={<Favourites
              favouriteItem = {favouriteItems}
            />}
          >
          </Route>
        </Routes>
      </div>
    )}
  </>)
}

export default App;
