import routes from '../routes/routes.js';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (<nav>
        <Link to={routes.Root} className="hover:text-green-400 inline-block">
            <h1 className="text-2xl font-bold text-green-400  inline-block">SecureKeyJS</h1>
        </Link>
        <ul className="flex space-x-4">
            <li>
                <Link to={routes.PasswordByLength} className="hover:text-green-400">Por Longitud</Link>
            </li>
            <li>
                <Link to={routes.PasswordByType} className="hover:text-green-400">Por Tipo</Link>
            </li>
            <li>
                <Link to={routes.PasswordFromText} className="hover:text-green-400">Por Texto</Link>
            </li>
            <li>
                <Link to={routes.PasswordDevTool} className="hover:text-green-400">Para DevTools</Link>
            </li>
        </ul>
    </nav>);
}

export default NavBar;