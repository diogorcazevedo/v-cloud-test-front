'use client'

import React, {useEffect, useState} from "react";
import {FormInviteUpdate} from "@/components/forms/FormInviteUpdate";
import {AUTH_STORAGE} from "@/storage/storageConfig";
import {api} from "@/services/api";
import {getRequestError} from "@/app/services/error";
import {ErrorMessage} from "@/components/ErrorMessage";

export default function Update({params}) {

    const [invite, setInvite] = useState();
    const [errorMessage, setErrorMessage] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem(AUTH_STORAGE);
        const getData = async () => {
            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await api.get('/invite/show/'+params.invite);
                setInvite(response.data.invite)
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
                <>
                    <div className="bg-white shadow ">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">Editar dados do convite e reenviar por email</h3>
                        </div>
                    </div>

                    <div className="space-y-10 divide-y divide-gray-900/10">
                        <FormInviteUpdate invite={invite}/>
                    </div>
                </>
            }


        </>

    )
}
