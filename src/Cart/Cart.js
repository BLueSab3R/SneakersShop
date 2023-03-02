function Cart({ closeCart, onRemove, items = [] }) {
    return (
        <div className="overlay" >
            <div className="drawer d-flex" >
                <h2 className="d-flex mb-30 justify-between ">
                    Cart
                    <img onClick={closeCart} className="closeCart cu-p" src="/img/remove-button.svg"></img>
                </h2>
                {items.length > 0 ? (
                    <div>
                        <div className="items">
                            {items.map((item) =>
                                <div key={item.id} className="cartItem d-flex align-center mb-20">
                                    <div style={{ backgroundImage: `url(${item.imgUrl})` }}
                                        className="cartItemImg mr-20"
                                    ></div>
                                    <div className="mr-20 flex">
                                        <p className="mb-5">{item.title}</p>
                                        <b>{item.price}$</b>
                                    </div>
                                    <img onClick={() => onRemove(item.id)}
                                        className="clear removeItem cu-p"
                                        src='/img/remove-button.svg'
                                        alt='Remove' />
                                </div>
                            )}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li className="d-flex">
                                    <span>Total:</span>
                                    <div></div>
                                    <b>70$</b>
                                </li>
                                <li className="d-flex">
                                    <span>Taxes 5%: </span>
                                    <div></div>
                                    <b>3.5</b>
                                </li>
                            </ul>
                            <button className="greenButton">
                                Make order <img className="removeItem" src='/img/right-button-with-arrow-svgrepo-com.svg' alt='Remove' />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="cartEmpty align-center d-flex flex flex-column justify-center">
                        <img src='/img/empty-box.svg' />
                        <h2> Cart is empty </h2>
                        <p>Add atleast one pair of shoes</p>
                        <button onClick={closeCart} className="greenButton">
                            Go back
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart;