import React, { useState, useRef, useContext } from 'react';
import ProductsContext from '@store/Products-Provider';
import styled from '@emotion/styled';
import search from '@assets/search.svg';
import filter from '@assets/filter.svg';
import MobileFilters from './MobileFilters';

const StyledInputContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    gap: 1em;
    margin-block-end: 2rem;

`
const StyledForm = styled.form`
        width: fit-content;
        padding-block-end: .2em;
        display:flex;
        gap: .3rem;
        border-bottom: 1.1px solid #777;

    & input{
        border: none;
        outline: none;
        background:none;
    }
    & button{
        display:inline-block;
        background: none;
        border: none;
        cursor: pointer;
        align-self:flex-end;
    }
`;
const StyledMobileFilter = styled.button`
        background-color: #212529;
         font-family: 'Cairo', sans-serif;
        font-weight:400;
        font-size:var(--18px);
        color: #dee2e6;
        padding:.2em .8em;
        border: none;
        border-radius:1000vmax;
        cursor: pointer;
        display:flex;
        gap:.3em;
        justify-content:center;
        align-items:flex-end;

    & > img{
        display:inline-block;
    }

    @media screen and (min-width:1200px){
         clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }
`

const Search = () => {
    const productsCtx = useContext(ProductsContext);
    const userInputRef = useRef();
    const filtersRef = useRef();

    const showFilterHandler = () => filtersRef.current.showModal();
    const inputChangeHandler = evt => {
        if (evt.target.value === '') productsCtx.searchCatalogue('');
    }
    const formSubmitHandler = evt => {
        evt.preventDefault();
        const enteredInput = userInputRef.current.value.split(' ');
        const formattedInputArr = [];
        for (let word of enteredInput) {
            formattedInputArr.push(`${word[0].toUpperCase()}${word.slice(1)}`)
        };
        productsCtx.searchCatalogue(formattedInputArr.join(' '));
    }

    return (
        <StyledInputContainer>
            <StyledForm onSubmit={formSubmitHandler}>
                <div className="form-group">
                    <label className="visually-hidden" htmlFor='search'>Search:</label>
                    <input ref={userInputRef} type="text" placeholder='Search here' id='search' onChange={inputChangeHandler} />
                </div>
                <button type='submit'>
                    <img src={search} alt="search" />
                </button>
            </StyledForm>
            <StyledMobileFilter onClick={showFilterHandler}>Filters<img src={filter} alt="filter" /></StyledMobileFilter>
            <MobileFilters ref={filtersRef} />
        </StyledInputContainer>
    )
}

export default Search;