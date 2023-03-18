/* eslint-disable */
export enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
};

type Options = {
  data?: string | Indexed;
  method?: Methods;
  headers?: Indexed;
  timeout?: number;
};

type Response = {
  readonly status: number;
  readonly statusText: string;
  readonly responseType: XMLHttpRequestResponseType;
  readonly response: Indexed;
};

const BASEURL = `${process.env.API_ENDPOINT}`;

function normalizeResponse(error: Nullable<Error>, response?: Response) {
  if (error) {
    console.error(error);

    return { reason: "Responce error: " + error.name + " " + error.message};
  }

  return response;
};

function queryStringify(data: string | Indexed): string {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data);

  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

export default class HTTPTransport {
  public baseURL: string | undefined

  constructor(baseURL: string = BASEURL) {
    this.baseURL = baseURL;
  }

  private createURL(url: string): string {
    return `${this.baseURL}${url}`;
  }

  get = async (url: string) => {
    try {
      const res = await this.request(
        this.createURL(url),
        { method: Methods.GET }
      ) as Response;

      return normalizeResponse(null, res);
    } catch(error) {
      return normalizeResponse(error as Error);
    }
  };

  post = async (url: string, options?: Options) => {
    try {
      let res: Response;

      if(options) {
        res = await this.request(
          this.createURL(url),
          { ...options, method: Methods.POST },
          options.timeout
        ) as Response;
      } else {
        res = await this.request(
          this.createURL(url),
          { method: Methods.POST }
        ) as Response;
      }

      return normalizeResponse(null, res);
    } catch(error) {
      return normalizeResponse(error as Error);
    }
  };

  put = async (url: string, options: Options) => {
    try {
      const res = await this.request(
        this.createURL(url),
        { ...options, method: Methods.PUT },
        options.timeout
      ) as Response;

      return normalizeResponse(null, res);
    } catch(error) {
      return normalizeResponse(error as Error);
    }
  };

  delete = async (url: string, options?: Options) => {
    try {
      let res: Response;

      if(options) {
        res = await this.request(
          this.createURL(url),
          { ...options, method: Methods.DELETE },
          options.timeout
        ) as Response;;
      } else {
        res = await this.request(
          this.createURL(url),
          { method: Methods.DELETE }
        ) as Response;
      }

      return normalizeResponse(null, res);
    } catch(error) {
      return normalizeResponse(error as Error);
    }
  };

  request = (url: string, options: Options, timeout: number = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr: ResponseData = new XMLHttpRequest();
      const isGet = method === Methods.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      headers["Content-type"] = "application/json; charset=utf-8";

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      //CORS и куки
      xhr.withCredentials = true;
      xhr.responseType = 'json';

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
