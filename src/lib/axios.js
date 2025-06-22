import axios from 'axios';

export const axiosInstance= axios.create({
    baseURL: "https://server-side-video-chat-meet.onrender.com/api",
    withCredentials: true,
});