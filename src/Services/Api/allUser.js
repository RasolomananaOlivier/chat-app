import axios from "axios";
import { baseURL } from "../../Config/server";

export async function getAllUser(userId) {

    const res = await axios.get(`${baseURL}/all-user/${userId}`);
    return res.data;
}