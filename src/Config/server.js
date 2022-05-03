let base;
if (process.env.NODE_ENV === 'development') {
    base = 'http://localhost:5000';
} else {
    base = 'https://chat-app-express-server.herokuapp.com';
}

export const baseURL = base;
