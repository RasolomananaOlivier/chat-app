import axios from "axios";
import { baseURL } from "../../Config/server";

export async function login(data) {

    const res = await axios.post(`${baseURL}/login`, data);
    return res.data;
}