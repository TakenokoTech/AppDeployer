/* eslint-disable no-restricted-globals */
type JoinItem<T> = (index: number) => T;

export function joinIndexed<T>(arr: JoinItem<T>[], separator: JoinItem<T>): T[] {
  const newArr: JoinItem<T>[] = [];
  arr.forEach((a, i) => {
    if (i !== 0) newArr.push(separator);
    newArr.push(a);
  });
  return newArr.map((a: JoinItem<T>, i: number) => a(i));
}

export function getParam(): any {
  try {
    let urlParamStr = window?.location?.search;
    if (!urlParamStr) {
      return {};
    }

    urlParamStr = urlParamStr.substring(1);
    let params = {};
    urlParamStr.split("&").forEach((param) => {
      const temp = param.split("=");
      params = {
        ...params,
        [temp[0]]: temp[1],
      };
    });
    return params;
  } catch (e) {
    return {};
  }
}

export const isBrowser = (() => {
  const b = typeof window !== "undefined";
  // console.log(`isBrowser: ${b}`);
  return b;
})();

export function deleteQuery(name: string): void {
  if (!isBrowser) return;
  const url = new URL(location.toString());
  // console.log(url.search);
  url.searchParams.delete(name);
  window.history.replaceState(null, null, location.pathname + url.search);
}

export default {};
