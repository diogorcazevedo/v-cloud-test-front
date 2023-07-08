'use client'

import React, {useEffect, useState} from "react";
import {AUTH_STORAGE, USER_STORAGE} from "@/storage/storageConfig";
import {api} from "@/services/api";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {ErrorMessage} from "@/components/ErrorMessage";
import {getRequestError} from "@/app/services/error";


export default function Messages() {

    const [deals, setDeals] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem(USER_STORAGE));
        const token = localStorage.getItem(AUTH_STORAGE);
        const getData = async () => {
            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await api.get('/deal/getAllFromUser/'+item.id);
                setDeals(response.data.deals)
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
                <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                    <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                    <tr className="divide-x divide-y divide-gray-200">
                        <th  className="text-gray-900 p-2 py-6">Ids</th>
                        <th width="20%" className="text-gray-900 p-2 py-6">Img</th>
                        <th  className="text-gray-900 p-2 py-6">Descrição</th>
                        <th  className="text-gray-900 p-2 py-6">Valor</th>
                        <th  colSpan= "3" className="text-gray-900 p-2 py-6">
                            <a href="#" className="disabled:opacity-25 inline-block w-full items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                NOVO
                            </a>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                    {deals.map((deal) => (
                        <tr key={deal.id} className="divide-x divide-y divide-gray-200">
                            <td className="text-sm p-2">{deal.id}</td>
                            <td className="text-sm p-2">
                                <img alt="" className="w-24 h-24  flex-shrink-0" src={deal.photos[0].src}/>
                            </td>
                            <td className="text-sm p-2">
                                {deal.description}
                            </td>
                            <td className="text-sm p-2">{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(deal.value) } </td>
                            <td className="text-sm text-center items-center justify-center p-2">
                                <Link href={'/user/deals/edit/'+deal.id} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    editar
                                </Link>
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
