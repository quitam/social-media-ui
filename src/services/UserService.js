/* eslint-disable no-empty */
import * as request from '../utils/request';
import { endpoints } from '../utils/request';

export const loginCustomer = async (data) => {
    try {
        const res = await request.postRQ(endpoints['customerLogin'], data);

        return res;
    } catch (e) {}
};
export const loginAdmin = async (data) => {
    try {
        const res = await request.postRQ(endpoints['adminLogin'], data);

        return res;
    } catch (e) {}
};
export const registerCustomer = async (data) => {
    try {
        const res = await request.postRQ(endpoints['customerRegister'], data);

        return res;
    } catch (e) {}
};
export const updateCustomer = async (data) => {
    try {
        const res = await request.putRQ(endpoints['customerUpdate'], data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        return res;
    } catch (e) {}
};
export const changeAvatar = async (data) => {
    try {
        const res = await request.postRQ(endpoints['changeAvatar'], data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        return res;
    } catch (e) {}
};
export const searchByName = async (data) => {
    try {
        const res = await request.getRQ(endpoints['searchByName'] + '/' + data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        return res;
    } catch (e) {}
};
export const userProfile = async (data) => {
    try {
        const res = await request.getRQ(endpoints['userProfile'] + '/' + data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        return res;
    } catch (e) {}
};

export const getUserListPost = async () => {
    try {
        const res = await request.getRQ(endpoints['getUserListPost'], {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        return res;
    } catch (e) {}
};

export const getCountFriend = async () => {
    try {
        const res = await request.getRQ(endpoints['getCountFriend'], {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        return res;
    } catch (e) {}
};

export const getListFriend = async (size) => {
    try {
        const res = await request.getRQ(endpoints['getListFriend'] + '/' + size, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        return res;
    } catch (e) {}
};
