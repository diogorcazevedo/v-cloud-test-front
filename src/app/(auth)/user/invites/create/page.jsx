'use client'

import React from "react";


import {FormInviteCreate} from "@/components/forms/FormInviteCreate";
import Link from "next/link";

export default function Create() {


    return (
        <>
            <div className="bg-white shadow ">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Criar convite e enviar por email</h3>
                </div>
            </div>

            <div className="space-y-10 divide-y divide-gray-900/10">
                <FormInviteCreate/>
            </div>
        </>

    )
}
