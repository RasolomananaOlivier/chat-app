import axios from "axios";
import { Api } from ".";

class CommunicationApi extends Api {
    async request(_id, details) {
        const data = {
            _id: _id,
            details: details
        }

        const res = await axios.post(`${this.baseURL}/send-request`, data);
        return res.data;
    }


    async deleteNotification(userId, notificationId) {
        const { data } = await axios.delete(`${this.baseURL}/notification/delete`, {
            data: {
                userId, notificationId
            }
        })

        return data;
    }
}

export const Communication = new CommunicationApi();