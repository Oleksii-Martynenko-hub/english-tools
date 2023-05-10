import axios from "axios";
import { IResponse } from "@/@types/axios";
import { ITokens } from "@/api/main";

export default async (currentRefreshToken: string) => {
  try {
    const {
      data: { data },
    } = await axios.post<{ data: ITokens }>(
      `${process.env.API}/auth/refresh`,
      null,
      { headers: { Authorization: `Bearer ${currentRefreshToken}` } }
    );

    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};
