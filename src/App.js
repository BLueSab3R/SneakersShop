import Item from "./Item/Item";
import Header from "./Header/Header";
import Cart from "./Cart/Cart";
import { useState } from "react";
const arr = [
  {title: 'Hoka One One Anacapa Low Gore-Tex 1122017 TEBC', price : 48, imgUrl:'/img/s1.png' },,
  {title: 'New Balance 574 ML574EVB', price : 56, imgUrl:'/img/s2.png'},
  {title: 'Puma X-Ray 2 Square', price : 30, imgUrl:'/img/s3.png'},
  {title: 'Puma ST Runner v3', price : 40, imgUrl:'/img/s4.png'},
]

function App() {
  const[isCart,setIsCart] = useState(false);
  return (    
    <div className="wrapper clear">
      {isCart ? <Cart closeCart = {(() =>setIsCart(!isCart))}/> : null}
      <Header showCart ={( () => setIsCart(!isCart) )} />
      {/* !isCart - це інверсія і тому переводиться у протилежну сторону */}
      <hr></hr> 
      <div className="content p-40 ">
        <div className="d-flex align-center  justify-between mb-40">
          <h1>All sneakers</h1>
          <div className="searchBlock d-flex">
            <img src="/img/search.png" alt="search"></img>
            <input placeholder="Search..."></input>
          </div>
        </div>
        <div className="d-flex">
         {arr.map( (items) => (
          <Item title = {items.name}
          price = {items.price}
          imgUrl = {items.imgUrl}
          />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
