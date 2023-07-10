import axios from 'axios';

export let endpoints = {
    customerLogin: '/login/customer',
    customerRegister: '/user/create',
    customerUpdate: '/user/update-profile',
    changeAvatar: '/user/change-avatar',
    searchByName: '/user/search',
    userProfile: '/user',
    createPost: '/post',
    getListPost: '/post/user',
    createComment: '/comment',
    getUserListPost: '/post/user',
    repComment: '/comment/rep',
    addFriend: '/relationship',
    newFeed: '/post/new-feed/1',
    getNotify: '/notify/user',
    seenNotify: '/notify/seen',
    createNotify: '/notify',
    postReaction: '/post/reaction',
};
const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});
export const getRQ = async (path, options = []) => {
    const response = await request.get(path, options);
    return response.data;
};

export const postRQ = async (path, data, headers) => {
    const response = await request.post(path, data, headers);
    return response.data;
};
export const putRQ = async (path, data, headers) => {
    const response = await request.put(path, data, headers);
    return response.data;
};

export const deleteRQ = async (path, options = []) => {
    const response = await request.delete(path, options);
    return response.data;
};
export default request;
