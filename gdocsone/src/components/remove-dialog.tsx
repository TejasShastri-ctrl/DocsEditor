'use client'

import React, { useState } from 'react'
import { Id } from '../../convex/_generated/dataModel';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

import { toast } from 'sonner';

interface Props {
    documentId: Id<"documents">;
    children: React.ReactNode;
}

export const RemoveDialog = ({documentId, children}: Props) => {

    const remove = useMutation(api.documents.removeById)
    const [isRemov, setIsRemov] = useState(false);


  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will permanently delete the document
                    </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                    Cancel
                </AlertDialogCancel>

                <AlertDialogAction disabled={isRemov} onClick={(e) => {
                    e.stopPropagation();
                    setIsRemov(true);
                    remove({id: documentId})
                    .catch(() => toast.error("Only respective document owners are allowed to delete them"))
                    .then(() => toast.success("Document Deleted"))
                    .finally(() => setIsRemov(false))
                }}>
                    Delete
                </AlertDialogAction>
                
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}
