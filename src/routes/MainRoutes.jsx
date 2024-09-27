import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import PasswordByLength from '../pages/PasswordByLength';
import PasswordByType from '../pages/PasswordByType';
import PasswordFromText from '../pages/PasswordFromText';
import PasswordDevTool from '../pages/PasswordDevTool';
import routes from './routes';

// Modulo de notificaciones 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const MainRoutes = () => {
    return (<>
        <BrowserRouter basename={routes.BaseName}>
            <ToastContainer />
            <Routes>
                <Route path={routes.Root} element={<Layout />} >
                    <Route path={routes.Root} element={<Home />} />
                    <Route path={routes.PasswordByLength} element={<PasswordByLength />} />
                    <Route path={routes.PasswordByType} element={<PasswordByType />} />
                    <Route path={routes.PasswordFromText} element={<PasswordFromText />} />
                    <Route path={routes.PasswordDevTool} element={<PasswordDevTool />} />
                    <Route path={'*'} element={<h1>Error 404. Página no encontrada.</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </>);
}

export default MainRoutes;