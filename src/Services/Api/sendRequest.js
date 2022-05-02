import axios from "axios";
import { baseURL } from "../../Config/server";

/**
 * Send a request friend to the user having the _id
 */
export async function sendRequest(_id, details) {
    const data = {
        _id: _id,
        details: details
    }

    const res = await axios.post(`${baseURL}/send-request`, data);
    return res.data;
}