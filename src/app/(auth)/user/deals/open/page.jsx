'use client'

import React, {useEffect, useState} from "react";
import {AUTH_STORAGE, USER_STORAGE} from "@/storage/storageConfig";
import {api} from "@/services/api";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {getRequestError} from "@/app/services/error";
import {ErrorMessage} from "@/components/ErrorMessage";



export default function Deals() {

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
                const response = await api.get('/deal/getFromUserByStatus/'+item.id+'/0');
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
                <div className="bg-white shadow ">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Propostas Abertas</h3>
                        <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                            <div className="max-w-xl text-sm text-gray-500">
                                <p>
                                    Relação de negócios sem propostas ou com propostas não aprovadas
                                </p>
                            </div>
                            <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
                                <Link
                                    href="/user/deals/create"
                                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    Criar nova oportunidade de negócio
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200 shadow">
                    <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                    <tr className="divide-x divide-y divide-gray-200">
                        <th width="20%" className="text-gray-900 p-2 py-6">ID</th>
                        <th width="20%" className="text-gray-900 p-2 py-6">Img</th>
                        <th  className="text-gray-900 p-2 py-6">Negócio</th>
                        <th  className="text-gray-900 p-2 py-6">Valor</th>
                        <th  colSpan="3" className="text-gray-900 p-2 py-6">Ações</th>

                    </tr>
                    </thead>
                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                    {deals.map((deal) => (
                        <tr key={deal.id} className="divide-x divide-y divide-gray-200">
                            <td className="text-sm p-2">
                                {deal.id}
                            </td>
                            <td width="20%" className="text-sm p-2">
                                <img className="w-24 h-24  flex-shrink-0" src={deal.photos[0]? deal.photos[0].src:"https://vibbra.s3.sa-east-1.amazonaws.com/vibbraneo/15/12"}/>
                            </td>
                            <td className="text-sm p-2">
                                {deal.description}
                            </td>
                            <td className="text-sm p-2">{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(deal.value) } </td>
                            <td className="text-sm text-center items-center justify-center p-2">
                                <Link href={'/user/deals/'+deal.id+'/edit'} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    editar
                                </Link>
                            </td>
                            <td className="text-sm text-center items-center justify-center p-2">
                                <Link href={'/user/deals/'+deal.id+'/bids'} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    propostas
                                </Link>
                            </td>
                            <td className="text-sm text-center items-center justify-center p-2">
                                <Link href={'/user/deals/'+deal.id+'/messages'} className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    messages
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
