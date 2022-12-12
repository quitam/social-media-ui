import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';

const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

//private Routes
const privateRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
];

export { publicRoutes, privateRoutes };
