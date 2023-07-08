'use client'


import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {AUTH_STORAGE} from "@/storage/storageConfig";
import {api} from "@/services/api";
import {getRequestError} from "@/app/services/error";
import {ErrorMessage} from "@/components/ErrorMessage";
import Link from "next/link";


export default function Store() {

    const [deals, setDeals] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        const token = localStorage.getItem(AUTH_STORAGE);
        const getData = async () => {
            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await api.get('/deal/getByStatus/0');
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


    function trocaStatus(deal){

        if(deal.trade_for !== null){
            return  "Aceita troca"
        }else{
            return  "Sem Troca"
        }
    }
    return (

            <div>
                {loading && <p>Loading...</p>}
                <ErrorMessage errorMessage={errorMessage} />
                {!loading &&
                <section aria-labelledby="category-heading" className="py-6 sm:pt-6 xl:mx-auto xl:max-w-7xl xl:px-8">

                    <div className="bg-white">
                        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">

                            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                {deals.map((deal) => (
                                    <div key={deal.id} className="group relative">
                                        <Link href={'/store/'+deal.id}>
                                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                                <img
                                                    src={deal.photos[0]? deal.photos[0].src:"https://vibbra.s3.sa-east-1.amazonaws.com/vibbraneo/15/18"}
                                                    alt=""
                                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                />
                                            </div>
                                        </Link>
                                        <Link href={'/store/'+deal.id}>
                                            <p className="py-4 text-sm font-medium text-gray-900">{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(deal.value) }</p>
                                        </Link>

                                        <p className="text-sm font-medium text-gray-900">vendedor: {deal.user.name}</p>
                                        <div className="mt-4 flex justify-between">
                                            <div>
                                                <Link href={'/store/'+deal.id}>
                                                <h3 className="text-sm text-gray-700">
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {deal.description}
                                                </h3>
                                                </Link>
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium text-indigo-800 bg-gray-50">{trocaStatus(deal)}</p>

                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>


                </section>
                }
            </div>

    )
}
