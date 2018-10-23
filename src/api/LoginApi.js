import axios from 'axios';

export const LoginApi = async (data) => {
    const respData = await axios.post("/login", data);
    return respData.data;
}