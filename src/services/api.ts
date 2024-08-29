import axios from "axios";

export const domainApi = axios.create({
    baseURL: `http://localhost:3003/lia`,
    headers: {
        'Content-Type': 'application/json',
        // 'Requester': import.meta.env.VITE_API_API_KEY,
    }
});
