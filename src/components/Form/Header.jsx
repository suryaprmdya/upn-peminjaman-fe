export default function Header({ header, children }) {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
                {header}
                {children}
            </div> 
        </header>
    )
}