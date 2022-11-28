import { createContext, useReducer } from "react";

const ACTIONS = {
    'SET_FILTER': 'set filter',
    'SEARCH': 'search',
    'HYDRATE_CONTEXT': 'add catalogue',
    'FILTER_PRODUCTS': 'filter products',
    'RESET_FILTERS': 'reset filters'
}

const productsReducer = (state, { type, payload }) => {
    switch (type) {
        case ACTIONS.HYDRATE_CONTEXT:
            return {
                ...state,
                allProducts: payload
            }
        case ACTIONS.SEARCH:
            if (payload === '') {
                return {
                    ...state,
                    userSearching: false
                }
            } else {
                const searchedProducts = state.allProducts.filter(product => [product.type, product.name, product.gender, product.color].includes(payload));
                return {
                    ...state,
                    searchedProducts: searchedProducts,
                    userSearching: true,
                }
            }
        case ACTIONS.SET_FILTER:
            const { category, filter, isChecked } = payload;
            const currentFilters = { ...state.filters };
            let currentNumberOfSelectedFilters = state.numOfSelectedFilters;
            if (isChecked) {
                currentFilters[category].add(filter);
                currentNumberOfSelectedFilters++;
            } else {
                currentFilters[category].delete(filter)
                currentNumberOfSelectedFilters--;
            }
            return {
                ...state,
                filters: currentFilters,
                numOfSelectedFilters: currentNumberOfSelectedFilters
            };
        case ACTIONS.RESET_FILTERS:
            return {
                ...state,
                numOfSelectedFilters: 0,
                filteredProducts: []
            }
        case ACTIONS.FILTER_PRODUCTS:
            let products = state.allProducts;
            if (state.numOfSelectedFilters > 0) {
                const { filters } = state;
                for (let category in filters) {
                    if (filters[category].size > 0) {
                        products = products.filter(product => {
                            return filters[category].has(product[category]);
                        }
                        )
                    }
                }
            };
            return {
                ...state,
                filteredProducts: products
            }
        default:
            return {
                ...state
            }
    }
}

const initialState = {
    allProducts: [],
    filters: {
        type: new Set([]),
        gender: new Set([]),
        color: new Set([]),
        priceRange: new Set([])
    },
    filteredProducts: [],
    searchedProducts: [],
    userSearching: false,
    numOfSelectedFilters: 0
}


export const ProductsContext = createContext(initialState);

const ProductsContextProvider = ({ children }) => {

    const [productsState, dispatch] = useReducer(productsReducer, initialState);

    const addCatalogueToContext = (itemsArr) => {
        dispatch({ type: 'add catalogue', payload: itemsArr })
    }
    const searchCatalogue = (searchTerm) => {
        dispatch({ type: 'search', payload: searchTerm })
    }
    const setFilter = (filter) => {
        dispatch({ type: 'set filter', payload: filter })
        dispatch({ type: 'filter products' })
    }
    const resetFilters = () => {
        dispatch({ type: 'reset filters' })
    }
    const contextValue = {
        allProducts: productsState.allProducts,
        filters: productsState.filters,
        filteredProducts: productsState.filteredProducts,
        searchedProducts: productsState.searchedProducts,
        userSearching: productsState.userSearching,
        numOfSelectedFilters: productsState.numOfSelectedFilters,
        setFilter,
        resetFilters,
        addCatalogueToContext,
        searchCatalogue
    }

    return (
        <ProductsContext.Provider value={contextValue}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContextProvider;