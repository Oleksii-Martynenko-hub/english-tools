import axios from "axios";
import { IResponse, ITokens } from "../main";

export default async (currentRefreshToken: string) => {
  try {
    const {
      data: { data },
    } = await axios.post<{ data: IResponse<ITokens> }>(
      `${process.env.API}/auth/refresh`,
      null,
      { headers: { Authorization: `Bearer ${currentRefreshToken}` } }
    );

    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};
