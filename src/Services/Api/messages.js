import axios from "axios";
import { Api } from ".";

class MessagesApi extends Api {
    async getAll(userId) {
        const res = await axios.get(`${this.baseURL}/allMessage/${userId}`);
        return res.data;
    }

    async deleteOne({ messageId, itemId, userId }) {
        const res = await axios.delete(`${this.baseURL}/message/item/${messageId}/${userId}/${itemId}`);
        return res.data;
    }

    async deleteMany({ messageId, userId, mediaId }) {
        const res = await axios.delete(`${this.baseURL}/message/all/${messageId}/${userId}/${mediaId}`);
        return res.data;
    }

}

export const Messages = new MessagesApi();