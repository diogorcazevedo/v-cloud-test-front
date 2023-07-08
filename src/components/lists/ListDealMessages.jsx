'use client'

import React, {useEffect, useState} from "react";
import {AUTH_STORAGE, USER_STORAGE} from "@/storage/storageConfig";
import {api} from "@/services/api";
import {AppError} from "@/utils/AppError";
import {useRouter} from "next/navigation";


export default function ListDealMessages({ deal ,user}) {

    const [messages, setMessages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessageDealsAllDeal, setErrorMessageDealsAllDeal] = useState(null);
    const { push } = useRouter();

    useEffect(() => {
        const token = localStorage.getItem(AUTH_STORAGE);
        const getData = async () => {
            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await api.get('/message/getAllFromDealAndUser/'+deal.id+"/"+user.id);
                setMessages(response.data.messages)
                setLoading(false);
            } catch (error) {
                setLoading(true);
                if(error.response.status === 401){
                    setErrorMessageDealsAllDeal("acesso não autorizado");
                    localStorage.removeItem(USER_STORAGE);
                    localStorage.removeItem(AUTH_STORAGE);
                    push('/');

                }else{
                    const isAppError = error instanceof AppError;
                    const errorMsn = isAppError ? error.message : 'Não foi possível carregar os dados.';
                    setErrorMessageDealsAllDeal(errorMsn);
                }
            }
        };
        getData();
    }, [loading]);



    return (
        <>
            {loading && <p>Loading...</p>}
            {errorMessageDealsAllDeal &&
                <div className="bg-red-700 md:col-span-3 px-4 mb-8">
                    <span className="inline-flex text-sm text-white">{errorMessageDealsAllDeal}</span>
                </div>
            }
            {!loading &&
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                        <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                        <tr className="divide-x divide-y divide-gray-200">
                            <th  className="text-gray-900 p-2 py-2">user</th>
                            <th  width="40%" className="text-gray-900 p-2 py-2">Pergunta</th>
                            <th  width="40%" className="text-gray-900 p-2 py-2">Resposta</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-x divide-gray-200 bg-white">
                        {messages.map((msn) => (
                            <tr key={msn.id} className="divide-x divide-y divide-gray-200">

                                <td className="text-sm p-2">
                                    {msn.user.name}
                                </td>
                                <td className="text-sm p-2">
                                    {msn.title}
                                </td>
                                <td className="text-sm p-2">
                                    {msn.message}
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
