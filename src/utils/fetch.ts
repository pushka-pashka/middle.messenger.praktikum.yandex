/* eslint-disable */
const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};

const BASEURL = `${process.env.API_ENDPOINT}`;

function queryStringify(data: object) {
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

  private createURL(url:string): string {
    return `${this.baseURL}${url}`;
  }

  get = (url: string, options = {}) => {
    return this.request(
      this.createURL(url),
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  post = (url: string, options = {}) => {
    return this.request(
      this.createURL(url),
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  put = (url, options = {}) => {
    return this.request(
      this.createURL(url),
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  delete = (url, options = {}) => {
    return this.request(
      this.createURL(url),
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (url: string, options = {}, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    debugger
    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

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
