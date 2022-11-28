import React, { useContext, useRef } from 'react';
import cart from '@assets/shopping-bag.svg'
import CartDetails from './CartDetails';
import styled from '@emotion/styled';
import { CartContext } from '@store/Cart-Context';

const StyledCart = styled.div`
    cursor: pointer;
    color: #f8f9fa;

    & > img{
        display:inline;
    }
    & > sup{
        position: relative;
        font-size:var(--16px);
        bottom:30%;
        left:20%;
    }
`

const Cart = () => {
    const cartRef = useRef();
    const cartCtx = useContext(CartContext);
    console.log(cartCtx);
    const displayCartHandler = () => {
        cartRef.current.showModal();
    }
    return (
        <>
            <StyledCart onClick={displayCartHandler}>
                <img src={cart} />
                <sup>{cartCtx.totalItems > 0 ? cartCtx.totalItems : ''}</sup>
            </StyledCart>
            <CartDetails ref={cartRef} items={cartCtx.items} total={cartCtx.total} />
        </>
    )
}

export default Cart