import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PasswordByLength from '../pages/PasswordByLength';
import PasswordByType from '../pages/PasswordByType';
import Layout from '../components/Layout';
import routes from './routes';

const MainRoutes = () => {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path={routes.Root} element={<Layout />} >
                    <Route path={routes.Root} element={<Home />} />
                    <Route path={routes.PasswordByLength} element={<PasswordByLength />} />
                    <Route path={routes.PasswordByType} element={<PasswordByType />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </>);
}

export default MainRoutes;