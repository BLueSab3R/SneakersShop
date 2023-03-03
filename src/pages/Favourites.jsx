import style from './Favourites.module.scss'
import React from 'react';
function Favourites({ favouriteItem = [] }) {
    return (
        <>
            <div>
                <div className="d-flex align-center  justify-between mb-40">
                    <h1>Bucket List</h1>
                </div>
                <div className={style.card}>
                    <div>
                        {favouriteItem.length > 0 ?
                            <div>
                                {favouriteItem.map((item) =>
                                    <div className={style.card}>
                                        <img className={style.shoes} src={item.imgUrl} alt="sneakers" />
                                        <h5>
                                            {item.title}
                                        </h5>
                                        <div className="d-flex justify-between align-center">
                                            <div className="d-flex flex-column">
                                                <span>Price:</span>
                                                <b>{item.price}$</b>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            :
                            <div className="align-center d-flex flex flex-column justify-center">
                                <img src='/img/empty-box.svg' />
                                <h2> List is empty </h2>
                                <p>Add atleast one pair of shoes</p>
                            </div>
                        }
                    </div>
                </div>

            </div>


        </>

    )
}


export default Favourites;