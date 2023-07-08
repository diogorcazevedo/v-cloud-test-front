'use client'

import {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {Bars3Icon, XMarkIcon,} from '@heroicons/react/24/outline'
import {Cog8ToothIcon} from "@heroicons/react/24/solid";
import Link from "next/link";


export default function StoreLayout({ children }) {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <section>
            <div>
                {/* Mobile menu */}
                <Transition.Root show={mobileMenuOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileMenuOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                    <div className="flex px-4 pb-2 pt-5">
                                        <button
                                            type="button"
                                            className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>


                                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">

                                        <div  className="flow-root">
                                            <p>.</p>
                                        </div>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Hero section */}
                <div className="relative bg-gray-900">
                    {/* Decorative image and overlay */}
                    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                        <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />

                    {/* Navigation */}
                    <header className="relative z-10">
                        <nav aria-label="Top">
                            {/* Secondary navigation */}
                            <div className="bg-gray-900">
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                    <div>
                                        <div className="flex h-16 items-center justify-between">
                                            {/* Logo (lg+) */}
                                            <div className="hidden lg:flex lg:flex-1 lg:items-center">
                                                <a href="/store">
                                                    <span className="sr-only">vibbraneo</span>
                                                    <img className="h-12 w-auto" src="/logo_vibbraneo.png" alt="vibbraneo"/>
                                                </a>
                                            </div>

                                            {/* Mobile menu and search (lg-) */}
                                            <div className="flex flex-1 items-center lg:hidden">
                                                <button type="button" className="-ml-2 p-2 text-white" onClick={() => setMobileMenuOpen(true)}>
                                                    <span className="sr-only">Open menu</span>
                                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>

                                            {/* Logo (lg-) */}
                                            <a href="/store" className="lg:hidden">
                                                <span className="sr-only">vibbraneo</span>
                                                <img src="/logo_vibbraneo.png" className="h-12 w-auto" alt="vibbraneo"/>
                                            </a>

                                            <div className="flex flex-1 items-center justify-end">
                                                <Link href="/user/dashboard"  className="hidden text-sm font-medium text-white lg:block">
                                                    Dashboard
                                                </Link>

                                                <div className="flex items-center lg:ml-8">
                                                    {/* Dashboard */}
                                                    <Link href="/user/dashboard" className="p-2 text-white lg:hidden">
                                                        <span className="sr-only">Help</span>
                                                        <Cog8ToothIcon className="h-6 w-6" aria-hidden="true" />
                                                    </Link>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </header>

                </div>

                <main>
                    {children}
                </main>

            </div>
        </section>
    )
}
