import React from "react"


export function ErrorMessage({errorMessage}) {

    return (
        <>
            {errorMessage &&
                <div className="bg-red-700 md:col-span-3 px-4 mb-8">
                    <span className="inline-flex text-sm text-white">{errorMessage}</span>
                </div>
            }

        </>
    );
}