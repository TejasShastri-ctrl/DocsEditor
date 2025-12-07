import { Loader2Icon } from "lucide-react"

interface FullScreenLoaderProps {
    label?: string
}

export const FullScreenLoader = ({label}: FullScreenLoaderProps) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-2">
            <Loader2Icon className="size-6 text-muted-foreground animate-spin" />
            {label && <p className="text-sm text-muted-foreground">{label}</p>}
        </div>
    )
}