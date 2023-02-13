import styles from './Item.module.scss';
import React from 'react';
function Item(props) {
 const [isAdded, setIsAdded] = React.useState(false);

 const onClickAdd = () => {
  setIsAdded(!isAdded);
 };

 React.useEffect( () =>{
  console.log();
 },[isAdded])
 /*[] - я вказую, що саме я відслідковую
 useEffect виконує код всередині
 Реагує на на зміну пропса або стейту 
*/


  return(
  <div className={styles.card}>
    <div className={styles.noFavourite} >
      <img onClick = {props.onClickFavourite} src="/img/heart-unliked.svg" alt="btn unlike" />
    </div>
    <img className={styles.shoes} src= {props.imgUrl} alt="sneakers"></img>
    <h5>
      {props.name}
    </h5>
    <div className="d-flex justify-between align-center">
      <div className="d-flex flex-column">
        <span>Price:</span>
        <b>{props.price}$</b>
      </div>
      <button className={styles.addToCart} onClick={onClickAdd}>
        <img  className="addToCart" src={isAdded ? '/img/checked.svg' : "/img/plus.png" } alt="Plus"></img>
      </button>
    </div>
  </div>

  )
}

export default Item; 