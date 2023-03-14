/* eslint-disable */
enum Methods {
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

const BASEURL = `${process.env.API_ENDPOINT}`;

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

  get = (url: string) => {
    return this.request(
      this.createURL(url),
      { method: Methods.GET }
    );
  };

  post = (url: string, options?: Options) => {
    if(options) {
      return this.request(
        this.createURL(url),
        { ...options, method: Methods.POST },
        options.timeout
      );
    } else {
       return this.request(
        this.createURL(url),
        { method: Methods.POST }
      );
    }
  };

  put = (url: string, options: Options) => {
    return this.request(
      this.createURL(url),
      { ...options, method: Methods.PUT },
      options.timeout
    );
  };

  delete = (url: string, options: Options) => {
    return this.request(
      this.createURL(url),
      { ...options, method: Methods.DELETE },
      options.timeout
    );
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
