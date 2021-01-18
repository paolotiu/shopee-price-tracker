import axios from "axios";
const BASE_URL = "http://localhost:3001";

export const login = async (email: string, password: string) => {
  const res = await axios.post(
    BASE_URL + "/auth/login",
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
  console.log(res);
};

export const signUp = async (email: string, password: string) => {
  const res = await axios.post(BASE_URL + "/user/sign-up", {
    email,
    password,
    callbackUrl:
      process.env.CLIENT_URL || "http://localhost:3000/confirmation/",
  });

  return res.data;
};

export const confirmEmail = async (token: string) => {
  const res = await axios.get(BASE_URL + "/confirmation/" + token);

  console.log(res.data);
  return res.data;
};

export const logOut = async () => {
  const res = await axios.get(BASE_URL + "/auth/logout", {
    withCredentials: true,
  });

  return res.data;
};

export const getUser = async () => {
  const res = await axios.get(BASE_URL + "/user/items", {
    withCredentials: true,
  });
  console.log(res);
};
