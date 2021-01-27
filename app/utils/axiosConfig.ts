import https from "https";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://localhost:3001";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  // To solve cert problem locally
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default instance;
