/**
 * @packageDocumentation
 * @module api.functional.omg
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher, Primitive } from "@nestia/fetcher";
import type { IConnection } from "@nestia/fetcher";

import type { Try } from "./../../../controllers/AppController";

/**
 * @controller AppController.ThisFunctionHasTooLongReturnType()
 * @path GET /omg
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function ThisFunctionHasTooLongReturnType
    (
        connection: IConnection
    ): Promise<ThisFunctionHasTooLongReturnType.Output>
{
    return Fetcher.fetch
    (
        connection,
        ThisFunctionHasTooLongReturnType.ENCRYPTED,
        ThisFunctionHasTooLongReturnType.METHOD,
        ThisFunctionHasTooLongReturnType.path()
    );
}
export namespace ThisFunctionHasTooLongReturnType
{
    export type Output = Primitive<Try<true, { readonly result: false; readonly code: 4000; readonly data: "Error happens something1."; } | { readonly result: false; readonly code: 4000; readonly data: "Error happens something2."; } | { readonly result: false; readonly code: 4000; readonly data: "Error happens something3."; } | { readonly result: false; readonly code: 4000; readonly data: "Error happens something4."; } | { readonly result: false; readonly code: 4000; readonly data: "Error happens something5."; }>>;

    export const METHOD = "GET" as const;
    export const PATH: string = "/omg";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(): string
    {
        return `/omg`;
    }
}