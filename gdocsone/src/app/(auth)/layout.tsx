// This will now be visible in every folder under documents
// The layout does NOT rerender

interface authLayoutProps {
    children: React.ReactNode;
}

const authLayout = ({ children }: authLayoutProps) => {
    return (
        <div className="flex flex-col gap-y-4">
            <nav className="w-full bg-red-400">Auth Navbar</nav>
            {children}
        </div>
    )
}

export default authLayout;