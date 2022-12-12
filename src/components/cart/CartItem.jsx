import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '@store/Cart-Context';
import { ProductsContext } from '@store/Products-Provider';
import Notification from '@components/ui/Notification';
import styled from '@emotion/styled';
import EditQuantityButtons from '@components/catalogue/products/EditQuantityButtons';


const StyledCartItem = styled.li`
    display:flex;
    column-gap: 1em;
    justify-content:space-between;
    align-items: center;
    font-family: 'Cairo';
    font-size: var(--18px);
    font-weight:500;
    margin-block-end: 2em;

    & .product--card{
        flex:1;
        display: flex;
        align-items: center;
        column-gap: 1em;


        & .details{
            flex:1;
            display:flex;
            flex-direction:column;
            gap: .5em;

            & .title{
                text-align: center;
                font-size: var(--18px);
                font-weight:500;
            }
            & .manageQty{
                display:flex;
                justify-content:center;
                position: relative;
                gap: .7em;

                @media screen and (max-width:350px){
                    flex-direction:column;
                }
                p {
                    place-self: center;
                    /* flex: 1; */
                }
                div{
                    flex: 1;
                    max-width:250px;
                }
            }

        }
    }

    & .product--price{
        align-self: flex-end;
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
            setNotificationMsg(`Only ${availableStock} ${availableStock > 1 ? 'units' : 'unit'} available`);
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
            <div className='product--card'>
                <img src={url} alt={title} width="75px" height="75px" loading='lazy' />
                <div className="details">
                    <header className='title'>{gender}'s {title}</header>
                    <div className="manageQty">
                        <p>Qty:</p>
                        <EditQuantityButtons onAdd={addItemToCartHandler} onReduce={removeItemFromCartHandler} unitsInCart={quantity} />
                        {quantityExceeded && <Notification msg={notificationMsg} />}
                    </div>
                </div>
            </div>
            <p className='product--price'>Rs. {price}</p>
        </StyledCartItem >
    )
}

export default CartItem;