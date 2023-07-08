'use client'


import React, {useEffect, useState} from "react";
import {AUTH_STORAGE, USER_STORAGE} from "@/storage/storageConfig";
import {api} from "@/services/api";
import {AppError} from "@/utils/AppError";
import {FormUser} from "@/components/forms/FormUser";
import {FormLocation} from "@/components/forms/FormLocation";
import {FormPassword} from "@/components/forms/FormPassword";
import {useRouter} from "next/navigation";
import {getRequestError} from "@/app/services/error";
import {ErrorMessage} from "@/components/ErrorMessage";

export default function Profile() {

    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem(USER_STORAGE));
        const token = localStorage.getItem(AUTH_STORAGE);
        const getData = async () => {
            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await api.get('/register/show/'+item.id);
                setUserData(response.data.user)
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
        <div className="grid grid-cols-1 gap-8">
            <div className="px-6">
                <h3 className="text-2xl leading-6 text-green-700">Editar Perfil</h3>
            </div>
            <FormUser user={userData} />
            <FormLocation user={userData} />
            <FormPassword user={userData}/>
            {/*<FormDeals/>*/}
            {/*<FormBids/>*/}
            {/*<FormMessages/>*/}
        </div>
        }
        </>
    )
}
