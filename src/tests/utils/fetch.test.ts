import sinon, { SinonFakeXMLHttpRequest } from "sinon";
import HTTPTransport, { Methods } from "utils/fetch";

describe("fetch", () => {
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    sinon.useFakeXMLHttpRequest().onCreate = (
      request: SinonFakeXMLHttpRequest
    ) => {
      requests.push(request);
    };
  });

  afterEach(() => {
    requests.length = 0;
  });

  it("should send GET request", () => {
    new HTTPTransport().get("/");

    const [request] = requests;

    expect(request.method).toEqual(Methods.GET);
  });

  it("should send POST request", () => {
    new HTTPTransport().post("/", {});

    const [request] = requests;

    expect(request.method).toEqual(Methods.POST);
  });

  it("should send PUT request", () => {
    new HTTPTransport().put("/", {});

    const [request] = requests;

    expect(request.method).toEqual(Methods.PUT);
  });

  it("should send DELETE request", () => {
    new HTTPTransport().delete("/");

    const [request] = requests;

    expect(request.method).toEqual(Methods.DELETE);
  });
});
