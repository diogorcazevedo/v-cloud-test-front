import React, {useState} from "react"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import {api} from "@/services/api";
import {AppError} from "@/utils/AppError";
import {AUTH_STORAGE} from "@/storage/storageConfig";
import {ErrorMessage} from "@/components/ErrorMessage";
import {SuccessMessage} from "@/components/SuccessMessage";
import {useRouter} from "next/navigation";



export function FormBidSale({deal,user}) {
    const router = useRouter()
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const schema = yup
        .object({
            accepted:       yup.string().required("campo obrigatório"),
            value:          yup.number().positive().integer("apenas números inteiros").required("campo obrigatório"),

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
            await api.put('/bid/store/'+ deal.id + '/' + user.id, data);
            setSuccessMessage('Proposta criada com sucesso!');
            router.push('/store/'+ deal.id+'/delivery')
        } catch (error) {
            const isAppError = error instanceof AppError;
            const errorMsn = isAppError ? error.message : 'Não foi possível atualizar a Proposta. Tente novamente mais tarde.';
            setErrorMessage(errorMsn);
        }

    }


    return (
        <>
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                <SuccessMessage successMessage={successMessage}/>
                <ErrorMessage errorMessage={errorMessage} />

                <form onSubmit={handleSubmit(handleSubmitForm)} className="bg-white shadow-sm ring-1 ring-gray-900/5  md:col-span-3">
                    <div className="px-4 py-4 ">
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="value" className="block text-sm font-medium leading-6 text-gray-900">
                                    <p>Valor da transferência a ser confirmada: { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(deal.value) }</p>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                        <input type="hidden"  {...register("accepted")}  defaultValue="0"/>
                        <input type="hidden"  {...register("value")}  defaultValue={deal.value}/>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Confirmar endereço para entrega
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}