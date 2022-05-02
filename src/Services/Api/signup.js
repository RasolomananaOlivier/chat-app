import axios from "axios";
import { baseURL } from "../../Config/server";

export async function signup(data) {

    const res = await axios.post(`${baseURL}/signup`, data);
    return res.data;
}