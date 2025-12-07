import { BsCloudCheck } from "react-icons/bs";

export const DocumentInput = () => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-lg text-blue-400 px-1.5 cursor-pointer truncate">Untitled document</span>
            <BsCloudCheck />
        </div>
    )
}