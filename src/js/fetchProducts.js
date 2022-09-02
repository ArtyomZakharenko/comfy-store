import { allProductsUrl } from './utils.js';

export async function fetchProducts() {
    const response = await fetch(allProductsUrl).catch((err) => console.log(err));
    if (response) {
        return response.json();
    }
    return response;
}
