import { useContext, useEffect, useState } from 'react';
import useHTTPReq from '@hooks/useHTTPReq.hooks';
import ProductsContext from '@store/Products-Provider';
import styled from '@emotion/styled';
import Product from './Product';
import LoadingSpinner from '@ui/LoadingSpinner';

const StyledSection = styled.section`
    & > article{
        margin-block-end: 2rem;
    }

    /* &:has(article:hover) article:not(:hover){
        scale:.8;
        opacity:.7;
    } */

       @media screen and (min-width:600px){
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(225px,1fr));
        gap: 2em;
    }
`;

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const { isLoading, error, fetchProducts } = useHTTPReq();
    const productsCtx = useContext(ProductsContext);

    useEffect(() => {
        fetchProducts(setProducts);
    }, []);

    useEffect(() => { productsCtx.addCatalogueToContext(products) }, [products])


    let content = products.map(product => <Product key={product.id} details={product}
    />);
    if (productsCtx.userSearching) {
        content = productsCtx.searchedProducts.map(product => <Product key={product.id} details={product}
        />)
    }
    if (productsCtx.numOfSelectedFilters > 0) {
        content = productsCtx.filteredProducts.length
            ? productsCtx.filteredProducts.map(product => <Product key={product.id} details={product} />)
            : <p>No products match selected Filters</p>
    }

    return (
        <StyledSection>
            {isLoading && <LoadingSpinner />}
            {content}
        </StyledSection>
    )
}

export default ProductsList