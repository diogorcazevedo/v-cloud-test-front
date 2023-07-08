'use client'

import ListHomeDeals from "@/components/lists/ListHomeDeals";
import ListHomeInvites from "@/components/lists/ListHomeInvites";



export default function Dashboard() {

    return (
        <div className="bg-white">
            <main>
                <div className="py-4 my-4 overflow-hidden rounded-lg bg-gray-50 shadow-xl">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="bg-white py-8 sm:py-8">
                            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                <div className="mx-auto max-w-full lg:mx-0">
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="justify-self-start">
                                            <h2 className="text-2xl font-bold tracking-tight text-vibbra-blue-500 sm:text-2xl">Suas Ofertas</h2>
                                        </div>
                                        <div className="justify-self-end">
                                            <button
                                                type="button"
                                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Criar nova oferta
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                    <ListHomeDeals/>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="py-4 my-4 overflow-hidden rounded-lg bg-gray-50 shadow-xl">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="bg-white py-8 sm:py-8">
                            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                <div className="mx-auto max-w-full lg:mx-0">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="justify-self-start">
                                            <h2 className="text-2xl font-bold tracking-tight text-vibbra-blue-500 sm:text-2xl">Seus Convites</h2>
                                        </div>

                                        <div className="justify-self-end">
                                            <button
                                                type="button"
                                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Convidar
                                            </button>
                                        </div>
                                    </div>

                                    <p className="mt-2 leading-8 text-gray-600">
                                        Ampliar com qualidade nossa rede representa melhores oportunidades de negócios confiáveis
                                    </p>
                                </div>
                                <ListHomeInvites/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
