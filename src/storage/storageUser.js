import {USER_STORAGE} from './storageConfig';

export async function storageUserSave(user) {
    await localStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function storageUserGet() {
    const storage = localStorage.getItem(USER_STORAGE);
    const user = storage ? JSON.parse(storage) : {};
    console.log(user)
    return user
}

export async function storageUserRemove() {
    await localStorage.removeItem(USER_STORAGE);
}