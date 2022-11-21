import { createContext, useReducer, useEffect } from "react";

const ACTIONS = {
    'ADD_ITEM': 'add',
    'REMOVE_ITEM': 'remove'
}

const cartReducer = (state, { type, payload }) => {
    if (type === ACTIONS['ADD_ITEM']) {
        const isItemAlreadyInCart = state.items.findIndex(item => item.id === payload.id) !== -1;
        let updatedItems;
        if (isItemAlreadyInCart) {
            const indexOfExistingItem = state.items.findIndex(item => item.id === payload.id);
            const existingItem = state.items[indexOfExistingItem];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
                price: Math.floor(existingItem.price + payload.price)
            }
            updatedItems = [...state.items];
            updatedItems[indexOfExistingItem] = updatedItem;
        } else {
            updatedItems = state.items.concat(payload);
        }
        return {
            ...state,
            items: updatedItems,
            total: Math.floor(state.total + payload.price),
            totalItems: state.totalItems + 1
        }
    } else if (type === ACTIONS['REMOVE_ITEM']) {
        const indexOfItemGettingReduced = state.items.findIndex(
            (item) => item.id === payload);
        const itemGettingReduced = state.items[indexOfItemGettingReduced];
        const priceOfSingleUnitOfReducedItem = itemGettingReduced.price / itemGettingReduced.quantity
        const updatedTotalAmount = state.total - priceOfSingleUnitOfReducedItem;
        let updatedItems;
        if (itemGettingReduced.quantity === 1) {
            updatedItems = state.items.filter(item => item.id !== payload);
        } else {
            const updatedItem = {
                ...itemGettingReduced,
                quantity: itemGettingReduced.quantity - 1,
                price: Math.floor(itemGettingReduced.price - priceOfSingleUnitOfReducedItem)
            };
            updatedItems = [...state.items];
            updatedItems[indexOfItemGettingReduced] = updatedItem;
        }
        return {
            items: updatedItems,
            total: Math.floor(updatedTotalAmount),
            totalItems: state.totalItems - 1
        };
    } else {
        return state;
    }
}

const initialCartState = {
    items: [],
    total: 0,
    totalItems: 0
}
const initialCartData = () => {
    const cartData = localStorage.getItem('cartData');
    return cartData ? JSON.parse(cartData) : initialCartState
}


export const CartContext = createContext({
    items: [],
    total: 0,
    totalItems: 0,
    addItem: (item) => { },
    removeItem: (id) => { }
});

const CartContextProvider = ({ children }) => {
    const [cartStateData, dispatchCartAction] = useReducer(cartReducer, null, initialCartData);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'add', payload: item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'remove', payload: id });
    };

    const cartContextValue = {
        items: cartStateData.items,
        total: cartStateData.total,
        totalItems: cartStateData.totalItems,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    useEffect(() => {
        localStorage.setItem('cartData', JSON.stringify(cartContextValue));
    }, [cartContextValue])
    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    )
}


export default CartContextProvider;