'use client'

import {storageUserSave} from '@/storage/storageUser';
import {storageAuthTokenSave} from '@/storage/storageAuthToken';
import {api} from "@/services/api";
import { useRouter } from 'next/navigation'
import {AppError} from "@/utils/AppError";
import React, {useState} from "react";
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"

export default function FormLogin() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState(false);

    //Validação dos campos por meio da Yup
    const schema = yup
        .object({
            password: yup.string().required("campo obrigatório").max(191,'Excedido tamanho máximo permitido para este campo'),
            email: yup.string().email("email inválido").required("campo obrigatório").max(191,'Excedido tamanho máximo permitido para este campo'),
        })
        .required()

    //Trabalhando formulários por meio do React-Hook-Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    })


    const handleSubmitForm = async (data) => {
        let email = data.email;
        let password = data.password;
        try {
            //submetendo o formulário por meio do Axios
            const res  = await api.post('auth/login', {email ,password });
            //salvando os dados do usuário no local storage
            await storageUserSave(res.data.user);
            //salvando token no local storage
            await storageAuthTokenSave(res.data.token);
            //redirecionando para área logada de exposição de ofertas
            router.push('/store')
        } catch (error) {
            if(error.response.status === 401){
                //não autorizado
                setErrorMessage("acesso não autorizado");
            }else{
                //erro diferente, buscar e tratar por meio do Axios
                const isAppError = error instanceof AppError;
                const errorMsn = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.';
                setErrorMessage(errorMsn);
            }

        }

    }


    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-8 shadow sm:rounded-lg sm:px-8">
                {errorMessage &&
                    <div className="bg-red-700 md:col-span-3 px-4 mb-8">
                        <span className="inline-flex text-sm text-white">{errorMessage}</span>
                    </div>
                }
                <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-3" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("email")}
                                type="email"
                                id="email"
                                autoComplete="given-email"
                                className="block w-full rounded-md border-0 py-1.5  px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            <span className="inline-flex text-sm text-red-700">{errors.email?.message}</span>
                        </div>

                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Senha
                        </label>
                        <div className="mt-2">
                            <input
                                type="password"
                                id="password"
                                autoComplete="given-password"
                                {...register("password")}
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            <span className="inline-flex text-sm text-red-700">{errors.password?.message}</span>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
