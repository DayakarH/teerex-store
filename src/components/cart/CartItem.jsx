import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '@store/Cart-Context';
import { ProductsContext } from '@store/Products-Provider';
import Notification from '@components/ui/Notification';
import styled from '@emotion/styled';
import EditQuantityButtons from '@components/catalogue/products/EditQuantityButtons';


const StyledCartItem = styled.li`
    display:flex;
    justify-content:space-between;
    align-items: center;
    font-family: 'Cairo';
    font-size: var(--18px);
    font-weight:500;
    margin-block-end: 2em;

    & .product{
        /* width:100%; */
        flex:1;
        display: flex;
        /* gap: 1em; */
        align-items: center;

        & .details{
            flex:1;
            margin-inline:auto;
            display:flex;
            flex-direction:column;
            gap: .5em;

            /* @media screen and (max-width:900px) and (min-width:600px){
                flex-direction:row;
                justify-content:center;
            } */
            & .title{
                align-self: center;
                font-size: var(--18px);
                font-weight:500;
            }
            & .manageQty{
                display:grid;
                position: relative;
                grid-auto-flow:column;
                grid-template-columns: 2fr 3fr;
                padding-inline: 1em;
                column-gap:1em;

                p {
                    place-self: center;
                }
            }

        }
    }

`;

const CartItem = ({ itemDetails }) => {
    const { id, image: url, title, price, gender, quantity, availableStock } = itemDetails;
    const cartCtx = useContext(CartContext);
    const [quantityExceeded, setQuantityExceeded] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState('');
    const addItemToCartHandler = () => {
        if (availableStock === quantity) {
            setQuantityExceeded(true);
            setNotificationMsg(`Only ${quantity} units are available`);
        } else {
            cartCtx.addItem({
                id,
                gender,
                title,
                price: price / quantity,
                image: url,
                availableStock,
                quantity: 1
            })
        }
    }

    const removeItemFromCartHandler = () => {
        cartCtx.removeItem(id);
    }

    useEffect(() => {
        let timerID;
        if (quantityExceeded) {
            timerID = setTimeout(() => {
                setQuantityExceeded(false);
            }, 4000)
        }
        return (() => { clearTimeout(timerID) })
    }, [quantityExceeded])

    return (
        <StyledCartItem>
            <div className='product'>
                <img src={url} alt={title} width="75px" height="75px" />
                <div className="details">
                    <header className='title'>{gender}'s {title}</header>
                    <div className="manageQty">
                        <p>Qty:</p>
                        <EditQuantityButtons onAdd={addItemToCartHandler} onReduce={removeItemFromCartHandler} unitsInCart={quantity} />
                        {quantityExceeded && <Notification msg={notificationMsg} />}
                    </div>
                </div>
            </div>
            <p>Rs. {price}</p>
        </StyledCartItem >
    )
}

export default CartItem;