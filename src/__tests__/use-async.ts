// hook 测试
import { act, renderHook } from "@testing-library/react-hooks";
import { useAsync } from "utils/use-async";

type UseAsyncReturn = ReturnType<typeof useAsync>;

const defaultState: UseAsyncReturn = {
  stat: "idle",
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  run: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
  retry: expect.any(Function),
};

const loadingState: UseAsyncReturn = {
  ...defaultState,
  stat: "loading",
  isIdle: false,
  isLoading: true,
};

const successState: UseAsyncReturn = {
  ...defaultState,
  stat: "success",
  isIdle: false,
  isSuccess: true,
};

test("calling run with a promise which resolves", async () => {
  let resolve: any, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  const { result } = renderHook(() => useAsync());
  expect(result.current).toEqual(defaultState);
  let p: Promise<any>;
  act(() => {
    p = result.current.run(promise);
  });
  expect(result.current).toEqual(loadingState);
  const resolvedValue = Symbol("resolved value");
  await act(async () => {
    resolve(resolvedValue);
    await p;
  });
  expect(result.current).toEqual({
    ...successState,
    data: resolvedValue,
  });
});

export {};
