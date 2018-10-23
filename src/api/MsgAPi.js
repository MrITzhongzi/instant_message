import axios from 'axios';

export const GetMsgList = async () => {
    const respData = await axios.get("/message");
    console.log(respData)
    return respData.data;
}

export const PostMsgApi = async (data) => {
    const respData = await axios.post('/Message', data);
    return respData.data;
}