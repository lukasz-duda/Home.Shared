import { CommandResult } from "./command";
import { polishLocale } from "./locale";

const apiUrl = import.meta.env.VITE_API_URL;

export async function post({
  path,
  request,
}: PostRequest): Promise<CommandResult> {
  const requestUrl = `${apiUrl}${path}`;
  try {
    const httpResponse = await fetch(requestUrl, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!httpResponse.ok) {
      return await httpErrorResult(httpResponse);
    }

    return successResult();
  } catch (error: unknown) {
    return errorResult(error);
  }
}

export interface PostRequest {
  path: string;
  request: object;
}

const { error } = polishLocale;

async function httpErrorResult(httpResponse: Response): Promise<CommandResult> {
  if (httpResponse.status === 401) {
    const errorResult: CommandResult = {
      success: false,
      error: error.unauthorized,
    };
    return errorResult;
  }

  const contentType = httpResponse.headers.get("Content-Type");
  if (contentType && contentType.includes("application/problem+json")) {
    const response = await httpResponse.json();
    const errorResult: CommandResult = {
      success: false,
      error: response.title,
    };
    return errorResult;
  } else {
    const errorResult: CommandResult = {
      success: false,
      error: error.unexpected,
    };
    return errorResult;
  }
}

function successResult(): CommandResult {
  const result: CommandResult = {
    success: true,
  };
  return result;
}

function errorResult(error: unknown): CommandResult {
  const result: CommandResult = {
    success: false,
    error: String(error),
  };
  return result;
}
