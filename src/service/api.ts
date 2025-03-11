import { AppError } from "@utils/AppError";
import axios from "axios";
import { API_URL } from "@env"
console.log(API_URL)

export const api = axios.create({
    baseURL: API_URL
})

api.interceptors.response.use(response => response, error => {
    if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message))
    } else {
        return Promise.reject(new AppError("Erro no servidor."))
    }
})