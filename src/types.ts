import { Request } from "express";

export type RequestsWithBody<T> = Request<{}, {}, T, {}> // uriParams resBody reqBody Query
export type RequestsWithQuery<T> = Request<{}, {}, {}, T>
export type RequestsWithParams<T> = Request<T, {}, {}, {}>
export type RequestsWithParamsAndBody<T, B> = Request<T, {}, B>