export const allProductsUrl = 'https://course-api.com/javascript-store-products'
export const singleProductUrl =
    'https://course-api.com/javascript-store-single-product'

export function getElement(selection) {
    const element = document.querySelector(selection)
    if (element) return element
    throw new Error(`Please check "${selection}" selector, no such element exist`)
}

export function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(+(price / 100).toFixed(2))
}

export function getStorageItem(item) {
    let storageItem = localStorage.getItem(item)
    if (storageItem) {
        storageItem = JSON.parse(localStorage.getItem(item))
    } else {
        storageItem = []
    }
    return storageItem
}

export function setStorageItem(name, item) {
    localStorage.setItem(name, JSON.stringify(item))
}
