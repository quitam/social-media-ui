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
