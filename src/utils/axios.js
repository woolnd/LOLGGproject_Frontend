import axios from "axios";

axios.defaults.withCredentials = true; //쿠키를 받기 위함
export const request = (method, url, data) => {
    return axios({
        method,
        url: url,
        data,
    })
        .then((res) => res)
        .catch((err)=>err);
};