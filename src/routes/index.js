import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import UserProfile from '../pages/UserProfile';

import Register from '../pages/Register';

const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

//private Routes
const privateRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/:username', component: UserProfile },
];

export { publicRoutes, privateRoutes };
