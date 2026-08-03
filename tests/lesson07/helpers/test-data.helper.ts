import { IUserRegister } from "../types/user.interface";

export const generateUser = (): IUserRegister => {
    const uniqueId = Date.now();
    return {
        name: `User ${uniqueId}`,
        email: `user_${uniqueId}@gmail.com`,
        password: `${uniqueId}`,
        day: '10',
        month: '12',
        year: '1990',
    }
};