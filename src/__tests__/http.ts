// 单元测试
import { setupServer } from "msw/node";
import { rest } from "msw";
import { http } from "utils/http";
import * as auth from "auth-provider";

const apiURL = process.env.REACT_APP_API_URL;

jest.mock("auth-provider");

// @ts-ignore
delete window.location;
// @ts-ignore
window.location = { reload: jest.fn() };

const server = setupServer();

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("http 方法发送请求", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "VALUE" };
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult));
    })
  );

  const result = await http(endpoint);

  expect(result).toEqual(mockResult);
});

test("请求时自动携带 token", async () => {
  const token = "FAKE_TOKEN";

  let request: any;
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "VALUE" };
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  await http(endpoint, { token });

  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});

test("automatically logs the user out if a request returns a 401", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "VALUE" };
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(401), ctx.json(mockResult));
    })
  );

  const error = await http(endpoint).catch((e) => e);

  expect(error.message).toMatchInlineSnapshot(`"请重新登录"`);

  expect(auth.logout).toHaveBeenCalledTimes(1);
});

test(`correctly rejects the promise if there's an error`, async () => {
  const testError = { message: "Test error" };
  const endpoint = "test-endpoint";
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(testError));
    })
  );

  const error = await http(endpoint).catch((e) => e);

  expect(error).toEqual(testError);
});

export {};
