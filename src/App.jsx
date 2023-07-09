import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { publicRoutes, privateRoutes, ScrollToTop } from './routes';
//import { updateUser } from './action/UserAction';

function App() {
    const token = useSelector((state) => state.user.token);
    console.log(token);
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route key={index} path={route.path} element={token ? <Navigate to="/" /> : <Page />}></Route>
                    );
                })}
                {privateRoutes.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={token ? <Page /> : <Navigate to="/login" />}
                        ></Route>
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
