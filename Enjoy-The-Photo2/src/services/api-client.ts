import axios from "axios";

const clientId = import.meta.env.VITE_UNSPLASHKEY;

export default axios.create({
  baseURL: "https://api.unsplash.com/search",
  params: {
    client_id: clientId,
  },
});
