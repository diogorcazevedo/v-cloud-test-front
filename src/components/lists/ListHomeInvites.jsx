'use client'

import React, { useEffect, useState} from "react";
import {AUTH_STORAGE, USER_STORAGE} from "@/storage/storageConfig";
import {api} from "@/services/api";
import {useRouter} from "next/navigation";
import {getRequestError} from "@/app/services/error";
import {ErrorMessage} from "@/components/ErrorMessage";



export default function ListHomeInvites() {

    const [invites, setInvites] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem(USER_STORAGE));
        const token = localStorage.getItem(AUTH_STORAGE);
        const getData = async () => {
            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await api.get('/invite/getAllFromUser/'+item.id);
                setInvites(response.data.invites)
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
                <ul role="list" className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
                    {invites.map((invite) => (
                        <li key={invite.id}>
                            <img className="mx-auto h-24 w-24 rounded-full" src={invite.guest? invite.guest.src: "https://vibbra.s3.sa-east-1.amazonaws.com/vibbraneo/15/13"} alt="" />
                            <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{invite.guest?invite.guest.name:""}</h3>
                        </li>
                    ))}
                </ul>

            }
        </>
    );
}
