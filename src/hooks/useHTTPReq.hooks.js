import { useState, useCallback } from 'react';
import axios from "axios";
import { END_POINT } from '../constants';
import { addPriceCategoryToProducts } from '../helpers';


const useHTTPReq = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const fetchProducts = useCallback(async (applyData) => {
        setIsLoading(true);
        setError(null)
        try {
            const res = await axios.get(END_POINT);
            //adding a PriceCategory prop to each product to make things easier for filtration
            const updatedProducts = addPriceCategoryToProducts(res.data);
            applyData(updatedProducts);
        } catch {
            setError(true);
        }
        setIsLoading(false);
    }, []);
    return {
        isLoading,
        error,
        fetchProducts
    }
}

export default useHTTPReq;