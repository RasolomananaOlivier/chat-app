export class Api {
    baseUrl;
    constructor() {
        if (process.env.NODE_ENV === 'development') {
            this.baseUrl = 'http://localhost:5000';
        } else {
            this.baseUrl = 'https://chat-app-express-server.herokuapp.com';
        }
    }

}

