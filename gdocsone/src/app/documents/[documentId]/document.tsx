"use client"

import { Preloaded, usePreloadedQuery } from "convex/react";
import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Room } from "./room";
import { Toolbar } from "./toolbar";
import { api } from "../../../../convex/_generated/api";



//! Convex now provides preloaded fetching. So I do not need to manually fetch from the server
//! Thankyou whoever made that convex tutorial
//! The advantage is that this will be faster but the disadvantage is that this is going to confuse the fuck out of me when I revisit this project and wonder why and how I did this


interface DocProps {
    preloadedDocument: Preloaded<typeof api.documents.getById>
}

export const DocComponent = ({ preloadedDocument }: DocProps) => {

    //! Now, why was this necessary? Because the document can be updated anytime
    const document = usePreloadedQuery(preloadedDocument);

    return (
        <>
            <div className="flex fixed flex-col px-4 pt-2 gap-y-2 top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
                <Navbar data={document}/>
                <Toolbar />
            </div>
            <div className="flex flex-col h-screen w-full overflow-auto bg-[#FAFBFD]">
                <div className="pt-[114px] print:pt-0">
                    <Room>
                        <Editor initialContent={document?.initialContent} />
                    </Room>
                </div>
            </div>
        </>

    );
}