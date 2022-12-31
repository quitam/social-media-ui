import * as request from '../utils/request';
import { endpoints } from '../utils/request';

export const addFriend = async (data) => {
    try {
        const res = await request.postRQ(
            endpoints['addFriend'] + '/' + data,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            },
        );
        return res;
    } catch (e) {}
};
export const getRelation = async (data) => {
    try {
        const res = await request.getRQ(endpoints['addFriend'] + '/' + data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return res;
    } catch (e) {}
};
export const deleteRelation = async (data) => {
    try {
        const res = await request.deleteRQ(endpoints['addFriend'] + '/' + data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        return res;
    } catch (e) {}
};
