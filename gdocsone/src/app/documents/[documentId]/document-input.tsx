// DocumentInput.tsx
import { BsCloudCheck } from "react-icons/bs";

interface DocumentInputProps {
    title: string | undefined; // Accept string or undefined while loading
}

export const DocumentInput = ({ title }: DocumentInputProps) => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-lg text-blue-400 px-1.5 cursor-pointer truncate">
                {title || "Untitled"} {/* Display title or a loading placeholder */}
            </span>
            <BsCloudCheck />
        </div>
    )
}