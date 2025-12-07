'use client'

import React, { useState } from 'react'
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog'

import { Id } from '../../convex/_generated/dataModel';
import { api } from '../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface Props {
    documentId: Id<"documents">;
    initialTitle: string;
    children: React.ReactNode;
}

export const RenameDialog = ({ documentId, initialTitle, children }: Props) => {

    const update = useMutation(api.documents.updateById)
    const [isUpdating, setIsUpdating] = useState(false);

    const [title, setTitle] = useState(initialTitle);
    const [open, setOpen] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);

        update({id: documentId, title: title.trim() || "Untitled"})
            .catch(() => toast.error("Only respective document owners are allowed to rename documents"))
            .then(() => {
                toast.success("Document Renamed");
                setOpen(false); //!could put in finally but this is better design
            })
            .finally(() => {
                setIsUpdating(false);
            })
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Rename Doc</DialogTitle>
                        <DialogDescription>
                            Enter a new name for this document
                        </DialogDescription>
                    </DialogHeader>
                    <div className='my-4'>
                        <Input value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Doc Name'
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <DialogFooter>
                        <Button type='button'
                            variant="ghost"
                            disabled={isUpdating}
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            disabled={isUpdating}
                            onClick={(e) => e.stopPropagation()}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>    
    )
}
