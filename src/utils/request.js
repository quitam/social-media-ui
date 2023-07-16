import axios from 'axios';

export let endpoints = {
    customerLogin: '/login/customer',
    adminLogin: 'login/admin',
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
    newFeed: '/post/new-feed',
    getNotify: '/notify/user',
    seenNotify: '/notify/seen',
    createNotify: '/notify',
    postReaction: '/post/reaction',
    unReactionPost: '/post/un-reaction',
    getCommentByPostId: '/comment/post',
    getRepComment: '/comment/child-comment',
    getRecommendFriend: '/user/recomend-friend',
    getCountFriend: '/user/count-friend',
    getListFriend: '/user/list-friend',
    getAllUser: '/admin/all-user',
    getAllPost: '/admin/all-post',
    getAllComment: '/admin/all-comment',
    getStatistic: 'statistic/get-data',
    uploadFileChat: 'user/upload-file',
    checkImage: 'https://detect.roboflow.com/violence-detection-s9acq/1',
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
