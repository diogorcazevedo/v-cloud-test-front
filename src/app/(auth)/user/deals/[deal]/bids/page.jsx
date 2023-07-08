'use client'

import React, {useEffect, useState} from "react";
import {AUTH_STORAGE} from "@/storage/storageConfig";
import {api} from "@/services/api";
import {useRouter} from "next/navigation";
import SlideFormBidAcceptEdit from "@/components/forms/SlideFormBidAcceptEdit";
import {getRequestError} from "@/app/services/error";
import {ErrorMessage} from "@/components/ErrorMessage";


export default function Bids({ params }) {

     const [bids, setBids] = useState(null);
     const [loading, setLoading] = useState(true);
     const [errorMessage, setErrorMessage] = useState(false);
     const { push } = useRouter();

     useEffect(() => {
        const getData = async () => {
            const token = localStorage.getItem(AUTH_STORAGE);

            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await api.get('/bid/getAllFromDeal/'+params.deal);
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
                <div>
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Propostas</h3>
                    <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                        <div className="max-w-xl text-sm text-gray-500">
                            <p>
                                {bids[0]?.deal.description}
                            </p>
                        </div>
                        <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
                            <p>
                                { new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(bids[0]?.deal.value) }
                            </p>
                        </div>
                    </div>
                </div>
                <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200">
                    <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                    <tr className="divide-x divide-y divide-gray-200">
                        <th  className="text-gray-900 p-2 py-6">Ids</th>
                        <th width="20%" className="text-gray-900 p-2 py-6">Cliente</th>
                        <th  className="text-gray-900 p-2 py-6">Descrição</th>
                        <th  className="text-gray-900 p-2 py-6">Status</th>
                        <th  className="text-gray-900 p-2 py-6">Valor</th>
                        <th  colSpan= "3" className="text-gray-900 p-2 py-6">
                            Ação
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-x divide-gray-200 bg-white">
                    {bids.map((bid) => (
                        <tr key={bid.id} className="divide-x divide-y divide-gray-200">
                            <td className="text-sm p-2">{bid.id}</td>
                            <td className="text-sm p-2">
                                {bid.user.name}
                            </td>
                            <td className="text-sm p-2">
                                {bid.description}
                            </td>
                            <td className="text-sm p-2">
                                {bid.accepted === 1 ? 'Aceita':'Negada'}
                            </td>
                            <td className="text-sm p-2">{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(bid.value) } </td>
                            <td className="text-sm text-center items-center justify-center p-2">
                                <SlideFormBidAcceptEdit bid={bid} />
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
