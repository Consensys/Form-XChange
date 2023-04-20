type ErrorWithMessage = {
  message: string;
};

/**
 * The function checks if an object is an instance of ErrorWithMessage by verifying if it has a string
 * message property.
 * @param {unknown} error - The `error` parameter is of type `unknown`, which means it can be any type
 * of value. The function is checking if this value is an `ErrorWithMessage` object.
 * @returns The function `isErrorWithMessage` is returning a boolean value. It checks if the `error`
 * parameter is an object that is not null, and has a `message` property that is a string. If all these
 * conditions are met, it returns `true`, indicating that the `error` parameter is of type
 * `ErrorWithMessage`. Otherwise, it returns `false`.
 */
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

/**
 * The function converts any input into an Error object with a message property, and provides a way to
 * retrieve the message from the error object.
 * @param {unknown} maybeError - an unknown value that may or may not be an instance of
 * ErrorWithMessage.
 * @returns There are two functions being defined here.
 */
export function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

/**
 * The function returns the error message of a given error object.
 * @param {unknown} error - The `error` parameter is of type `unknown`, which means it can be any type
 * of value. It is used as input to the `toErrorWithMessage` function, which is expected to return an
 * error object with a message property. The `getErrorMessage` function then extracts the message
 * property
 * @returns The function `getErrorMessage` is returning the error message from the `toErrorWithMessage`
 * function, which takes an unknown error as input and returns an error object with a message property.
 * The `message` property is then accessed and returned by the `getErrorMessage` function.
 */
export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}
