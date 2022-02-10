import axios, { AxiosRequestConfig } from "axios";
import Tokens from "@/utils/local-storage/tokens";
import HttpClient from "./http-client";
import refreshTokens from "./refresh-tokens";

export default abstract class HttpClientProtected extends HttpClient {
  protected constructor(baseURL: string) {
    super(baseURL);

    this.initializeRequestInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest);
    this.instance.interceptors.response.use(
      (data) => data,
      this.handleResponseError
    );
  };

  private handleRequest = (config: AxiosRequestConfig) => {
    const tokens = Tokens.getInstance();

    const accessToken = tokens.getAccessToken();

    const modifiedConfig = config;

    modifiedConfig.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  };

  private handleResponseError = async (e: any): Promise<any> => {
    const status = e.response ? e.response.status : null;
    const msg = e?.response?.data?.message;

    const tokens = Tokens.getInstance();
    const currentRefreshToken = tokens.getRefreshToken();

    if (
      status === 400 &&
      (msg === "Forbidden" ||
        msg === "Token was expired" ||
        msg === "Refresh token already used" ||
        msg === "User doesn't authorize!") &&
      currentRefreshToken
    ) {
      try {
        const { accessToken, refreshToken } = await refreshTokens(
          currentRefreshToken
        );

        tokens.setAccessToken(accessToken);
        tokens.setRefreshToken(refreshToken);

        e.config.headers.Authorization = `Bearer ${accessToken}`;

        const { data } = await axios.request(e.config);
        return data;
      } catch (_) {
        tokens.clear();

        return Promise.reject(e);
      }
    }

    return Promise.reject(e);
  };
}
