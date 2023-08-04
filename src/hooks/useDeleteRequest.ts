import { HttpResult } from "../stores/resultStore";

interface Props {
  apiUrl: string;
  itemId: number;
}

export const useDeleteRequest = async (props: Props): Promise<HttpResult> => {
  try {
    const deleteItem = async () => {
      await fetch(props.apiUrl + "?itemId=" + props.itemId, {
        method: "DELETE",
      });
    };
    deleteItem();
    const okResult: HttpResult = {
      statusCode: 200,
      type: "ok_delete",
      message: "deleted",
    };
    return okResult;
  } catch {
    const badRequestResult: HttpResult = {
      statusCode: 400,
      type: "bad_request",
      message: "failed",
    };
    return badRequestResult;
  }
};
