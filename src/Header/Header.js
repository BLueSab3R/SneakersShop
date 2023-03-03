import { Link } from 'react-router-dom';
import style from './Header.module.scss'
function Header({ showCart }) {
    return (
        <div className="header d-flex justify-between alighn-center p-40">
            <div className="d-flex align-center">
                <Link to='/' >
                    <img src="/img/dimir.png" alt="logo" />
                </Link>
                <div className="headerInfo ml-30">
                    <h3>Sneakers by React</h3>
                    <p>Best sneakers seller!</p>
                </div>
            </div>
            <ul className="d-flex ">
                <li className="mr-30 cu-p ">
                    <img onClick={showCart} className={style.cart} src="/img/cart.svg" alt=""></img>
                    <span onClick={showCart}>55$</span>
                </li>
                <li className="mr-30 cu-p">
                    <Link to='/favourites'>
                        <img className={style.favourites} alt="favourite" src='/img/heart-unliked.svg' />
                    </Link>
                </li>
                <li>
                    <img className={style.userIcon} src="/img/user-icon.svg" alt="profile"></img>
                </li>
            </ul>
        </div>
    )

}
export default Header;