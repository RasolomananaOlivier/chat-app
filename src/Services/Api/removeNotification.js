import axios from "axios";
import { baseURL } from "src/Config/server";

export async function removeNotificationFromTheServer(userId, notificationId) {
    const { data } = await axios.delete(`${baseURL}/notification/delete`, {
        data: {
            userId, notificationId
        }
    })

    return data;
}