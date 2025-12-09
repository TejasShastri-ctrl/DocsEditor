'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


// shadcn imports
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from '@/components/ui/menubar'


import { DocumentInput } from './document-input'
import { BoldIcon, FileIcon, FileJson2Icon, FilePenIcon, FilePlus2Icon, FilePlusIcon, FileTextIcon, GlobeIcon, ItalicIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, TextIcon, Trash2Icon, Underline, UnderlineIcon, Undo2Icon } from 'lucide-react'
import { BsFilePdfFill } from 'react-icons/bs'
import { useEditorStore } from '@/app/store/use-editor-store'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import { RenameDialog } from '@/components/rename-dialog'
import { Inbox } from './inbox'

export const Navbar = () => {

    const { editor } = useEditorStore();

    const insertTable = ({ rows, cols }: { rows: number, cols: number }) => {
        editor?.chain()
            .focus()
            .insertTable({ rows, cols, withHeaderRow: false })
            .run()
    };

    const params = useParams();
    const documentId = params.documentId as Id<"documents">;
    const document = useQuery(api.documents.getById, { id: documentId });

    if (document === undefined) {
        return <p>Loading...</p>;
    }

    // 2. Not Found / Auth Guard
    if (document === null) {
        return <p>Not Found</p>;
    }

    return (
        <nav className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <Link href="/">
                    <Image src="/logo.svg" alt='Logo' width={36} height={36} />
                </Link>
                <div className='flex flex-col'>
                    {/* document input */}
                    <DocumentInput title={document!.title} />
                    {/* menu bar */}
                    <div className='flex'>
                        <Menubar className='border-none bg-transparent shadow-none h-auto p-0'>
                            <MenubarMenu>
                                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                                    File
                                </MenubarTrigger>
                                <MenubarContent className='print:hidden'>
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <FileIcon className='size-4 mr-4' />
                                            Save
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem>
                                                <FileJson2Icon className='size-4 mr-2' />
                                                JSON
                                            </MenubarItem>

                                            <MenubarItem>
                                                <GlobeIcon className='size-4 mr-2' />
                                                HTML
                                            </MenubarItem>

                                            <MenubarItem>
                                                <BsFilePdfFill className='size-4 mr-2' />
                                                PDF
                                            </MenubarItem>

                                            <MenubarItem>
                                                <FileTextIcon className='size-4 mr-2' />
                                                Text
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>

                                    <MenubarItem>
                                        <FilePlus2Icon className='size-4 mr-2' />
                                        Create New Document
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <RenameDialog documentId={documentId} initialTitle={document!.title}>
                                        <MenubarItem onSelect={(e) => e.preventDefault()}>
                                            <FilePenIcon className='size-4 mr-2' />
                                            Rename
                                        </MenubarItem>
                                    </RenameDialog>
                                    <MenubarSeparator />
                                    <MenubarItem>
                                        <Trash2Icon className='size-4 mr-2' />
                                        Remove
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem onClick={() => window.print()}>
                                        <PrinterIcon className='size-4 mr-2' />
                                        Print
                                        <MenubarShortcut className='text-sm text-gray-400'>ctrl+p</MenubarShortcut>
                                    </MenubarItem>

                                </MenubarContent>
                            </MenubarMenu>


                            <MenubarMenu>
                                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                                    Edit
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                                        <Undo2Icon className='size-4 mr-2' />
                                        Undo
                                    </MenubarItem>

                                    <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                                        <Redo2Icon className='size-4 mr-2' />
                                        Redo
                                    </MenubarItem>


                                </MenubarContent>
                            </MenubarMenu>


                            <MenubarMenu>
                                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                                    Insert
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>Table</MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>
                                                1 x 1
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>
                                                2 x 2
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>
                                                3 x 3
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>
                                                4 x 4
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                </MenubarContent>
                            </MenubarMenu>



                            <MenubarMenu>
                                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                                    Format
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <TextIcon className='size-4 mr-2' />
                                            Text
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                                                <BoldIcon className='size-4 mr-2' />
                                                Bold
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                                                <ItalicIcon className='size-4 mr-2' />
                                                Italic
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                                                <UnderlineIcon className='size-4 mr-2' />
                                                Underline
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem>
                                        <RemoveFormattingIcon className='size-4 mr-2' />
                                        Clear Formatting
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>

                </div>
            </div>
            <div className="flex gap-3 items-center pl-6">

                <Inbox/>

                {/*//! Good implementation in the way that a new JWT token gets generated every time you switch org because the page 'reloads' */}
                <OrganizationSwitcher
                    afterCreateOrganizationUrl="/"
                    afterLeaveOrganizationUrl="/"
                    afterSelectOrganizationUrl="/"
                    afterSelectPersonalUrl="/"
                /> {/*Clerk is fucking goated*/}
                <UserButton />

            </div>
        </nav>
    )
}