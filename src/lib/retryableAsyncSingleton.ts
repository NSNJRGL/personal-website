export const createRetryableAsyncSingleton = <T>() => {
  let activeKey = "";
  let activePromise: Promise<T> | null = null;

  return {
    load: (key: string, loader: () => Promise<T>) => {
      if (activePromise && activeKey === key) {
        return activePromise;
      }

      activeKey = key;

      const pendingPromise = loader();
      let wrappedPromise: Promise<T>;

      wrappedPromise = pendingPromise.catch((error) => {
        if (activePromise === wrappedPromise) {
          activePromise = null;
          activeKey = "";
        }

        throw error;
      });

      activePromise = wrappedPromise;
      return wrappedPromise;
    },
    clear: () => {
      activePromise = null;
      activeKey = "";
    },
  };
};
