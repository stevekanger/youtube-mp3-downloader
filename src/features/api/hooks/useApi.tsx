import { FetchOptions, ApiResponse, ApiServerResponse } from "../types";
import { useState } from "react";

export default function useApi() {
  const [isPending, setIsPending] = useState(false);

  async function apiFetch<TData, TBody = unknown>(
    route: string,
    options: FetchOptions<TBody> = {},
  ): Promise<ApiResponse<TData>> {
    const { method = "GET", body, headers = {}, params } = options;

    setIsPending(true);
    try {
      const res = await fetch(route, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const json: ApiServerResponse<TData> = await res.json();

      if (!res.ok) {
        return {
          ok: false,
          status: res.status,
          msg: json.msg,
          data: null,
        };
      }

      return {
        ok: true,
        status: res.status,
        msg: json.msg,
        data: json.data as TData,
      };
    } catch (err) {
      return {
        ok: false,
        status: 0,
        msg: (err as Error).message,
        data: null,
      };
    } finally {
      setIsPending(false);
    }
  }

  return {
    isPending,
    apiFetch,
  };
}
