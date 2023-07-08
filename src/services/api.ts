import axios, { AxiosInstance } from "axios";
import { AppError } from "@/utils/AppError";

type SignOut = () => void;
type APIInstanceProps = AxiosInstance & {
    registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

const api = axios.create({
    baseURL: 'https://v-cloud-test-api-9b4ee93da081.herokuapp.com/api'
}) as APIInstanceProps;


api.registerInterceptTokenManager = signOut => {
    const interceptTokenManager = api.interceptors.response.use((response) => response, async (requestError) => {

        if (requestError?.response?.status === 401) {
            if (requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
                signOut();
                return Promise.reject(requestError)
            }
            signOut();
            return Promise.reject(requestError)
        }


        if(requestError.response && requestError.response.data) {
            return Promise.reject(new AppError(requestError.response.data.message))
        } else {
            return Promise.reject(requestError)
        }
    });
    return () => {
        api.interceptors.response.eject(interceptTokenManager);
    }
}
export { api };