import React, {useState} from "react"
import {useForm} from "react-hook-form";
import {api} from "@/services/api";
import {AppError} from "@/utils/AppError";
import {AUTH_STORAGE} from "@/storage/storageConfig";
import {SuccessMessage} from "@/components/SuccessMessage";
import {ErrorMessage} from "@/components/ErrorMessage";


export function FormDealPhoto({deal}) {

    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);


    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        const token = localStorage.getItem(AUTH_STORAGE);
        const formData = new FormData();
        formData.append('file', data.file[0]);

        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await api.post('/deal/imageStore/'+ deal.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccessMessage('Imagem criada com sucesso!');
            setTimeout(function(){
                window.location.reload();
            }, 1000);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const errorMsn = isAppError ? error.message : 'Não foi possível atualizar a a Oferta. Tente novamente mais tarde.';
            setErrorMessage(errorMsn);
        }

    };

    return (
        <>

            <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-4">
                <SuccessMessage successMessage={successMessage}/>
                <ErrorMessage errorMessage={errorMessage} />
                <div className="px-4 sm:px-0">
                    <h2 className="text-base font-semibold leading-7 text-gray-900"> Imagem da Oferta</h2>

                    <div className="grid grid-cols-2 gap-4">
                        {deal.photos.map((photo) => (
                            <div className="col-span-1" key={photo.id}>
                                <img alt="" className="w-24 h-24  flex-shrink-0" src={photo.src}/>
                            </div>
                        ))}
                    </div>


                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3">


                    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                        <input type="file" {...register("file")} />
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>

        </>
    );
}