import axios from "axios";
import { Api } from ".";

class UsersApi extends Api {
    async viewAll(userId) {
        const res = await axios.get(`${this.baseUrl}/all-user/${userId}`);
        return res.data;
    }

    async updateAccount(data) {
        const result = await axios.post(`${this.baseURL}/update-account`, data);
        return result.data;
    }

    async updatePassword(data) {
        const result = await axios.patch(`${this.baseURL}/password/${data.userId}`, { ...data });
        return result.data;
    }

}

export const Users = new UsersApi();