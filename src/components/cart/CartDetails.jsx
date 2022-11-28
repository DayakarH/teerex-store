import React, { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import CartItem from './CartItem';
import styled from '@emotion/styled';

const StyledCartDetails = styled.dialog`
        display:block;
        position: fixed;
        inset: 0 0 0 auto;
        min-height: 100vh;
        min-width:45%;
        border:none;
        overflow-y:hidden;
        box-shadow: var(--shadow-elevation-high);
        transition: opacity 500ms ease;

        &:not([open]){
            pointer-events:none;
            opacity:0;
            animation: var(--animation-slide-out-right) 500ms ease-in forwards;

        }
        &[open]{
            animation: var(--animation-slide-in-right) 500ms ease-out forwards;
        }

        @media screen and (max-width:900px){
            min-width:100%;
        }

        & .wrapper{
            margin-block: 2rem;

            & ul{
            overflow:auto;
            max-height:60vh;
            list-style:none;

                & li{
                    margin-block-end: 2rem;
                }
            }

            & .cta{
                display:flex;
                flex-direction:column;
                gap:1.5em;

                & .total{
                    display: flex;
                    justify-content: space-between;
                    font-size: var(--20px);
                    font-weight:600;
                }

                & .button-group{
                    display: flex;
                    flex-direction:column;
                    gap: 1.2rem;
                    font-size: var(--18px);

                    & button{
                        padding: .3rem .9rem;
                        transition: transform 350ms ease;
                    }

                    & >*:hover{
                        transform: scale(1.1);
                    }
           }
        }
    }
`;

const CartDetails = ({ items, total }, ref) => {
    let content;
    const closeCartHandler = (evt) => {
        evt.stopPropagation();
        ref.current.close();
    }
    if (items.length) {
        content = <>
            <ul>
                {items.map(item => <CartItem key={item.id} itemDetails={item} />)}
            </ul>
            <div className="cta">
                <div className="total">
                    <p>Total</p>
                    <p>Rs.{total}</p>
                </div>
                <div className="button-group">
                    <button onClick={closeCartHandler} className="button--secondary">Continue shopping</button>
                    <button className='button--primary'>Proceed to checkout</button>
                </div>
            </div>
        </>
    } else {
        content = <>
            <p>Cart is empty. Please click below button to view the catalogue</p>
            <button onClick={closeCartHandler} className="button--secondary">Go back</button>
        </>
    }
    return (
        createPortal(<StyledCartDetails ref={ref}>
            <div className="container wrapper">
                {content}
            </div>
        </StyledCartDetails>, document.getElementById("modal-root"))
    )
}

export default forwardRef(CartDetails);