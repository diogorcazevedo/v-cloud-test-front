import React, {useEffect, useState} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {AUTH_STORAGE} from "@/storage/storageConfig";
import {api} from "@/services/api";
import {AppError} from "@/utils/AppError";
import {SuccessMessage} from "@/components/SuccessMessage";
import {ErrorMessage} from "@/components/ErrorMessage";
import {getlatitude, getlongitude} from "@/app/services/location";


export function FormDealLocation({deal}) {

    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);


    const schema = yup
        .object({
            lat:        yup.string().max(191,'Excedido tamanho máximo permitido para este campo'),
            lng:        yup.string().max(191,'Excedido tamanho máximo permitido para este campo'),
            zip_code:   yup.number().positive("apenas número positivo").integer("apenas número inteiro").required("campo obrigatório"),
            state:      yup.string().required("campo obrigatório").max(2,'Excedido tamanho máximo permitido para este campo'),
            city:       yup.string().required("campo obrigatório").max(191,'Excedido tamanho máximo permitido para este campo'),
            address:    yup.string().required("campo obrigatório").max(191,'Excedido tamanho máximo permitido para este campo'),
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

        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await api.put('/deal/updateLocation/'+ deal.id, data);
            setSuccessMessage('Endereço atualizado com sucesso!');
        } catch (error) {
            const isAppError = error instanceof AppError;
            const errorMsn = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.';
            setErrorMessage(errorMsn);
        }

    }

    useEffect(() => {
        setLatitude(getlatitude())
        setLatitude(getlongitude())
        setLoading(false);
    }, [loading]);


    return (
        <>
            {loading && <p>Loading...</p>}
            {!loading &&
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-4">
                <SuccessMessage successMessage={successMessage}/>
                <ErrorMessage errorMessage={errorMessage} />
                <div className="px-4 sm:px-0">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Endereço</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                </div>

                <form onSubmit={handleSubmit(handleSubmitForm)} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3">
                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Endereço
                                </label>
                                <div className="mt-2">
                                    <input
                                        defaultValue={deal.location.address}
                                        {...register("address")}
                                        type="text"
                                        id="address"
                                        autoComplete="given-address"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <span className="inline-flex text-sm text-red-700">{errors.address?.message}</span>
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        defaultValue={deal.location.city}
                                        {...register("city")}
                                        type="text"
                                        id="city"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <span className="inline-flex text-sm text-red-700">{errors.city?.message}</span>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                    Estado
                                </label>
                                <div className="mt-2">
                                    <input
                                        defaultValue={deal.location.state}
                                        {...register("state")}
                                        type="text"
                                        name="state"
                                        id="state"
                                        autoComplete="given-state"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <span className="inline-flex text-sm text-red-700">{errors.state?.message}</span>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="zip_code" className="block text-sm font-medium leading-6 text-gray-900">
                                    CEP
                                </label>
                                <div className="mt-2">
                                    <input
                                        defaultValue={deal.location.zip_code}
                                        {...register("zip_code")}
                                        type="text"
                                        name="zip_code"
                                        id="zip_code"
                                        autoComplete="given-zip_code"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <span className="inline-flex text-sm text-red-700">{errors.zip_code?.message}</span>
                                </div>
                            </div>

                            <input type="hidden" {...register("lat")} defaultValue={latitude}/>
                            <input type="hidden" {...register("lng")} defaultValue={longitude}/>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
            }
        </>
    );
}