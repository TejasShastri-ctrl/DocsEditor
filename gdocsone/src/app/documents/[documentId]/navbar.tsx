"use client"

import { useEditorStore } from "@/app/store/use-editor-store";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { 
    FileIcon, FileJson2Icon, GlobeIcon, FileTextIcon, 
    FilePlus2Icon, FilePenIcon, Trash2Icon, PrinterIcon, 
    Undo2Icon, Redo2Icon, TextIcon, BoldIcon, ItalicIcon, 
    UnderlineIcon, RemoveFormattingIcon 
} from "lucide-react"; // Ensure icons are imported
import { DocumentInput } from "./document-input";
import Image from "next/image";
import Link from "next/link";
import { RenameDialog } from "@/components/rename-dialog";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { BsFilePdf } from "react-icons/bs";
import { toast } from "sonner";
import { RemoveDialog } from "@/components/remove-dialog";

// FIX 1: Allow 'null' or 'undefined' in the Props interface
interface Props {
  data?: Doc<"documents"> | null;
}

export const Navbar = ({ data }: Props) => {
  const { editor } = useEditorStore();
  const params = useParams();
  const documentId = params.documentId as Id<"documents">;


  const router = useRouter();

  
  // FIX 2: Rename 'document' to 'currentDoc' to avoid conflict with browser 'document'
  const currentDoc = useQuery(api.documents.getById, { id: documentId });

  // ----------------------------------------------------------------------
  // DOWNLOAD LOGIC
  // ----------------------------------------------------------------------
  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    // FIX 2b: Now 'document.createElement' refers to the global browser DOM
    const a = document.createElement("a"); 
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = async (format: 'json' | 'html' | 'text' | 'pdf') => {
    if (!editor || !currentDoc) return;

    const baseFilename = currentDoc.title || 'document';
    let content: string;
    let mimeType: string;
    let filename: string;

    switch (format) {
      case 'json':
        content = JSON.stringify(editor.getJSON(), null, 2);
        mimeType = 'application/json';
        filename = `${baseFilename}.json`;
        break;
      case 'html':
        content = editor.getHTML();
        mimeType = 'text/html';
        filename = `${baseFilename}.html`;
        break;
      case 'text':
        content = editor.getText();
        mimeType = 'text/plain';
        filename = `${baseFilename}.txt`;
        break;
      case 'pdf':
        // const element = document.querySelector('.ProseMirror') as HTMLElement; // FIX 1: Cast generic Element to HTMLElement
        
        // if (!element) return;

        // const options = {
        //     margin: 10,
        //     filename: `${baseFilename}.pdf`,
        //     image: { type: 'jpeg' as const, quality: 0.98 }, // FIX 2: Assert specific literal type
        //     html2canvas: { 
        //         scale: 2, 
        //         useCORS: true,
        //         logging: false,
        //         onclone: (clonedDoc: Document) => {
        //             const editorElement = clonedDoc.querySelector('.ProseMirror') as HTMLElement;
        //             if (editorElement) {
        //                 editorElement.style.color = '#000000';
        //                 editorElement.style.background = '#FFFFFF';
        //                 editorElement.style.backgroundColor = '#FFFFFF';
        //             }
        //         }
        //     },
        //     jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const } // Optional: strict typing here too
        // };

        // try {
        //     // @ts-ignore
        //     const html2pdf = (await import('html2pdf.js')).default;
        //     await html2pdf().set(options).from(element).save();
        // } catch (error) {
        //     console.error("PDF generation failed:", error);
        // }
        
        // return;
        toast.error('PDF download is broken rn. Print it instead')
      default:
        return;
    }

    // Generic download for JSON, HTML, Text
    const blob = new Blob([content], { type: mimeType });
    onDownload(blob, filename);
  };
  // ----------------------------------------------------------------------



  const mutation = useMutation(api.documents.create);

  const onNewDOcument = () => {
    mutation({
        title: "Untitled Document",
        initialContent: ""
    })
    .then((id) => {
        toast.success("Document Created")
        router.push(`/documents/${id}`)
    })
  }



  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  if (currentDoc === undefined) {
    return <p>Loading...</p>;
  }

  if (currentDoc === null) {
    return <p>Not Found</p>;
  }

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>
        <div className="flex flex-col">
          {/* document input */}
          <DocumentInput title={currentDoc.title} />
          {/* menu bar */}
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="size-4 mr-4" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => handleDownload('json')}>
                        <FileJson2Icon className="size-4 mr-2" />
                        JSON
                      </MenubarItem>

                      <MenubarItem onClick={() => handleDownload('html')}>
                        <GlobeIcon className="size-4 mr-2" />
                        HTML
                      </MenubarItem>

                      <MenubarItem onClick={() => handleDownload('pdf')}>
                        <BsFilePdf className="size-4 mr-2" />
                        PDF
                      </MenubarItem>

                      <MenubarItem onClick={() => handleDownload('text')}>
                        <FileTextIcon className="size-4 mr-2" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarItem onClick={onNewDOcument}>
                    <FilePlus2Icon className="size-4 mr-2" />
                    Create New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <RenameDialog
                    documentId={documentId}
                    initialTitle={currentDoc.title}
                  >
                    <MenubarItem onSelect={(e) => e.preventDefault()}>
                      <FilePenIcon className="size-4 mr-2" />
                      Rename
                    </MenubarItem>
                  </RenameDialog>
                  <MenubarSeparator />
                  <RemoveDialog documentId={documentId}>
                    <MenubarItem>
                    <Trash2Icon className="size-4 mr-2" />
                    Remove
                  </MenubarItem>
                  </RemoveDialog>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="size-4 mr-2" />
                    Print
                    <MenubarShortcut className="text-sm text-gray-400">
                      ctrl+p
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            
              {/* ... Edit and Insert Menus ... */}
               <MenubarMenu>
                    <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                        Edit
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                            <Undo2Icon className="size-4 mr-2" />
                            Undo
                        </MenubarItem>
                        <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                            <Redo2Icon className="size-4 mr-2" />
                            Redo
                        </MenubarItem>
                    </MenubarContent>
               </MenubarMenu>

               <MenubarMenu>
                    <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                        Insert
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarSub>
                            <MenubarSubTrigger>Table</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem onClick={() => insertTable({rows: 1, cols: 1})}>
                                    1 x 1
                                </MenubarItem>
                                {/* ... more table items ... */}
                            </MenubarSubContent>
                        </MenubarSub>
                    </MenubarContent>
               </MenubarMenu>

              {/* ... Format Menu ... */}
               <MenubarMenu>
                 <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                    Format
                 </MenubarTrigger>
                 <MenubarContent>
                    <MenubarSub>
                        <MenubarSubTrigger>
                            <TextIcon className="size-4 mr-2" />
                            Text
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                                <BoldIcon className="size-4 mr-2" />
                                Bold
                            </MenubarItem>
                            <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                                <ItalicIcon className="size-4 mr-2" />
                                Italic
                            </MenubarItem>
                            <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                                <UnderlineIcon className="size-4 mr-2" />
                                Underline
                            </MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                        <RemoveFormattingIcon className="size-4 mr-2" />
                        Clear Formatting
                    </MenubarItem>
                 </MenubarContent>
               </MenubarMenu>

            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center pl-6">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
};