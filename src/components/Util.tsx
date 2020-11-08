type JoinItem<T> = (index: number) => T

export function joinIndexed<T>(arr: JoinItem<T>[], separator: JoinItem<T>): T[] {
  const newArr: JoinItem<T>[] = [];
  arr.forEach((a, i) => {
    if (i !== 0) newArr.push(separator);
    newArr.push(a);
  });
  return newArr.map((a: JoinItem<T>, i: number) => a(i));
}

export default {};
