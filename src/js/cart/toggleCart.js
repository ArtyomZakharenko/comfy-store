import { getElement } from '../utils.js';

const cartOverlay = getElement('.cart-overlay');
const closeCartBtn = getElement('.cart-close');
const toggleCartBtn = getElement('.toggle-cart');

toggleCartBtn.addEventListener('click', () => {
    cartOverlay.classList.add('show');
});
closeCartBtn.addEventListener('click', () => {
    cartOverlay.classList.remove('show');
});

export function openCart() {
    cartOverlay.classList.add('show');
}
