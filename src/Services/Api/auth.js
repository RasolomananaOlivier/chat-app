import axios from "axios";
import { Api } from ".";

class AuthApi extends Api {
    async login(data) {
        const res = await axios.post(`${this.baseURL}/login`, data);
        return res.data;
    }
    async signup(data) {
        const res = await axios.post(`${this.baseURL}/signup`, data);
        return res.data;
    }

}

export const Auth = new AuthApi();