'use client'

import React, {useEffect, useState} from "react";
import {AUTH_STORAGE} from "@/storage/storageConfig";
import {api} from "@/services/api";
import {useRouter} from "next/navigation";
import FormMessageUpdate from "@/components/forms/FormMessageUpdate";
import {ErrorMessage} from "@/components/ErrorMessage";
import {getRequestError} from "@/app/services/error";



 export default function Bids({ params }) {

    const [messages, setMessages] = useState(null);
    const [loading, setLoading] = useState(true);
     const [errorMessage, setErrorMessage] = useState(false);
    const { push } = useRouter();

     useEffect(() => {
        const token = localStorage.getItem(AUTH_STORAGE);
        const getData = async () => {
            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await api.get('/message/getAllFromDeal/'+params.deal);
                setMessages(response.data.messages)
                setLoading(false);
            } catch (error) {
                setLoading(true);
                const msn = await getRequestError(error);
                setErrorMessage(msn);
                push("/")
            }
        };
        getData();
    }, [loading]);



    return (
        <>
            {loading && <p>Loading...</p>}
            <ErrorMessage errorMessage={errorMessage} />
            {!loading &&
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div>
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Mensagens</h3>
                    <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                        <div className="max-w-xl text-sm text-gray-500">
                            <p>
                                {messages[0]?.deal.description}
                            </p>
                        </div>
                        <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
                            <p>
                                { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(messages[0]?.deal.value) }
                            </p>
                        </div>
                    </div>
                </div>
                <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                    <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                    <tr className="divide-x divide-y divide-gray-200">
                        <th  className="text-gray-900 p-2 py-6">Id</th>
                        <th  width="20%" className="text-gray-900 p-2 py-6">Cliente</th>
                        <th  width="30%" className="text-gray-900 p-2 py-6">Título</th>
                        <th  width="40%" className="text-gray-900 p-2 py-6">Mensagem</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                    {messages.map((msn) => (
                        <tr key={msn.id} className="divide-x divide-y divide-gray-200">
                            <td className="text-sm p-2">{msn.id}</td>
                            <td className="text-sm p-2">
                                {msn.user.name}
                            </td>
                            <td className="text-sm p-2">
                                {msn.title}
                            </td>
                            <td className="text-sm p-2">
                                {msn.message !== null ? msn.message :  <FormMessageUpdate message={msn} /> }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            }
        </>
    );
}
