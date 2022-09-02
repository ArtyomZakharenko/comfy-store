import {openCart} from './toggleCart.js';
import {findProduct} from '../store.js';
import {addToCartDOM} from './addToCart.js';
import {formatPrice, getElement, getStorageItem, setStorageItem,} from '../utils.js';

const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart');

export function addToCart(id) {
    let item = cart.find((cartItem) => cartItem.id === id);

    if (!item) {
        let product = findProduct(id);
        product = { ...product, amount: 1 };
        cart = [...cart, product];
        addToCartDOM(product);
    } else {
        const amount = increaseAmount(id);
        const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
        const newAmount = items.find((value) => value.dataset.id === id);
        newAmount.textContent = amount;
    }
    displayCartItemCount();
    displayCartTotal();

    setStorageItem('cart', cart);
    openCart();
}

function displayCartItemCount() {
    cartItemCountDOM.textContent = cart.reduce((total, cartItem) => {
        return (total + cartItem.amount);
    }, 0);
}

function displayCartTotal() {
    let total = cart.reduce((total, cartItem) => {
        return (total + cartItem.price * cartItem.amount);
    }, 0);
    cartTotalDOM.textContent = `Total : ${formatPrice(total)} `;
}

function displayCartItemsDOM() {
    cart.forEach((cartItem) => {
        addToCartDOM(cartItem);
    });
}

function removeItem(id) {
    cart = cart.filter((cartItem) => cartItem.id !== id);
}

function increaseAmount(id) {
    let newAmount;
    cart = cart.map((cartItem) => {
        if (cartItem.id === id) {
            newAmount = cartItem.amount + 1;
            cartItem = { ...cartItem, amount: newAmount };
        }
        return cartItem;
    });
    return newAmount;
}

function decreaseAmount(id) {
    let newAmount;
    cart = cart.map((cartItem) => {
        if (cartItem.id === id) {
            newAmount = cartItem.amount - 1;
            cartItem = { ...cartItem, amount: newAmount };
        }
        return cartItem;
    });
    return newAmount;
}

function setupCartFunctionality() {
    cartItemsDOM.addEventListener('click', (e) => {
        const element = e.target;
        const parent = e.target.parentElement;
        const id = e.target.dataset.id;
        const parentID = e.target.parentElement.dataset.id;
        if (element.classList.contains('cart-item-remove-btn')) {
            removeItem(id);
            element.parentElement.parentElement.remove();
        }

        if (parent.classList.contains('cart-item-increase-btn')) {
            parent.nextElementSibling.textContent = increaseAmount(parentID);
        }

        if (parent.classList.contains('cart-item-decrease-btn')) {
            const newAmount = decreaseAmount(parentID);
            if (newAmount === 0) {
                removeItem(parentID);
                parent.parentElement.parentElement.remove();
            } else {
                parent.previousElementSibling.textContent = newAmount;
            }
        }
        displayCartItemCount();
        displayCartTotal();
        setStorageItem('cart', cart);
    });
}
function init() {
    displayCartItemCount();
    displayCartTotal();
    displayCartItemsDOM();
    setupCartFunctionality();
}

init();
