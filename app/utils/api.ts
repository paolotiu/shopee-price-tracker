import axios from "axios";
const BASE_URL = "http://localhost:3001";

interface IUser {
  email: string;
  items: string[];
}

type Item = {
  item: {
    name: string;
    itemID: string;
    shopID: string;
    price: number;
    api_url: string;
    description: string;
    all_prices: [{ price: number; time: Date }];
    onSale: boolean;
    avg_rating: number;
    lowest_price: number;
    total_rating_count: number;
    urls: string[];
    likes: number;
    views: number;
    normal_stock: number;
    discount_stock: number;
    stock: number;
    free_shipping: boolean;
    sold: number;
    historical_sold: number;
    discount: string;
  };
  target: number;
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
    { withCredentials: true }
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

  return res.data;
};

export const logOut = async () => {
  const res = await axios.get(BASE_URL + "/auth/logout", {
    withCredentials: true,
  });

  return res.data;
};

export const getUserItems = async (): Promise<Items> => {
  const res = await axios.get(BASE_URL + "/user/items", {
    withCredentials: true,
  });
  return res.data;
};

export const getOneUserItem = async (id: string): Promise<Item> => {
  const res = await axios.get(BASE_URL + "/user/item/" + id, {
    withCredentials: true,
  });

  return res.data;
};

export const getUser = async (cookie?: string): Promise<IUser> => {
  let options: { withCredentials: boolean; headers?: { cookie?: string } } = {
    withCredentials: true,
  };

  if (cookie) {
    options.headers = { cookie };
  }
  const res = await axios.get(BASE_URL + "/user", options);
  return res.data;
};

export const postItem = async (url: string) => {
  const res = await axios.post(
    BASE_URL + "/item",
    {
      link: url,
    },
    { withCredentials: true }
  );

  return res.data;
};

export const resendConfirmationEmail = async (email: string) => {
  const res = await axios.post(BASE_URL + "/auth/resendEmail", { email });

  return res.data;
};
