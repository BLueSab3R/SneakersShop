import Item from "./Item/Item";
import Header from "./Header/Header";
import Cart from "./Cart/Cart";
import { db } from './firebase-config';
import { useEffect, useState, useRef } from "react";
import { collection, doc, getDocs } from 'firebase/firestore'
function App() {
  const [isItem, setIsItem] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const itemsCollectionRef = collection(db, "item")
  useEffect(() => {
    const getItems = async () => {
      try {
        setIsLoading(true);
        if (localStorage.getItem('cartItem') != null){
          localStorage.setItem('cartItem', JSON.parse(JSON.stringify(cartItem)));
          const localCartItem = localStorage.getItem('cartItem')
          setCartItem(localCartItem);
        }
        const item = await getDocs(itemsCollectionRef);
        setIsItem(item.docs.map((item) => ({ ...item.data(), id: item.id })))
        // const item = await getDocs(itemsCollectionRef);
        // setIsItem(item.docs.map((item) => ({ ...item.data(), id: item.id })))
        // localStorage.setItem('cartItem', JSON.parse(JSON.stringify(cartItem)));
        // const localCartItem = localStorage.getItem('cartItem')
        // setCartItem(localCartItem);
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


  const onAddtoCart = (obj) => {
    setCartItem((prev) => [...prev, obj]);
    console.log(obj.id);
  }
  const removeItemCart = (id) => {
    setCartItem((items) => (items.filter(item => item.id != id)))
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
  const onAddToFavourite = (obj) => {

  }
  // isItem.filter((items) => {
  //   console.log(items.title.toLowerCase().includes('nike'))
  // })
  // items = {cartItem}
  return (<>
    {!isLoading && (
      <div className="wrapper clear">
        {isCartOpen ? <Cart onRemove={removeItemCart} items={cartItem} closeCart={(() => setIsCartOpen(!isCartOpen))} /> : null}
        <Header showCart={(() => setIsCartOpen(!isCartOpen))} />
        {/* !isCartOpen - це інверсія і тому переводиться у протилежну сторону */}
        <hr></hr>
        <div className="content  p-40 ">
          <div className="d-flex align-center  justify-between mb-40">
            <h1>{searchValue ? `Search by request:"${searchValue}" ` : "All sneakers"}</h1>
            {/* якщо хочаб щось є searchValue */}
            <div className="searchBlock d-flex">
              <img src="/img/search.png" alt="search"></img>
              {searchValue && <img onClick={() => { setSearchValue('') }}
                className="clear cu-p"
                src='/img/remove-button.svg'
                alt='Remove' />}
              <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..."></input>
            </div>
          </div>
          {isItem.length > 0 &&
            <div className="d-flex flex-wrap">
              {isItem.filter(items => items.title.toLowerCase().includes(searchValue.toLowerCase()))
                .map((items, index) => (
                  /*
                  isItem використовую метод fitler
                  створюю колбек items, потім використовую метод includes до імені
                  метод toLowerCase є лише на момент методу filter, далі не передається
                  повертає items, які мають значення true 
                  */
                  <Item
                    key={index}
                    title={items.title}
                    price={items.price}
                    imgUrl={items.imgUrl}
                    id={items.id}
                    addToCart={(obj) => onAddtoCart(obj)}
                  />
                ))}
            </div>
          }
        </div>
      </div>

    )}
  </>)
}

export default App;
