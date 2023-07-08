"use client"

import React, {useState} from 'react'
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {AUTH_STORAGE} from "@/storage/storageConfig";
import {api} from "@/services/api";
import {AppError} from "@/utils/AppError";
import {SuccessMessage} from "@/components/SuccessMessage";
import {ErrorMessage} from "@/components/ErrorMessage";


export default function FormMessageUpdate({message}) {

    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);


    const schema = yup
        .object({
            message:       yup.string().required("campo obrigatório"),
        })
        .required()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    })

    const handleSubmitForm = async (data) => {
        const token = localStorage.getItem(AUTH_STORAGE);
        console.log(data)
        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await api.put('/message/update/'+ message.id, data);
            setSuccessMessage('Proposta atualizada com sucesso!');
        } catch (error) {
            const isAppError = error instanceof AppError;
            const errorMsn = isAppError ? error.message : 'Não foi possível atualizar a Proposta. Tente novamente mais tarde.';
            setErrorMessage(errorMsn);
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitForm)} className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1">
                    <SuccessMessage successMessage={successMessage}/>
                    <ErrorMessage errorMessage={errorMessage} />
                    <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                        <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">

                            <div className="sm:col-span-3">
                                                          <textarea
                                                              {...register("message")}
                                                              rows={5}
                                                              id="message"
                                                              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                              placeholder="Add your comment..."
                                                          />
                                <span className="inline-flex text-sm text-red-700">{errors.message?.message}</span>
                            </div>
                        </div>

                        <input type="hidden" {...register("message_id")} defaultValue={message.id} />

                        <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </>
    )
}
