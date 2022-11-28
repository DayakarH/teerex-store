import { useContext, useEffect, useState } from 'react';
import useHTTPReq from '@hooks/useHTTPReq.hooks';
import { ProductsContext } from '@store/Products-Provider';
import styled from '@emotion/styled';
import Product from './Product';
import LoadingSpinner from '@ui/LoadingSpinner';

const StyledProductsList = styled.ul`
    list-style:none;

    & > li{
        margin-block-end: 5rem;
    }
    /* &:has(article:hover) article:not(:hover){
        scale:.8;
        opacity:.7;
    } */

       @media screen and (min-width:600px){
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
        gap: 3em;
        & > li{
        margin-block-end: 0;
    }
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
        content = productsCtx.searchedProducts.length
            ? productsCtx.searchedProducts.map(product => <Product key={product.id} details={product} />)
            : <p>No products match entered search term</p>
    }
    if (productsCtx.numOfSelectedFilters > 0) {
        content = productsCtx.filteredProducts.length
            ? productsCtx.filteredProducts.map(product => <Product key={product.id} details={product} />)
            : <p>No products match selected Filters</p>
    }

    return (
        <StyledProductsList>
            {isLoading && <LoadingSpinner />}
            {content}
        </StyledProductsList>
    )
}

export default ProductsList