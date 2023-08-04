import { ItemModel } from "../models/itemModel";

export interface OkGetResult {
  type: "ok_get";
  statusCode: 200;
  message: string;
  items: ItemModel[];
}

export interface OkDeleteResult {
  type: "ok_delete";
  statusCode: 200;
  message: string;
}

export interface OkAddResult {
  type: "ok_add";
  statusCode: 200;
  message: string;
  item: ItemModel;
}

export interface BadRequest {
  type: "bad_request";
  statusCode: 400;
  message: string;
}

export interface NotFound {
  type: "not_found";
  statusCode: 404;
  message: string;
}

export type HttpResult =
  | OkGetResult
  | OkDeleteResult
  | OkAddResult
  | BadRequest
  | NotFound;
