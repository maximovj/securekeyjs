const Container = ({ children }) => {
    return (<div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 text-white p-4">
        {children}
    </div>);
}

export default Container;