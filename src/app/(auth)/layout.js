'use client'

import React, {Fragment, useEffect, useState} from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    Cog6ToothIcon,
    HomeIcon, RocketLaunchIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {useRouter} from "next/navigation";
import {AUTH_STORAGE, USER_STORAGE} from "@/storage/storageConfig";

const navigation = [
    { name: 'Loja Virtual', href: '/store', icon: HomeIcon, current: true },
    { name: 'Convites', href: '/user/invites', icon: RocketLaunchIcon, current: false },
]
const purchases = [
    { id: 1, name: 'Propostas Aprovadas', href: '/user/bids/purchase', initial: 'C', current: false },
    { id: 2, name: 'Abertas', href: '/user/bids/open', initial: 'A', current: false },
    { id: 3, name: 'Todas', href: '/user/bids', initial: 'T', current: false },
]
const sales = [
    { id: 1, name: 'Criar', href: '/user/deals/create', initial: 'C', current: false },
    { id: 1, name: 'Propostas Aprovadas', href: '/user/deals/sale', initial: 'V', current: false },
    { id: 1, name: 'Abertas', href: '/user/deals/open', initial: 'A', current: false },
    { id: 3, name: 'Listar', href: '/user/deals', initial: 'L', current: false },
    { id: 4, name: 'Desativados', href: '/user/deals/inactive', initial: 'D', current: false },

]
const userNavigation = [
    { name: 'Editar Perfil', href: '/user/profile' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function AuthLayout({ children }) {

    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [userProfile, setUserProfile] = useState(false)
    const { push } = useRouter();
    const Logout = () => {
        localStorage.removeItem(USER_STORAGE);
        localStorage.removeItem(AUTH_STORAGE);
        push('/');
    }

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem(USER_STORAGE));
        if (!item){
            push('/');
        }else{
            setUserProfile(item.name)
            setLoading(false);
        }

    },[loading])



    return (
        <section>
            <>
                {loading && <p>Loading...</p>}
                {!loading &&

                    <div>
                        <Transition.Root show={sidebarOpen} as={Fragment}>
                            <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="transition-opacity ease-linear duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity ease-linear duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-gray-900/80" />
                                </Transition.Child>

                                <div className="fixed inset-0 flex">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transition ease-in-out duration-300 transform"
                                        enterFrom="-translate-x-full"
                                        enterTo="translate-x-0"
                                        leave="transition ease-in-out duration-300 transform"
                                        leaveFrom="translate-x-0"
                                        leaveTo="-translate-x-full"
                                    >
                                        <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-in-out duration-300"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="ease-in-out duration-300"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                                        <span className="sr-only">Close sidebar</span>
                                                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </Transition.Child>
                                            {/* Sidebar component, swap this element with another sidebar if you like */}
                                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                                                <div className="flex h-16 shrink-0 items-center">
                                                    <img
                                                        className="h-12 w-auto"
                                                        src="/logo_vibbraneo.png"
                                                        alt="Vibbra"
                                                    />
                                                </div>
                                                <nav className="flex flex-1 flex-col">
                                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                        <li>
                                                            <ul role="list" className="-mx-2 space-y-1">
                                                                {navigation.map((item) => (
                                                                    <li key={item.name}>
                                                                        <a
                                                                            href={item.href}
                                                                            className={classNames(
                                                                                item.current
                                                                                    ? 'bg-gray-800 text-white'
                                                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                            )}
                                                                        >
                                                                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                                            {item.name}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <div className="text-xs font-semibold leading-6 text-gray-400">Suas Compras</div>
                                                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                                {purchases.map((purchase) => (
                                                                    <li key={purchase.name}>
                                                                        <a
                                                                            href={purchase.href}
                                                                            className={classNames(
                                                                                purchase.current
                                                                                    ? 'bg-gray-800 text-white'
                                                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                            )}
                                                                        >
                                                                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                                                                {purchase.initial}
                                                                              </span>
                                                                            <span className="truncate">{purchase.name}</span>
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <div className="text-xs font-semibold leading-6 text-gray-400">Suas Vendas</div>
                                                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                                {sales.map((sale) => (
                                                                    <li key={sale.name}>
                                                                        <a
                                                                            href={sale.href}
                                                                            className={classNames(
                                                                                sale.current
                                                                                    ? 'bg-gray-800 text-white'
                                                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                            )}
                                                                        >
                                                                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                                                                {sale.initial}
                                                                              </span>
                                                                            <span className="truncate">{sale.name}</span>
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </li>
                                                        <li className="mt-auto">
                                                            <a
                                                                href="/user/dashboard"
                                                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                                            >
                                                                <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                                Settings
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition.Root>

                        {/* Static sidebar for desktop */}
                        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                                <div className="flex h-16 shrink-0 items-center">
                                    <img
                                        className="h-12 w-auto"
                                        src="/logo_vibbraneo.png"
                                        alt="Vibbra"
                                    />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <a
                                                            href={item.href}
                                                            className={classNames(
                                                                item.current
                                                                    ? 'bg-gray-800 text-white'
                                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                            )}
                                                        >
                                                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li>
                                            <div className="text-xs font-semibold leading-6 text-gray-400">Suas Compras</div>
                                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                {purchases.map((purchase) => (
                                                    <li key={purchase.name}>
                                                        <a
                                                            href={purchase.href}
                                                            className={classNames(
                                                                purchase.current
                                                                    ? 'bg-gray-800 text-white'
                                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                            )}
                                                        >
                                                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                                                {purchase.initial}
                                                              </span>
                                                            <span className="truncate">{purchase.name}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li>
                                            <div className="text-xs font-semibold leading-6 text-gray-400">Suas Vendas</div>
                                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                {sales.map((sale) => (
                                                    <li key={sale.name}>
                                                        <a
                                                            href={sale.href}
                                                            className={classNames(
                                                                sale.current
                                                                    ? 'bg-gray-800 text-white'
                                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                            )}
                                                        >
                                                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                                                {sale.initial}
                                                              </span>
                                                            <span className="truncate">{sale.name}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="mt-auto">
                                            <a
                                                href="/user/dashboard"
                                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                            >
                                                <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                Settings
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <div className="lg:pl-72">
                            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                                <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                                    <span className="sr-only">Open sidebar</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Separator */}
                                <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

                                <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                                    <div className="relative flex flex-1"></div>
                                    <div className="flex items-center gap-x-4 lg:gap-x-6">


                                        {/* Separator */}
                                        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative">
                                            <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full bg-gray-50"
                                                    src="https://vibbra.s3.sa-east-1.amazonaws.com/vibbraneo/15/13"
                                                    alt=""
                                                />
                                                <span className="hidden lg:flex lg:items-center">
                                                  <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                                                    {userProfile}
                                                  </span>
                                                  <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </span>
                                            </Menu.Button>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                                    {userNavigation.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) => (
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-50' : '',
                                                                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                        <Menu.Item>
                                                            <button
                                                                onClick={Logout}
                                                                className="block px-3 py-1 text-sm leading-6 text-gray-900">
                                                                Sair
                                                            </button>
                                                        </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                            </div>

                            <main className="py-10">
                                <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                                <div className="mb-72"></div>
                            </main>
                        </div>
                    </div>
                }
            </>
        </section>
    )
}
