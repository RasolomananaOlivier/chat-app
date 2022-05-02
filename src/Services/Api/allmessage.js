import axios from "axios";
import { baseURL } from "../../Config/server";

export async function getAllMessage(userId) {
    console.log('useri', userId);
    const res = await axios.get(`${baseURL}/allMessage/${userId}`);
    return res.data;
}