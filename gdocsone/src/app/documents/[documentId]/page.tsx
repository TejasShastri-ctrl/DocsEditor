// ! version issues. It should not be a promise I suppose
// ! VERDICT - commented code works too

// One should use a Promise instead of direct constants after the from nextjs 15 I think
// even if it returns the values correctly on the surface. For large projects, a console command has
// been provided to convert all values async

import { Editor } from "./editor";
import { Toolbar } from "./toolbar";


interface DocIDPageProps {
    params : Promise<{ documentId: string}>;
}

const DocID = async ({params}: DocIDPageProps) => {
    const awaitedParams = await params;
    const docID = awaitedParams.documentId;

    console.log(docID);
    return (
        <div className="min-h-screen bg-[#FAFBFD]">
        <Toolbar />
        <Editor />
        </div>
        
    )
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

