import axios from "axios";
import { baseURL } from "../../Config/server";

export async function getAllMessage(userId) {
    const res = await axios.get(`${baseURL}/allMessage/${userId}`);
    return res.data;
}

export async function deleteHasCopy({ messageId, itemId, userId }) {
    const res = await axios.delete(`${baseURL}/message/item/${messageId}/${userId}/${itemId}`);
    return res.data;
}

export async function deleteWholeAccess({ messageId, userId, mediaId }) {
    const res = await axios.delete(`${baseURL}/message/all/${messageId}/${userId}/${mediaId}`);
    return res.data;
}