'use client'


import React, {useEffect, useState} from "react";
import {AUTH_STORAGE, USER_STORAGE} from "@/storage/storageConfig";
import {api} from "@/services/api";
import {useRouter} from "next/navigation";
import {getRequestError} from "@/app/services/error";
import {ErrorMessage} from "@/components/ErrorMessage";
import {FormLocationDelivery} from "@/components/forms/FormLocationDelivery";
import Link from "next/link";


export default function Deal({ params }) {

    const [user, setUser] = useState(null);
    const [deal, setDeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        const token = localStorage.getItem(AUTH_STORAGE);
        const item = JSON.parse(localStorage.getItem(USER_STORAGE));

        const getData = async () => {
            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await api.get('/deal/getById/'+params.deal);
                setUser(item)
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
                <div className="bg-white">
                    <section aria-labelledby="features-heading" className="relative">
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden sm:aspect-w-5 lg:aspect-none lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-16">
                            <img
                                src={deal.photos[0]? deal.photos[0].src:"https://vibbra.s3.sa-east-1.amazonaws.com/vibbraneo/15/12"}
                                alt="Black leather journal with silver steel disc binding resting on wooden shelf with machined steel pen."
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                        </div>

                        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-24">
                            <div className="lg:col-start-2">
                                <p className="mt-4 text-4xl font-bold tracking-tight text-gray-900">Confirmar entrega</p>
                                <p className="mt-4 text-gray-500">
                                    {deal.description}
                                </p>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-1">
                                    <FormLocationDelivery deal={deal} user={user} />
                                </div>
                                {/* Nav section */}
                                <div className="bg-indigo-100 mt-6">
                                    <div className="mx-auto max-w-7xl px-6 py-8 lg:flex lg:items-center lg:justify-between lg:px-8">
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">

                                        </h2>
                                        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
                                            <Link href="/user/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
                                                gerenciar <span aria-hidden="true">→</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>
            }
        </>

    )
}
