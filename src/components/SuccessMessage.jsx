import React from "react"


export function SuccessMessage({successMessage}) {

    return (
        <>
            {successMessage &&
                <div className="bg-teal-700 md:col-span-3 px-4">
                    <span className="inline-flex text-sm text-white">{successMessage}</span>
                </div>
            }

        </>
    );
}