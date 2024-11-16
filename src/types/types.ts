import { Request } from "express";

export type TRequestWithParams<P> = Request<P>;
export type TRequestWithBody<B> = Request<{}, {}, B>;
export type TRequestWithQuery<Q> = Request<{}, {}, {}, Q>;
export type TRequestWithParamsAndBody<P, B> = Request<P, {}, B>;
