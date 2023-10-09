
export const clientId = import.meta.env.VITE_UNSPLASHKEY;
import axios from "axios";

export default axios.create({
    baseURL: "https://api.unsplash.com/search",
    params: {
        client_id: clientId
    }})