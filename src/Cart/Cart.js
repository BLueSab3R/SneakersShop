function Cart(props) {
    return (
        <div className="overlay" >
            <div className="drawer d-flex" >
                <h2 className="d-flex mb-30 justify-between ">Cart
                    <img onClick={props.closeCart} className="closeCart cu-p" src="/img/remove-button.svg"></img></h2>
                <div className="items">
                    <div className="cartItem d-flex align-center mb-20">
                        <div style={{ backgroundImage: 'url(/img/s1.png)' }}
                            className="cartItemImg mr-20"
                        ></div>
                        <div className="mr-20 flex">
                            <p className="mb-5">Hoka One One Anacapa Low Gore-Tex 1122017 TEBC</p>
                            <b>70$</b>
                        </div>
                        <img className="removeItem" src='/img/remove-button.svg' alt='Remove'></img>
                    </div>
                    <div className="cartItem d-flex align-center mb-20">
                        <div style={{ backgroundImage: 'url(/img/s1.png)' }}
                            className="cartItemImg mr-20"
                        ></div>
                        <div className="mr-20 flex">
                            <p className="mb-5">Hoka One One Anacapa Low Gore-Tex 1122017 TEBC</p>
                            <b>70$</b>
                        </div>
                        <img className="removeItem" src='/img/remove-button.svg' alt='Remove'></img>
                    </div>

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
                        Make order <img className="removeItem" src='/img/right-button-with-arrow-svgrepo-com.svg' alt='Remove'></img>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Cart;