import React, { useRef, useContext } from 'react';
import { ProductsContext } from '@store/Products-Provider';

import styled from '@emotion/styled';

const StyledFilterItem = styled.li`
    display: flex;
    align-items: center;
    gap: .7rem;

    & > input{
    width: 20px;
    height: 20px;
    /* border-radius: 50%; */
    transition: box-shadow .3s;
    background: lightgrey;
    cursor: pointer;
    border: 0;
    appearance: none;
    -webkit-appearance: none;
    }

    & input:checked{
        box-shadow: inset 0 0 0 10px black;
    }

    & > label{
        font-weight:400;
    }
`


const FilterItem = ({ filter, category }) => {
    const productsCtx = useContext(ProductsContext);
    const inputChangeHandler = evt => {
        console.log('first');
        productsCtx.setFilter({ category, filter, isChecked: evt.target.checked });
    }
    return (
        <StyledFilterItem>
            <input type='checkbox' id={filter} onChange={inputChangeHandler} value={filter} />
            <label htmlFor={filter}>{filter}</label>
        </StyledFilterItem>
    )
}

const StyledFiltersContainer = styled.div`
    max-height: ${props => `${props.maxHeight}px`};
    transition: max-height 300ms ease-in-out;
    overflow: hidden;
`

const FiltersList = ({ isFilterExpanded, filters, filterCategory }) => {
    const contentRef = useRef();
    const contentHeight = isFilterExpanded ? contentRef.current.scrollHeight : 0;
    return (
        <StyledFiltersContainer maxHeight={contentHeight}>
            <ul ref={contentRef}>
                {filters.map(filter => <FilterItem key={filter} filter={filter} category={filterCategory} />)}
            </ul>
        </StyledFiltersContainer>
    )
}
export default FiltersList;