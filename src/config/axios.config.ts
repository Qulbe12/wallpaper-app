import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://mainnet-idx.algonode.cloud/v2/",
    headers: {
        Accept: "application/json",
    },
});

const headers = {
    Authorization: "EjTe1eaq1MqjeIwNDLfDWEDvJpdhuPLpmU7fJTI6NdMcQ3QM2KkatRLt",
    Accept: "application/json",
};

export const axiosForWallpapers = axios.create({
    baseURL: "https://api.pexels.com/v1",
    headers: headers,
})