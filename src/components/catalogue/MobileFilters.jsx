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
    top:0;
    left:0;
    z-index:2147483647;
    height:100vh;
    width: 100%;
    max-width:600px;
	margin-inline: auto;
    transition: opacity 500ms ease;


    &:not([open]){
            pointer-events:none;
            opacity:0;
            animation: var(--animation-slide-out-top) 500ms ease-out forwards;

        }
        &[open]{
            animation: var(--animation-slide-in-bottom) 500ms ease-in forwards;
        }

    & .close{
        position: absolute;
        right:4%;
        top: 4%;
        background:none;
        border:none;
        outline:none;
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
        justify-content:space-around;
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
        createPortal(<StyledFiltersDialog ref={ref}>
            <button className='close' onClick={closeDialogHandler}><img src={close} alt='close filters' /></button>
            <div className="wrapper">
                <Filters />
                <div className='button--group'>
                    <button className="button--secondary" onClick={resetFiltersHandler}>Reset Filters</button>
                    <button className="button--primary" onClick={closeDialogHandler}>Apply Filters</button>
                </div>
            </div>
        </StyledFiltersDialog>, modalRoot)
    )
}

export default forwardRef(MobileFilters)