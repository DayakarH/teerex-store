import React, { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import CartItem from './CartItem';
import styled from '@emotion/styled';

const StyledCartDetails = styled.dialog`
        --shadow-color: 209deg 12% 30%;
        display:block;
        position: fixed;
        inset: 0 0 0 auto;
        z-index:2147483647;
        min-height: 100vh;
        min-width:45%;
        border:none;
        overflow-y:hidden;


        box-shadow:
            -0.7px 0.7px 1.1px hsl(var(--shadow-color) / 0.36),
            -2.2px 2.2px 3.5px -0.8px hsl(var(--shadow-color) / 0.36),
            -5.4px 5.4px 8.6px -1.7px hsl(var(--shadow-color) / 0.36),
            -13.2px 13.2px 21px -2.5px hsl(var(--shadow-color) / 0.36);
        transition: opacity 500ms ease;

        &:not([open]){
            pointer-events:none;
            opacity:0;
            animation: var(--animation-slide-out-right);

        }
        &[open]{
            animation: var(--animation-slide-in-right);
        }

        @media screen and (max-width:900px){
            min-width:100%;
        }

        & .wrapper{
            margin-block: 2rem;

            & ul{
            overflow:auto;
            max-height:60vh;
            scrollbar-gutter: stable;
            -webkit-scrollbar-width:thin;
            scrollbar-width:thin;
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
                {items.map(item => <CartItem key={item.id} id={item.id} url={item.image} title={item.title} price={item.price} gender={item.gender} />)}
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