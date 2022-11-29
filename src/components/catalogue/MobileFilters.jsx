import React, { forwardRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import ProductsContext from '@store/Products-Provider';
import { Filters } from './Filters';
import close from '@assets/close.svg'

const modalRoot = document.getElementById("modal-root");

const StyledFiltersDialog = styled.dialog`
    display:block;
    position: fixed;
    inset: auto 0 0 0;
    z-index:2147483647;
    width: 100%;
    max-width:600px;
	margin-inline: auto;
    transition: opacity 500ms ease;

    &:not([open]){
            pointer-events:none;
            opacity:0;
            animation: var(--animation-slide-out-top) 500ms ease-in forwards;

        }
    &[open]{
            animation: var(--animation-slide-in-bottom) 500ms ease-out forwards;
    }

    & .close{
        position: absolute;
        right:8%;
        top: 5%;
        background:none;
        border:none;
        cursor: pointer;
    }

    & .wrapper{
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        min-height:100vh;
        padding: 1em 2em 2em;
    }
    & .button--group{
        display:flex;
        justify-content:space-between;
        margin-block-end: 1rem;

        & button{
            padding: 1em 1.5em;
        }
    }
`

const MobileFilters = ({ }, ref) => {
    const productsCtx = useContext(ProductsContext);

    const closeDialogHandler = () => {
        ref.current.close();
    }
    const resetFiltersHandler = () => {
        productsCtx.resetFilters();
    }
    return (
        createPortal(<StyledFiltersDialog ref={ref} aria-modal="true">
            <button className='close' onClick={closeDialogHandler}><img src={close} alt='close filters' /></button>
            <div className="wrapper">
                <Filters />
                <div className='button--group'>
                    <button className="btn button--secondary" onClick={resetFiltersHandler}>Reset Filters</button>
                    <button className="btn button--primary" onClick={closeDialogHandler}>Apply Filters</button>
                </div>
            </div>
        </StyledFiltersDialog>, modalRoot)
    )
}

export default forwardRef(MobileFilters)