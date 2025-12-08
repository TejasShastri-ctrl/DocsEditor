// ! version issues. It should not be a promise I suppose
// ! VERDICT - commented code works too

// One should use a Promise instead of direct constants after the from nextjs 15 I think
// even if it returns the values correctly on the surface. For large projects, a console command has
// been provided to convert all values async

import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Room } from "./room";
import { Toolbar } from "./toolbar";

interface DocIDPageProps {
    params: Promise<{ documentId: string }>;
}

const DocID = async ({ params }: DocIDPageProps) => {
    const { documentId } = await params;

    return (
        <div className="flex flex-col h-screen w-full bg-[#FAFBFD]">
            <div className="flex flex-col px-4 pt-2 gap-y-2 top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
                <Navbar />
                <Toolbar />
            </div>

            <div className="pt-[114px print:pt-0">
                <Room>
                    <Editor />
                </Room>
            </div>
        </div>
    );
}

export default DocID;


// interface DocIDPageProps {
//     params: { documentId: string };
// }

// const DocIDPage = ({ params }: DocIDPageProps) => {
//     const docIDfinal = params.documentId;
//     console.log(docIDfinal);

//     return (
//         <div>
//             all manner of folk paying social calls. DocID is - {docIDfinal}
//         </div>
//     );
// };
// export default DocIDPage;

