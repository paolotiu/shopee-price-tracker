import axios from "axios";
const BASE_URL = "http://localhost:3001";

export const login = async (email: string, password: string) => {
  const res = await axios.post(BASE_URL + "/user/login", {
    email,
    password,
  });
  console.log(res);
};
