// ! version issues. It should not be a promise I suppose
// ! VERDICT - commented code works too

// One should use a Promise instead of direct constants after the from nextjs 15 I think
// even if it returns the values correctly on the surface. For large projects, a console command has
// been provided to convert all values async

import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Room } from "./room";
import { Toolbar } from "./toolbar";
import { DocComponent } from "./document";

import {auth} from '@clerk/nextjs/server'

import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
// import Error from "next/error";


//! Previous version - the document saving was all room-based. I was misled all this time
// interface DocIDPageProps {
//     params: Promise<{ documentId: string }>;
// }

// const DocID = async ({ params }: DocIDPageProps) => {
//     const { documentId } = await params;

//     return (
//         <>
//             <div className="flex fixed flex-col px-4 pt-2 gap-y-2 top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
//                 <Navbar />
//                 <Toolbar />
//             </div>
//             <div className="flex flex-col h-screen w-full overflow-auto bg-[#FAFBFD]">
//                 <div className="pt-[114px] print:pt-0">
//                     <Room>
//                         <Editor />
//                     </Room>
//                 </div>
//             </div>
//         </>

//     );
// }

// export default DocID;


interface DocIDPageProps {
    params: Promise<{documentId: string}>;
}

const DocID = async ({params}: DocIDPageProps) => {
    const {documentId} = await params;
    
    const {getToken} = await auth();
    const token = await getToken({template: "convex"}) ?? undefined;

    if(!token) {
        throw new Error("Unauthorized")
    }

    const typedDocumentId = documentId as Id<"documents">;
    // one time thing I guess. Fly by nothing to see here

    const preloadedDoc = await preloadQuery(
        api.documents.getById, {id: typedDocumentId}, {token}
    )

    return <DocComponent preloadedDocument={preloadedDoc}/>
}

export default DocID