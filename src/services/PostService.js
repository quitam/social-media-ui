import * as request from '../utils/request';
import { endpoints } from '../utils/request';

export const createPost = async (data) => {
    try {
        const res = await request.postRQ(endpoints['createPost'], data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return res;
    } catch (e) {}
};
export const getListPost = async () => {
    try {
        const res = await request.getRQ(endpoints['getListPost'], {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return res;
    } catch (e) {}
};
export const getNewFeed = async () => {
    try {
        const res = await request.getRQ(endpoints['newFeed']);
        return res;
    } catch (e) {}
};
export const getListPostUser = async (data) => {
    try {
        const res = await request.getRQ(endpoints['getListPost'] + '/' + data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return res;
    } catch (e) {}
};

export const createComment = async (data) => {
    try {
        const res = await request.postRQ(endpoints['createComment'], data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return res;
    } catch (e) {}
};
export const hiddenPost = async (data) => {
    try {
        const res = await request.getRQ(endpoints['createPost'] + '/' + data + '/hidden', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return res;
    } catch (e) {}
};
export const hiddenComment = async (data) => {
    try {
        const res = await request.deleteRQ(endpoints['createComment'] + '/' + data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return res;
    } catch (e) {}
};
export const repComment = async (id, data) => {
    try {
        const res = await request.postRQ(endpoints['repComment'] + '/' + id, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return res;
    } catch (e) {}
};

export const postReaction = async (id, data) => {
    try {
        const res = await request.postRQ(endpoints['postReaction'] + '/' + id, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return res;
    } catch (e) {}
};
