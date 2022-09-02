import './sidebarToggler.js';
import './cart/toggleCart.js';
import './cart/setupCart.js';

import { fetchProducts } from './fetchProducts.js';
import { setupStore, store } from './store.js';
import { display } from './displayProducts.js';
import { getElement } from './utils.js';

async function init() {
    const products = await fetchProducts();
    if (products) {
        setupStore(products);
        const featured = store.filter((product) => product.featured === true);
        display(featured, getElement('.featured-center'));
    }
}

window.addEventListener('DOMContentLoaded', init);
