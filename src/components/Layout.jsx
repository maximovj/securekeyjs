import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="bg-gray-800 p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">

                    {/* Left-side Menu Items */}
                    <NavBar />

                    {/* Right-side Menu Items */}
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <small>v1.0Beta</small>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-6">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 p-4">
                <div className="container mx-auto text-center">
                    <p>© 2024 Víctor J. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Layout;
