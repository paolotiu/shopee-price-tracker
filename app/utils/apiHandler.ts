import { AxiosError } from "axios";

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
    .catch((error: AxiosError) => {
      if (error.response) {
        // The client received an error ex. (4xx, 5xx)
        return {
          data: undefined,
          error: error.response?.data as ErrorMessage,
        };
      } else {
        // The client didn't receive a response ex. Network Error
        // OR an error outside axios happens
        return {
          data: undefined,
          error: {
            // The code could be anything you want
            // Just make sure it is understood that code is
            // meant for network errors
            code: 0,
            message: error.message,
          },
        };
      }
    });
};
