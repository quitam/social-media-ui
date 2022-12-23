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
