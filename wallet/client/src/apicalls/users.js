const {axiosInstance} = require('.');

// Login USER

export const LoginUser = async(payload) => {
    try {
        const {data} = await axiosInstance.post('/api/users/login', payload);
        return data;
    } catch (error) {
        return error.reponse.data;
    }
};

//Register USER

export const RegisterUser = async(payload) => {
    try {
        const {data} = await axiosInstance.post('/api/users/register', payload);
        return data;
    } catch (error) {
        return error.reponse.data;
    }
};