'use client'


import React, {useEffect, useState} from "react";
import {AUTH_STORAGE} from "@/storage/storageConfig";
import {api} from "@/services/api";
import {useForm} from "react-hook-form";
import {FormDeal} from "@/components/forms/FormDeal";
import {FormDealPhoto} from "@/components/forms/FormDealPhoto";
import {useRouter} from "next/navigation";
import {FormDealUrgency} from "@/components/forms/FormDealUrgency";
import {FormDealLocation} from "@/components/forms/FormDealLocation";
import {getRequestError} from "@/app/services/error";
import {ErrorMessage} from "@/components/ErrorMessage";
import Link from "next/link";
import SlideFormDealActiveEdit from "@/components/forms/SlideFormDealActiveEdit";

export default function Edit({ params }) {

    const [deal, setDeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        const token = localStorage.getItem(AUTH_STORAGE);
        const getData = async () => {
            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await api.get('/deal/getById/'+params.deal);
                setDeal(response.data.deal)
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
                <div className="space-y-10 divide-y divide-gray-900/10">
                    <div className="px-6">
                        <h3 className="text-2xl leading-6 text-green-700">Editar Negócio</h3>
                        <table className="border mt-8 min-w-full divide-y divide-x divide-gray-200 shadow">
                            <thead className="bg-gray-50 divide-y divide-x divide-gray-200">
                            <tr className="divide-x divide-y divide-gray-200">
                                <th width="20%" className="text-gray-900 p-2 py-6">ID</th>
                                <th width="20%" className="text-gray-900 p-2 py-6">Img</th>
                                <th  className="text-gray-900 p-2 py-6">Negócio</th>
                                <th  className="text-gray-900 p-2 py-6">Valor</th>
                                <th  colSpan="2" className="text-gray-900 p-2 py-6">Ações</th>

                            </tr>
                            </thead>
                            <tbody className="divide-y divide-x divide-gray-200 bg-white">
                                <tr className="divide-x divide-y divide-gray-200">
                                <td className="text-sm p-2">
                                    {deal.id}
                                </td>
                                <td width="20%" className="text-sm p-2">
                                    <img alt="" className="w-24 h-24  flex-shrink-0" src={deal.photos[0]? deal.photos[0].src:"https://vibbra.s3.sa-east-1.amazonaws.com/vibbraneo/15/12"}/>
                                </td>
                                <td className="text-sm p-2">
                                    {deal.description}
                                </td>
                                <td className="text-sm p-2">{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(deal.value) } </td>
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
                            </tbody>
                        </table>

                    </div>
                    <FormDeal deal={deal} />
                    <FormDealPhoto deal={deal} />
                    <FormDealUrgency deal={deal}/>
                    <FormDealLocation deal={deal}/>
                    <SlideFormDealActiveEdit deal={deal} />
                </div>
            }
        </>

    )
}
