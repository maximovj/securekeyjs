import routes from '../routes/routes.js';

const NavBar = () => {
    return (<nav>
        <h1 className="text-2xl font-bold text-green-400">SecureKeyJS</h1>
        <ul className="flex space-x-4">
            <li>
                <a href={routes.Root} className="hover:text-green-400">Inicio</a>
            </li>
            <li>
                <a href={routes.PasswordByLength} className="hover:text-green-400">Por Longitud</a>
            </li>
            <li>
                <a href={routes.PasswordByType} className="hover:text-green-400">Por Tipo</a>
            </li>
            <li>
                <a href={routes.PasswordFromText} className="hover:text-green-400">Por Texto</a>
            </li>
            <li>
                <a href={routes.PasswordDevTool} className="hover:text-green-400">Para DevTools</a>
            </li>
        </ul>
    </nav>);
}

export default NavBar;