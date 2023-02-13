function Header(props) {
    return (
        <div className="header d-flex justify-between alighn-center p-40">
            <div className="d-flex align-center">
                <img src="/img/dimir.png" alt=""></img>
                <div className="headerInfo">
                    <h3>Sneakers by React</h3>
                    <p>Best sneakers seller!</p>
                </div>
            </div>
            <ul className="d-flex " onClick = {props.showCart}>
                <li className="mr-30 cu-p ">
                    <img className="cart" src="/img/cart.svg" alt=""></img>
                    <span>55$</span>
                </li>
                <li>
                    <img className="userIcon" src="/img/user-icon.svg" alt=""></img>
                </li>
            </ul>
        </div>
    )

}
export default Header;