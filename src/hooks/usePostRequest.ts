import { ItemModel } from "../models/itemModel";
import { HttpResult } from "../stores/resultStore";

interface Props {
  apiUrl: string;
  item: ItemModel;
}

export const usePostRequest = async (props: Props) => {
  try {
    const postItem = async () => {
      const result = await fetch(props.apiUrl, {
        method: "POST",
        body: JSON.stringify(props.item),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const jsonResult = await result.json();
      return jsonResult as ItemModel;
    };
    const returnItem = await postItem();
    const success: HttpResult = {
      type: "ok_add",
      statusCode: 200,
      item: returnItem,
      message: "",
    };
    return success;
  } catch {
    const failure: HttpResult = {
      type: "bad_request",
      statusCode: 400,
      message: "",
    };
    return failure;
  }
};
