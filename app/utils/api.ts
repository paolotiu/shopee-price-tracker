import axiosDefault from "./axiosConfig";
const CALLBACK_URL =
  process.env.NEXT_PUBLIC_CLIENT_URL + "/confirmation/" ||
  "https://localhost:3000/confirmation/";
interface IUser {
  email: string;
  items: string[];
}

export type Item = {
  item: {
    _id: string;
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
  const res = await axiosDefault.post("/auth/login", {
    email,
    password,
  });

  return res.data;
};

export const signUp = async (email: string, password: string) => {
  const res = await axiosDefault.post("/auth/sign-up", {
    email,
    password,
    callbackUrl: CALLBACK_URL,
  });

  return res.data;
};

export const confirmEmail = async (token: string) => {
  const res = await axiosDefault.get("/auth/confirmation/" + token);

  return res.data;
};

export const logOut = async () => {
  const res = await axiosDefault.get("/auth/logout");

  return res.data;
};

export const getUserItems = async (cookie?: string): Promise<Items> => {
  if (cookie) {
    const res = await axiosDefault.get("/user/items", {
      headers: { cookie },
    });

    return res.data;
  } else {
    const res = await axiosDefault.get("/user/items");
    return res.data;
  }
};

export const getOneUserItem = async (
  id: string,
  cookie?: string
): Promise<Item> => {
  if (cookie) {
    const res = await axiosDefault.get("/user/item/" + id, {
      headers: { cookie },
    });

    return res.data;
  } else {
    const res = await axiosDefault.get("/user/item/" + id);
    return res.data;
  }
};

export const getUser = async (cookie?: string): Promise<IUser> => {
  if (cookie) {
    const res = await axiosDefault.get("/user", {
      headers: { cookie },
    });

    return res.data;
  } else {
    const res = await axiosDefault.get("/user");
    return res.data;
  }
};

export const postItem = async (url: string): Promise<{ message: string }> => {
  const res = await axiosDefault.post("/item", {
    link: url,
  });

  return res.data;
};

export const resendConfirmationEmail = async (email: string) => {
  const res = await axiosDefault.post("/auth/resendEmail", {
    email,
    callbackUrl: CALLBACK_URL,
  });

  return res.data;
};

export const addPriceTarget = async (itemid: string, target: number) => {
  const res = await axiosDefault.post("/item/target", { itemid, target });
  return res.data;
};

export const deleteUserItem = async (itemid: string): Promise<Item> => {
  const res = await axiosDefault.delete("/user/item/" + itemid);
  return res.data;
};

export const getItem = async (id: string) => {
  const res = await axiosDefault.get("/item/" + id);
  return res.data;
};

export const sendForgetEmail = async (email: string) => {
  const res = await axiosDefault.post("/auth/recover", {
    email,
    callbackUrl: process.env.NEXT_PUBLIC_CLIENT_URL + "/reset/",
  });
  return res.data;
};
