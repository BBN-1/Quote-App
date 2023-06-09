import * as request from "./requester";

const baseUrl = `http://localhost:3030/users/`;

export const login = async (email, password) => {
    const req = await request.post(`${baseUrl}login`, { email, password });

    const res = await req;

    return res;
};

export const logout = async (accessToken) => {
    try {
        const req = await fetch(`${baseUrl}logout`, {
            headers: {
                "X-Authorization": accessToken,
            },
        });

        console.log(req);
        return req;
    } catch (error) {
        console.log(error);
    }
};

export const register = async (email, password, username) => {
    const req = await request.post(`${baseUrl}register`, { email, password,username });

    const res = await req

    return res;
};
