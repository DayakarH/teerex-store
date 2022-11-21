import React, { useContext } from 'react';
import { CartContext } from '@store/Cart-Context';
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

const CartItem = ({ id, url, title, price, gender }) => {
    const cartCtx = useContext(CartContext);
    const itemAlreadyInCart = cartCtx.items.some(item => item.id === id);
    let unitsInCart;
    if (itemAlreadyInCart) {
        unitsInCart = cartCtx.items.filter(item => item.id === id)[0].quantity;
    }
    const addItemToCartHandler = () => {
        cartCtx.addItem({
            id,
            gender,
            title,
            price,
            image: url,
            quantity: 1
        })
    }

    const removeItemFromCartHandler = () => {
        cartCtx.removeItem(id);
    }
    return (
        <StyledCartItem>
            <div className='product'>
                <img src={url} alt={title} width="75px" height="75px" />
                <div className="details">
                    <header className='title'>{gender}'s {title}</header>
                    <div className="manageQty">
                        <p>Qty:</p>
                        <EditQuantityButtons onAdd={addItemToCartHandler} onReduce={removeItemFromCartHandler} unitsInCart={unitsInCart} />
                    </div>
                </div>
            </div>
            <p>Rs. {price}</p>
        </StyledCartItem >
    )
}

export default CartItem;