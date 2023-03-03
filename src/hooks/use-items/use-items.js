import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { addToStorage, getFromStorage } from '../../utils/localStorage';

export const useItems = () => {
    const itemsCollectionRef = collection(db, 'item');

    const getItems = async () => {
        const docItems = await getDocs(itemsCollectionRef);
        return docItems.docs.map((docItem) => ({ ...docItem.data(), id: docItem.id }));
    }

    const getCartItems = () => {
        if (!getFromStorage('cart')) {
            addToStorage('cart', []);
        }
        if (getFromStorage('cart').length > 0) {
            return getFromStorage('cart');
        }
        return [];
    }

    const getFavouriteItems = () => {
        if (!localStorage.getItem('favourites')) {
            localStorage.setItem('favourites', JSON.stringify([]))
        }
        if (JSON.parse(localStorage.getItem('favourites')).length > 0) {
            return JSON.parse(localStorage.getItem('favourites'));
        }
        return [];
    }

    return {
        getItems,
        getCartItems,
        getFavouriteItems
    }
}