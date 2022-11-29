import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '@store/Cart-Context';
import EditQuantityButtons from './EditQuantityButtons';
import Notification from '@components/ui/Notification';
import styled from '@emotion/styled';

const StyledProduct = styled.li`
    background-color: #f8f9fa;
    font-family: 'Cairo', sans-serif;
    font-weight:400;
    padding: 1em;
    box-shadow: var(--shadow-elevation-low);
    border-radius: 2em 2em;
    transition: scale 350ms ease-out, opacity 350ms ease-in-out;
    display: grid;
    gap: .2em;
    min-height:300px;
    grid-template-columns: repeat(2, minmax(0,1fr));
    grid-template-rows: 3fr 1.2fr .8fr;
    grid-template-areas:
            "img img"
            "details details"
            "button button";

    @media screen and (max-width:600px){
        grid-template-rows: 4fr 1.2fr .8fr;
        gap:0;
    }

    & > img{
        grid-area:img;
        border-radius:1em;
        aspect-ratio: 1 / 1;
        /* filter: drop-shadow(0px 0px -7px rgba(0 0 0 / 30%)); */
    }

    & .details{
        grid-area: details;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:center;
        font-weight:bold;
        font-size:var(--18px);
    }

    & > .btn--group{
        grid-area: button;
        font-family: 'Montserrat', sans-serif;
        position:relative;

        & > *{
            width: 100%;
            min-height:100%;
        }

        & > .addToCart{
        width: 100%;
        min-height:100%;
        cursor: pointer;
	    border-style: none;
	    border-radius: 1000vmax;
	    transition: scale 350ms ease-out;
        background-color:#212529;
        color: whitesmoke;
        box-shadow: var(--shadow-elevation-medium);

            &:hover {
	            scale: 1.05;
                }
            &:active {
	            scale: 0.99;
            }

        }
    }
`;

const Product = ({ details }) => {
    const { id, name: title, price, imageURL: url, gender, quantity: availableStock } = details;
    const cartCtx = useContext(CartContext);
    const [quantityExceeded, setQuantityExceeded] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState('');
    const itemAlreadyInCart = cartCtx.items.some(item => item.id === id);
    let unitsInCart;
    if (itemAlreadyInCart) {
        unitsInCart = cartCtx.items.filter(item => item.id === id)[0].quantity;
    }

    const addItemToCartHandler = () => {
        if (unitsInCart && unitsInCart === availableStock) {
            setQuantityExceeded(true);
            setNotificationMsg(`Only ${availableStock} ${availableStock > 1 ? 'units' : 'unit'} available`);
        } else {
            cartCtx.addItem({
                id,
                gender,
                title,
                price,
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
                setNotificationMsg('')
            }, 4000)
        }
        return (() => { clearTimeout(timerID) })
    }, [quantityExceeded])


    return (
        <StyledProduct>
            <img src={url} alt={title} loading='lazy' />
            <div className='details'>
                <p>{title} ({gender}'s)</p>
                <p>Rs. {price}</p>
            </div>
            <div className="btn--group">
                {!itemAlreadyInCart
                    ? <button className="btn addToCart" onClick={addItemToCartHandler}>Add To Cart</button>
                    : <EditQuantityButtons
                        onAdd={addItemToCartHandler}
                        onReduce={removeItemFromCartHandler}
                        unitsInCart={unitsInCart}
                    />
                }
                {quantityExceeded && <Notification msg={notificationMsg} />}
            </div>
        </StyledProduct>
    )
}

export default Product