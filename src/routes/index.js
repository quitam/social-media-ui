import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import UserProfile from '../pages/UserProfile';
import Message from '../pages/Message';

import Register from '../pages/Register';

//
const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

//private Routes
//Access when login
const privateRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/messages', component: Message },
    { path: '/:username', component: UserProfile },
];

export { publicRoutes, privateRoutes };
