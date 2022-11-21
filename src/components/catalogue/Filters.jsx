import React, { useState, useRef, useCallback } from 'react';
import Chevron from '@ui/Chevron';
import FiltersList from './FiltersList';
import styled from '@emotion/styled';

const StyledAccordionContainer = styled.div`
    margin-block-end: 1em;

    & > div{
        display: flex;
        justify-content: space-between;
        margin-block-end: .5em;

     &   > h4{
        font-weight:500;
        text-transform: capitalize;
        }

        & button{
            background: none;
            border: none;
            outline:none;
        }
    }

`
const FilterType = ({ category, filters }) => {
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const toggleHandler = useCallback(() => {
        setIsFilterExpanded(prevVal => !prevVal);
    }, [setIsFilterExpanded]);

    return (
        <StyledAccordionContainer>
            <div>
                <h4>{category}</h4>
                <button onClick={toggleHandler}><Chevron isFilterExpanded={isFilterExpanded} /></button>
            </div>
            <FiltersList filters={filters} isFilterExpanded={isFilterExpanded} filterCategory={category === 'price' ? 'priceRange' : category} />
        </StyledAccordionContainer>
    )
}

const StyledFilters = styled.div`
    & > h3{
    margin-block-end: .7em;
    font-weight:600;
    }
`;

export const Filters = () => {
    return (
        <StyledFilters>
            <h3>Filters</h3>
            <FilterType
                filters={['Polo', 'Basic', 'Hoodie']}
                category='type'
            />
            <FilterType
                filters={['Men', 'Women']}
                category='gender'
            />
            <FilterType
                filters={['Black', 'Blue', 'Pink', 'Green', 'Red', 'Grey', 'Purple', 'White', 'Yellow',]}
                category='color' />
            <FilterType
                filters={['<= Rs. 250', 'Rs. 251 - 400', '> Rs. 400']}
                values={[[0, 250], [250, 400], [400]]}
                category='price' />
        </StyledFilters>
    )
}

const StyledAsideFilters = styled.aside`
    border-right: 2px solid #ddd;
    padding-inline-end:4em;

    @media screen and (max-width:1200px){
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }
`

const AsideFilters = () => {
    return (
        <StyledAsideFilters>
            <Filters />
        </StyledAsideFilters>
    )
}

export default AsideFilters