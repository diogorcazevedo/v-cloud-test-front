import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {FormBidSale} from "@/components/forms/FormBidSale";



export default function SlideSaleCheckout({deal,user}) {
    const [open, setOpen] = useState(false)


    return (
        <>
            <button
                onClick={() => setOpen(true)}
                type="button"
                className="rounded-md px-3 py-2 text-sm shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
            >
                Comprar
            </button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative  z-50" onClose={setOpen}>
                    <div className="fixed inset-0" />
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">

                                            <div className="flex-1 bg-white">
                                                {/* Header */}
                                                <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                                    <div className="flex items-start justify-between space-x-3">
                                                        <div className="space-y-1">
                                                            <Dialog.Title className="text-lg font-medium text-gray-900"> Proposta de compra </Dialog.Title>
                                                        </div>
                                                        <div className="flex h-7 items-center">
                                                            <button
                                                                type="button"
                                                                className="text-gray-400 hover:text-gray-500"
                                                                onClick={() => setOpen(false)}
                                                            >
                                                                <span className="sr-only">Close panel</span>
                                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Divider container */}
                                                <div className="space-y-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                                                    <div className="bg-white ">
                                                        <div className="px-6 py-2">
                                                            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 px-4 py-4">
                                                                <h3 className="text-base font-semibold leading-6 text-gray-900">Forma de Pagamento</h3>
                                                                <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                                                                    <div className="max-w-xl text-sm text-gray-500">
                                                                        <p>
                                                                            O pagamento deve ser realizado por meio do PIX: 999999999999999
                                                                        </p>
                                                                        <p>
                                                                            O sistema automáticamente, no prazo máximo de 24h, comunica o pagamento e sua compra é aprovada
                                                                        </p>
                                                                        <p>
                                                                            Caso a aprovação não apareça no sistema depois do prazo máximo, favor entrar e, contato pelo canal: xxxx com comprovante de pagamento
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                                                    <div className="bg-white ">
                                                        <div className="px-6 py-2">
                                                            <FormBidSale deal={deal} user={user} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Action buttons */}
                                                <div className="flex-shrink-0 border-t border-gray-200 px-4 py-4 mt-12  sm:px-6">
                                                    <div className="flex justify-end space-x-3">
                                                        <button
                                                            type="button"
                                                            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
