export const addToStorage = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
    return true;
}

export const getFromStorage = (name) => {
    return JSON.parse(localStorage.getItem(name));
}