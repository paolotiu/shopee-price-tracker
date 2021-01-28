type ErrorMessage = {
  message: string;
  code: number;
};

type SuccessResponse<T> = {
  data: T;
  error: undefined;
};

type ErrorResponse = {
  data: undefined;
  error: ErrorMessage;
};
export const apiHandler = async <T>(
  promise: Promise<T>
): Promise<SuccessResponse<T> | ErrorResponse> => {
  return promise
    .then((data) => ({ data: data, error: undefined }))
    .catch((error) =>
      Promise.resolve({
        data: undefined,
        error: (error.response?.data as ErrorMessage) || error,
      })
    );
};
