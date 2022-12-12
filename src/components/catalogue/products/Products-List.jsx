import { useContext, useEffect, useState } from 'react';
import useHTTPReq from '@hooks/useHTTPReq.hooks';
import { ProductsContext } from '@store/Products-Provider';
import styled from '@emotion/styled';
import Product from './Product';
import LoadingSpinner from '@ui/LoadingSpinner';

const StyledProductsList = styled.section`

    & > article{
        margin-block-end: 1.5rem;
    }
    &:has(article:hover) article:not(:hover){
        scale:.8;
        opacity:.7;
    }

    &:has(.no-products){
        display: block;
        text-align:center;
    }

    @media screen and (min-width:600px){
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
        gap: 2em 1.5em;
        & > article{
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


    let content = !isLoading && error
        ? <p className='no-products'>Unable to fetch products at this time. Please try again later</p>
        : products.map(product => <Product key={product.id} details={product} />);

    if (productsCtx.userSearching) {
        console.log('searched')
        content = productsCtx.searchedProducts.length
            ? productsCtx.searchedProducts.map(product => <Product key={product.id} details={product} />)
            : <p className='no-products'>No products match entered search term</p>
    }

    if (productsCtx.numOfSelectedFilters > 0) {
        content = productsCtx.filteredProducts.length
            ? productsCtx.filteredProducts.map(product => <Product key={product.id} details={product} />)
            : <p className='no-products'>No products match selected Filters</p>
    }

    return (
        <StyledProductsList aria-label='Products Catalogue'>
            {isLoading && <LoadingSpinner />}
            {content}
        </StyledProductsList>
    )
}

export default ProductsList