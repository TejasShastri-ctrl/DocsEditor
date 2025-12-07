import Link from "next/link";
import Image from "next/image";

import React from 'react'
import { SearchInput } from "./search-input";
import { UserButton, OrganizationSwitcher } from '@clerk/nextjs'

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full px-4 relative">
      <div className="flex gap-3 items-center shrink-0 pr-6 z-10">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>
        <h3 className="text-xl">Docs</h3>
      </div>
      <div className="flex flex-row mr-10 gap-x-10 truncate">
        <SearchInput />
        <div className="flex gap-3 items-center pl-6">

          {/*//! Good implementation in the way that a new JWT token gets generated every time you switch org because the page 'reloads' */}
          <OrganizationSwitcher
            afterCreateOrganizationUrl="/"
            afterLeaveOrganizationUrl="/"
            afterSelectOrganizationUrl="/"
            afterSelectPersonalUrl="/"
          /> {/*Clerk is fucking goated*/}
          <UserButton />

        </div>
      </div>
    </nav>
  )
}