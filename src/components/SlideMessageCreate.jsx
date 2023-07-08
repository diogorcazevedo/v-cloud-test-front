import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import FormMessageCreate from "@/components/forms/FormMessageCreate";
import {XMarkIcon} from "@heroicons/react/24/outline";
import ListDealMessages from "@/components/lists/ListDealMessages";


export default function SlideMessageCreate({deal,user}) {
    const [open, setOpen] = useState(false)


    return (
        <>

            <button
                onClick={() => setOpen(true)}
                type="button"
                //className="rounded-md  px-3 py-2 text-sm bg-teal-50 text-teal-700 hover:bg-teal-100 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                className="rounded-full bg-gray-100 text-teal-700 hover:bg-teal-100  p-6 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
                Mensagem
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
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-3xl bg-white">

                                        <div className="flex-1">
                                            {/* Header */}
                                            <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between space-x-3">
                                                    <div className="space-y-1">
                                                        <Dialog.Title className="text-lg font-medium text-gray-900"> Mensagens </Dialog.Title>
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
                                        </div>
                                        <ListDealMessages deal={deal} user={user}/>
                                        <FormMessageCreate deal={deal} user={user}/>
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
