export const apiHandler = async <T>(promise: Promise<T>) => {
  return promise
    .then((data) => ({ data: data, error: undefined }))
    .catch((error) =>
      Promise.resolve({ data: undefined, error: error.response?.data || error })
    );
};
