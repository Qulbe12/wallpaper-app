import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://mainnet-idx.algonode.cloud/v2/",
    headers: {
        Accept: "application/json",
    },
});