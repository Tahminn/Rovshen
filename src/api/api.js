import axios from "axios";
import serverApi from "../store/services/api.json"

axios.interceptors.request.use(
    function (config){
        // const { origin } = new URL(config.url);
        // const allowedOrigins = [serverApi]
        if (response.config.parse) {
            const token = localStorage.getItem('accessToken');

            // if(allowedOrigins.includes(origin)){
            //     config.headers.authorization = token;
            // }
    
            config.headers.authorization = token;        }
        

        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);

axios.interceptors.response.use((response) => {
    if(response.status === 401) {
         alert("You are not authorized");
    }
    
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});


export const fetchPatientList = async({ pageParam = 1 }) => {
    const { data } = await axios.get(
        `${serverApi.serverName}/Patients?page=${pageParam}`,
        { parse: true}
    );
    return data;
}

export const fetchRegister = async(input) => {
    const { data } = await axios.post(
        `${serverApi.serverName}/api/Account/Register`,
        input
    );
    return data;
}

export const fetchLogin = async(input) => {
    const { data } = await axios.post(
        `${serverApi.serverName}/api/Account/Login`,
        input
    );
    return data;
}

export const fetchGetMe = async(username) => {
    const { data } = await axios.post(
        `${serverApi.serverName}/api/Account/GetMe`,
        username
    );
    return data;
}

export const fetchLogout = async() => {
    const { data } = await axios.post(
        `${serverApi.serverName}/api/Account/Logout`,
    );
    return data;
}

