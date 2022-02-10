import HttpClient from "./http/http-client";

export interface IResponse<T = undefined> {
  status: number;
  message: string;
  data: T;
}

export interface IAuthBody {
  email: string;
  password: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export default class MainApi extends HttpClient {
  private static classInstance?: MainApi;

  private constructor() {
    super(process.env.API);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new MainApi();
    }

    return this.classInstance;
  }

  public login = (body: IAuthBody) =>
    this.instance.post<IResponse<ITokens>>("/auth/login", body);

  public signup = (body: IAuthBody) =>
    this.instance.post<IResponse>("/auth/sign_up", body);
}
