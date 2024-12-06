"use client"
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faBell, faXmark} from "@fortawesome/free-solid-svg-icons";
import AppLogo from "@/app/ui/AppLogo";
import LanguageChanger from "@/app/ui/LanguageChanger";
import Link from "next/link";
import {useParams} from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const AppNavigation = ({navigation}) => {

  const params = useParams()
  const nav = navigation?.map(item => ({
    name: item.name,
    href: item.slug,
    current: item.slug === params.category,
    id: item.id
  }))

  return <Disclosure as="nav" className="bg-gray-50 dark:bg-gray-800 py-6">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          {/* Mobile menu button*/}
          <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open main menu</span>
            <FontAwesomeIcon icon={faBars} aria-hidden="true" className="block size-6 group-data-[open]:hidden" />

            <FontAwesomeIcon icon={faXmark} aria-hidden="true" className="hidden size-6 group-data-[open]:block" />

          </Disclosure.Button>
        </div>
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex shrink-0 items-center">
            <Link href={`/`}>
              <AppLogo className="h-8 w-auto" />
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4 flex-wrap md:h-3">
              {nav.map((item) => item.id > 0 && item.id < 8 && (
                  <Link
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                          item.current ? 'bg-gray-200 dark:bg-gray-900 dark:text-white' : 'dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium uppercase',
                      )}
                  >
                    {item.name}
                  </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


          {/* Profile dropdown */}
          <LanguageChanger className="relative ml-3" />
        </div>
      </div>
    </div>

    <Disclosure.Panel className="sm:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {/*{nav.map((item) => (*/}
        {/*    <Disclosure.Button*/}
        {/*        key={item.name}*/}
        {/*        as="a"*/}
        {/*        href={item.href}*/}
        {/*        aria-current={item.current ? 'page' : undefined}*/}
        {/*        className={classNames(*/}
        {/*            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',*/}
        {/*            'block rounded-md px-3 py-2 text-base font-medium uppercase',*/}
        {/*        )}*/}
        {/*    >*/}
        {/*      {item.name}*/}
        {/*    </Disclosure.Button>*/}
        {/*))}*/}
      </div>
    </Disclosure.Panel>
  </Disclosure>
}