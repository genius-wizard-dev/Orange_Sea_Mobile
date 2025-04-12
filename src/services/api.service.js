import instance from '../config/axios.config';

export const get = async (uri,token, params) => {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        // console.log('Headers:', headers.Authorization );

        const res = await instance.get(uri, { headers, params });
        return res;
    } catch (error) {
        throw error;
    }
};

export const getMeAxios = async (uri, token, customHeaders = {}) => {
    try {
        const headers = {
            ...customHeaders,
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        // console.log("Headers gửi đi:", headers);

        const res = await instance.get(uri, { headers });
        return res;
    } catch (error) {
        throw error;
    }
};


export const postLogin = async (uri, data, headers={}) => {
    try {
        
        const res = await instance.post(uri, data, { headers });
        return res;
    } catch (error) {
        throw error;
    }
};

export const post = async (uri, data, token) => {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const res = await instance.post(uri, data, { headers });
        return res;
    } catch (error) {
        throw error;
    }
};

export const put = async (uri, data, token) => {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const res = await instance.put(uri, data, { headers });
        return res;
    } catch (error) {
        throw error;
    }
};

export const del = async (uri, data, token) => {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const res = await instance.delete(uri, { headers, data });
        return res;
    } catch (error) {
        throw error;
    }
};

export const patch = async (uri, data, token) => {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const res = await instance.patch(uri, data, { headers });
        return res;
    } catch (error) {
        throw error;
    }
};

