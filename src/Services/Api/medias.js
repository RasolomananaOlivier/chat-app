import axios from "axios";
import { Api } from ".";

class MediasApi extends Api {
    async getAll(userId) {
        const res = await axios.get(`${this.baseURL}/allMedias/${userId}`);
        return res.data;
    }

    async upload(data) {
        const res = await axios.post(`${this.baseURL}/pic/upload`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    }
}

export const Medias = new MediasApi();