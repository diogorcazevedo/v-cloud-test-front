import {AUTH_STORAGE, USER_STORAGE} from "@/storage/storageConfig";
import {AppError} from "@/utils/AppError";

export async function getRequestError(error) {
    if(error.response.status === 401){
        localStorage.removeItem(USER_STORAGE);
        localStorage.removeItem(AUTH_STORAGE);
        return "acesso não autorizado";
    }else{
        const isAppError = error instanceof AppError;
        return isAppError ? error.message : 'Não foi possível carregar os dados.';
    }

}