import { HttpResult } from "../stores/resultStore";

interface Props {
  apiUrl: string;
}

export const useGetRequest = async (props: Props): Promise<HttpResult> => {
  try {
    const result = await fetch(props.apiUrl, { method: "GET" });
    const json = await result.json();
    return {
      type: "ok_get",
      statusCode: 200,
      message: "todo items retrieved",
      items: json,
    };
  } catch {
    return {
      type: "bad_request",
      statusCode: 400,
      message: "error retrieving todo items",
    };
  }
};
