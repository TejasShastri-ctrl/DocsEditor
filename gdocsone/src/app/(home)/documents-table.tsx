import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel"

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import { Loader2Icon } from "lucide-react";
import { DocumentRow } from "./document-row";
import { Button } from "@/components/ui/button";

interface Props {
    documents: Doc<"documents">[] | undefined;
    loadMore: (numItems: number) => void;
    status: PaginationStatus;
}

export const DocumentsTable = ({
    documents, loadMore, status
}: Props) => {
    return (
        <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
            {documents === undefined ? (
                <div className="flex justify-center items-center h-24">
                <Loader2Icon className="animate-spin text-muted-foreground size-4" />
            </div>
        ) : (
        <div>
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-none">
                        <TableHead>name</TableHead>
                        {/* To hide in mobile mode, the following classname: */}
                        <TableHead className="hidden md:table-cell">Shared</TableHead>
                        <TableHead className="hidden md:table-cell">Created At</TableHead>
                    </TableRow>
                </TableHeader>
                {documents.length === 0 ? (
                    <TableBody>
                        <TableRow>
                            <TableCell>No Documents Found</TableCell>
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                        {documents.map((document) => {
                            return <DocumentRow key={document._id} document={document} />
                        })}
                    </TableBody>
                )}
            </Table>
        </div>
        )}

        <div className="flex items-center justify-center">
            <Button variant="ghost" 
            size="sm" 
            onClick={() => loadMore(5)} 
            disabled={status !== "CanLoadMore"}>
                {status === "CanLoadMore" ? "Load more" : "End of Results"}
            </Button>
        </div>
            
        </div>
    )
}