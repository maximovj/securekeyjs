import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PasswordByLength from '../pages/PasswordByLength';
import Layout from '../components/Layout';
import routes from './routes';

const MainRoutes = () => {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path={routes.Root} element={<Layout />} >
                    <Route path={routes.Root} element={<Home />} />
                    <Route path={routes.PasswordByLength} element={<PasswordByLength />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </>);
}

export default MainRoutes;