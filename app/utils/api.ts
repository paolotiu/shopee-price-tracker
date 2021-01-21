import axios from "axios";
const BASE_URL = "http://localhost:3001";

interface IUser {
  email: string;
  items: string[];
}

type Item = {
  item: {
    name: string;
    description: string;
  };
};

export type Items = Item[];

export const login = async (
  email: string,
  password: string
): Promise<IUser> => {
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
  return res.data;
};

export const signUp = async (email: string, password: string) => {
  const res = await axios.post(BASE_URL + "/auth/sign-up", {
    email,
    password,
    callbackUrl:
      process.env.CLIENT_URL || "http://localhost:3000/confirmation/",
  });

  return res.data;
};

export const confirmEmail = async (token: string) => {
  const res = await axios.get(BASE_URL + "/auth/confirmation/" + token);

  console.log(res.data);
  return res.data;
};

export const logOut = async () => {
  const res = await axios.get(BASE_URL + "/auth/logout", {
    withCredentials: true,
  });

  return res.data;
};

export const getUserItems = async (cookie?: string): Promise<Items> => {
  const res = await axios.get(BASE_URL + "/user/items", {
    withCredentials: true,
    headers: {
      cookie: cookie || null,
    },
  });
  return res.data;
};

export const getUser = async (cookie?: string): Promise<IUser> => {
  const res = await axios.get(BASE_URL + "/user", {
    withCredentials: true,
    headers: {
      cookie: cookie || null,
    },
  });
  return res.data;
};
