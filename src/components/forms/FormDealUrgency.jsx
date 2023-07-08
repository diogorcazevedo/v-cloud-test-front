import React, {useState} from "react"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import {api} from "@/services/api";
import {AppError} from "@/utils/AppError";
import {AUTH_STORAGE} from "@/storage/storageConfig";
import {SuccessMessage} from "@/components/SuccessMessage";
import {ErrorMessage} from "@/components/ErrorMessage";



export function FormDealUrgency({deal}) {

    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const schema = yup
        .object({
           type:      yup.string().required("campo obrigatório"),
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
            await api.put('/deal/updateUrgency/'+ deal.id, data);
            setSuccessMessage('Oferta atualizada com sucesso!');
        } catch (error) {
            const isAppError = error instanceof AppError;
            const errorMsn = isAppError ? error.message : 'Não foi possível atualizar a a Oferta. Tente novamente mais tarde.';
            setErrorMessage(errorMsn);
        }

    }

    return (
        <>

            <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-4">
                <SuccessMessage successMessage={successMessage}/>
                <ErrorMessage errorMessage={errorMessage} />
                <div className="px-4 sm:px-0">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Urgência</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Necessidade em relação ao tempo para venda</p>
                </div>

                <form onSubmit={handleSubmit(handleSubmitForm)} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3">
                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                                    Tipo de operação
                                </label>
                                <div className="mt-2">
                                    <select
                                        defaultValue={deal.urgency.type}
                                        {...register("type")}
                                        id="type"
                                        name="type"
                                        autoComplete="country-type"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value="Baixa">Baixa</option>
                                        <option value="Média">Média</option>
                                        <option value="Alta">Alta</option>
                                        <option value="Data">Data</option>
                                    </select>
                                    <span className="inline-flex text-sm text-red-700">{errors.type?.message}</span>
                                </div>
                            </div>
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

        </>
    );
}