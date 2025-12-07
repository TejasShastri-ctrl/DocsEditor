import { TableCell, TableRow } from "@/components/ui/table";
import { Doc } from "../../../convex/_generated/dataModel";
import { SiGoogledocs } from 'react-icons/si';
import { Building2Icon, CircleUserIcon, MoreVertical } from "lucide-react";

import { format } from 'date-fns';

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DocumentMenu } from "./document-menu";
import { useRouter } from "next/navigation";

interface DocumentRowProps {
    document: Doc<"documents">;
    // onNewTabClick: (id: string) => void
}

const onNewTabClick = (id: string) => {
    window.open(`/documents/${id}`, "_blank");
}
// So this work outside TOO!!!

export const DocumentRow = ({ document }: DocumentRowProps) => {
    const router = useRouter();
    const onRowClick = (id: string) => {
        router.push(`/documents/${id}`);
    }


    return (
        <TableRow onClick={() => onRowClick(document._id)}

            className="cursor-pointer">
            <TableCell className="w-[50px]">
                <SiGoogledocs className="size-6 fill-red-400" />
            </TableCell>
            <TableCell className="font-medium md:w-[45%]">
                {document.title}
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
                {document.organizationId ? <Building2Icon className="size-4" /> : <CircleUserIcon className="size-4" />}
                {document.organizationId ? "Organizational" : "Personal"}
            </TableCell>
            <TableCell>
                {format(new Date(document._creationTime), "MMM dd, yyyy")}
            </TableCell>
            <TableCell className="flex justify-end">
                <DocumentMenu
                    documentId={document._id}
                    title={document.title}
                    onNewTab={onNewTabClick}

                />
            </TableCell>
        </TableRow>
    )
}