export const randomPaymentModePicker = (arr) => {
    const randomIndex = Math.floor(Math.random() * Math.floor(arr.length));
    return arr[randomIndex];
};

export const saveInLocalStorage = (key, value) => {
    localStorage.setItem(`${key}`, value);
};

export const getFromLocalStorage = (key, value) => {
    localStorage.getItem(`${key}`, value);
};

export const clearLocalStorage = () => {
    localStorage.clear();
};

export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(`${key}`)
};