/* eslint-disable no-empty */
import * as request from '../utils/request';
import { endpoints } from '../utils/request';

export const getStatistic = async () => {
    try {
        const res = await request.getRQ(endpoints['getStatistic'] + '/', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        return res;
    } catch (e) {}
};

export const getAllUser = async (page) => {
    try {
        const res = await request.getRQ(endpoints['getAllUser'] + '/' + page, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        return res;
    } catch (e) {}
};

export const getAllPost = async (page) => {
    try {
        const res = await request.getRQ(endpoints['getAllPost'] + '/' + page, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        return res;
    } catch (e) {}
};

export const getAllComment = async (page) => {
    try {
        const res = await request.getRQ(endpoints['getAllComment'] + '/' + page, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        return res;
    } catch (e) {}
};
