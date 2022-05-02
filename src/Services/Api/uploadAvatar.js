import axios from "axios";
import { baseURL } from "../../Config/server";

export async function upload(data) {

    const res = await axios.post(`${baseURL}/pic/upload`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
}
