import React from 'react';
import styled from '@emotion/styled';
import Search from './Search';
import ProductsList from './products/Products-List';
import AsideFilters from './Filters';

const StyledCatalogue = styled.div`
    & > .container{
        display: grid;
        gap: 3rem;
        grid-auto-flow: column;
        grid-template-columns: 1fr 4fr;
        padding-block-start: 4em;
    }

    @media screen and (max-width:1200px){
        & > .container{
            display:block
        }
    }
`;

const Catalogue = () => {
    return (
        <StyledCatalogue>
            <Search />
            <div className="container">

                <AsideFilters />
                <ProductsList />
            </div>
        </StyledCatalogue>
    )
}

export default Catalogue