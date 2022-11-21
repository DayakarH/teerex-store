export const addPriceCategoryToProducts = (productsArr) => {
    const updatedProducts = productsArr.map(product => {
        const { price } = product;
        if (price <= 250) {
            product.priceRange = '<= Rs. 250';
        } else if (price > 250 && price <= 400) {
            product.priceRange = 'Rs. 251 - 400';
        } else {
            product.priceRange = '> Rs. 400';
        }
        return product;
    })
    return updatedProducts;
}