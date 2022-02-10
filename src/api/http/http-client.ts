import axios, { AxiosInstance, AxiosResponse } from "axios";

export default abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  protected constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        // "x-api-key": process.env.X_API_KEY,
      },
    });

    this.initializeResponseInterceptor();
  }

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this.handleResponseSuccess);
  };

  private handleResponseSuccess = ({ data }: AxiosResponse) => data;
}
