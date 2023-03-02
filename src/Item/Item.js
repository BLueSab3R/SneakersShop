import styles from './Item.module.scss';
import React from 'react';
function Item({title, price, imgUrl,id, addToCart, inCart, addToFavourite}) {
const [isAdded, setIsAdded] = React.useState(inCart);
const[isFavourite,setIsFavourite ] = React.useState(false);
 const onClickAdd = () => {
  addToCart({title, price, imgUrl, id});
  setIsAdded(!isAdded);
 };
 const onClickFavourite = () =>{
  addToFavourite({title, price, imgUrl, id});
  setIsFavourite(!isFavourite);
 }
 React.useEffect( () =>{
  console.log();
 },[isAdded])
 /*[] - я вказую, що саме я відслідковую
 useEffect виконує код всередині
 Реагує на на зміну пропса або стейту 
*/
  return(
  <div  className={styles.card}>
    <div className={styles.noFavourite} >
      <img onClick={onClickFavourite}  src = {isFavourite ? "/img/favourite.jpg" : "/img/heart-unliked.svg"} alt="btn unlike" />
    </div>
    <img className={styles.shoes} src= {imgUrl} alt="sneakers"/>
    <h5>
      {title}
    </h5>
    <div className="d-flex justify-between align-center">
      <div className="d-flex flex-column">
        <span>Price:</span>
        <b>{price}$</b>
      </div>
      <button className={styles.addToCart} onClick={onClickAdd}  >
        <img className="addToCart" src={isAdded ? '/img/checked.svg' : "/img/plus.png" } alt="Plus"></img>
      </button>
    </div>
  </div>
  )
}

export default Item; 