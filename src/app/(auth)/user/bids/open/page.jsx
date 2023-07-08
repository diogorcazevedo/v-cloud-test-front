'use client'

import React, {useEffect, useState} from "react";
import {AUTH_STORAGE, USER_STORAGE} from "@/storage/storageConfig";
import {api} from "@/services/api";
import {useRouter} from "next/navigation";
import {ErrorMessage} from "@/components/ErrorMessage";
import {getRequestError} from "@/app/services/error";
import Link from "next/link";



export default function Bids() {

    const [bids, setBids] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem(USER_STORAGE));
        const token = localStorage.getItem(AUTH_STORAGE);
        const getData = async () => {
            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await api.get('/bid/getAllFromUser/'+item.id);
                setBids(response.data.bids)
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
                                    Propostas enviadas com minhas ofertas para produtos do meu interesse em aberto
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
                <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                    <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                    <tr className="divide-x divide-y divide-gray-200">
                        <th  className="text-sm text-gray-900 p-2 py-2">Vendedor</th>
                        <th  className="text-sm text-gray-900 p-2 py-2">Produto</th>
                        <th  className="text-sm text-gray-900 p-2 py-2">Minha oferta</th>
                        <th  className="text-sm text-gray-900 p-2 py-2">Valor Produto</th>
                        <th  className="text-sm text-gray-900 p-2 py-2">Meu Valor</th>
                        <th  className="text-sm  text-gray-900 p-2 py-6">
                            Ação
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                    {bids.filter(bids => bids.accepted === 0 ).map((bid) => (
                        <tr key={bid.id} className="divide-x divide-y divide-gray-200">
                            <td className="text-sm p-2">{bid.deal.user.name}</td>
                            <td width="25%" className="text-sm p-2">{bid.deal.description}</td>
                            <td width="25%" className="text-sm p-2">{bid.description}</td>
                            <td className="text-sm p-2">{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(bid.deal.value) } </td>
                            <td width="5%" className="text-sm p-2">{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(bid.value) } </td>
                            <td width="25%" className="text-sm text-center items-center justify-center p-2">
                                <Link href={"/store/"+bid.deal.id} className="disabled:opacity-25 inline-block w-full items-center px-2 py-1 border border-transparent text-xs rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    Nova proposta
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
