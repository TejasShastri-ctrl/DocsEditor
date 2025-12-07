// This will now be visible in every folder under documents
// The layout does NOT rerender

interface docsLayoutProps {
    children: React.ReactNode;
}

const docsLayout = ({ children }: docsLayoutProps) => {
    return (
        <div className="flex flex-col gap-y-4">
            {children}
        </div>
    )
}

export default docsLayout;