import {AUTH_STORAGE} from './storageConfig';


export async function storageAuthTokenSave(token) {
    await localStorage.setItem(AUTH_STORAGE,token);
}


export async function storageAuthTokenGet() {
    return localStorage.getItem(AUTH_STORAGE);
}


export async function storageAuthTokenRemove() {
    await localStorage.removeItem(AUTH_STORAGE);
}

export async function checkIsAuth() {
    const token = await storageAuthTokenGet()
    return !!token;
}