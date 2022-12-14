import * as request from '../utils/request';
import { endpoints } from '../utils/request';

export const loginCustomer = async (data) => {
    try {
        const res = await request.postRQ(endpoints['customerLogin'], data);

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
        //console.log(res);
        return res;
    } catch (e) {}
};
