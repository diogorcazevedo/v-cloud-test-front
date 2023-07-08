'use client'

import React, { useEffect, useState} from "react";
import {AUTH_STORAGE, USER_STORAGE} from "@/storage/storageConfig";
import {api} from "@/services/api";
import {useRouter} from "next/navigation";
import {getRequestError} from "@/app/services/error";
import {ErrorMessage} from "@/components/ErrorMessage";
import Link from "next/link";



export default function ListHomeDeals() {

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
                <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                    {deals.slice(0, 3).map((deal) => (
                        <Link key={deal.id}  href={'/user/deals/'+deal.id+'/edit'}>
                            <li  className="overflow-hidden rounded-xl border border-gray-200">
                            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                <img
                                    src={deal.photos[0]? deal.photos[0].src: "https://vibbra.s3.sa-east-1.amazonaws.com/vibbraneo/15/12"}
                                    alt={deal.description}
                                    className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                                />
                                <div className="text-sm font-medium leading-6 text-gray-900">{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(deal.value) }</div>
                            </div>
                            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                                <div className="flex justify-between gap-x-4 py-3">

                                    <dd className="text-gray-700">
                                        <p>{deal.description}</p>
                                    </dd>
                                </div>
                            </dl>
                        </li>
                        </Link>
                    ))}
                </ul>

            }
        </>
    );
}
