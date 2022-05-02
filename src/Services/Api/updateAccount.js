import axios from "axios";
import { baseURL } from "../../Config/server";

export async function updateAccount(data) {
    const result = await axios.post(`${baseURL}/update-account`, data);
    return result.data;
}