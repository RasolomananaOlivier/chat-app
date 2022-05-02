import axios from "axios";
import { baseURL } from "../../Config/server";

export async function getAllMedias(userId) {
    const res = await axios.get(`${baseURL}/allMedias/${userId}`);
    return res.data;
}