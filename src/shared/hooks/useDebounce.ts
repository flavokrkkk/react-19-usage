// eslint-disable-next-line
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  timeout = 300
) => {
  let timer = 0;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), timeout);
  };
};
