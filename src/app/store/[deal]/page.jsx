'use client'


import React, {useEffect, useState} from "react";
import {AUTH_STORAGE, USER_STORAGE} from "@/storage/storageConfig";
import {api} from "@/services/api";
import {useRouter} from "next/navigation";
import SlideBidCreate from "@/components/SlideBidCreate";
import {getRequestError} from "@/app/services/error";
import {ErrorMessage} from "@/components/ErrorMessage";
import SlideMessageCreate from "@/components/SlideMessageCreate";
import SlideSaleCheckout from "@/components/SlideSaleCheckout";

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
                    <div className="bg-gray-900 py-12 sm:py-12">
                        <div className="relative isolate">
                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
                                    <img
                                        className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
                                        src={deal.photos[0]? deal.photos[0].src:"https://vibbra.s3.sa-east-1.amazonaws.com/vibbraneo/15/12"}
                                        alt=""
                                    />
                                    <div className="w-full flex-auto">
                                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Oportunidade !</h2>
                                        <p className="mt-6 text-lg leading-8 text-gray-300">
                                            {deal.description}
                                        </p>
                                        <div className="my-10">
                                            <SlideSaleCheckout deal={deal} user={user} />
                                        </div>
                                        {deal.trade_for &&

                                            <div className="px-4 py-4">
                                                <div className="grid grid-cols-4 gap-4">
                                                    <div className="col-span-4">
                                                        <p className="text-white">O vendedor deste produto aceita troca por outros produtos e serviços</p>
                                                    </div>

                                                    <div className="col-span-4">
                                                        <SlideBidCreate deal={deal} user={user} />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        <div className="mt-10 flex justify-end">
                                            <SlideMessageCreate deal={deal} user={user} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
                                aria-hidden="true"
                            >
                                <div
                                    className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
                                    style={{
                                        clipPath:
                                            'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white">
                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                            <h2 className="sr-only">Products</h2>

                            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                {deal.photos?.map((photo) => (
                                    <div key={photo.id}>
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                            <img
                                                src={photo? photo.src:"https://vibbra.s3.sa-east-1.amazonaws.com/vibbraneo/15/12"}
                                                alt={deal.description}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}
