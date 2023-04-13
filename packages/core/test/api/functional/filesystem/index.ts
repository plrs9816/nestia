/**
 * @packageDocumentation
 * @module api.functional.filesystem
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import { Fetcher, Primitive } from "@nestia/fetcher";
import type { IConnection } from "@nestia/fetcher";

import type { IFilesystemBucket } from "./../../structures/IFilesystemBucket";

/**
 * @controller FilesystemController.get()
 * @path GET /filesystem
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function get(
    connection: IConnection,
    query: get.Query,
): Promise<get.Output> {
    return Fetcher.fetch(
        connection,
        get.ENCRYPTED,
        get.METHOD,
        get.path(query),
    );
}
export namespace get {
    export type Output = Primitive<Array<IFilesystemBucket>>;
    export type Query = Primitive<IFilesystemBucket.IRequest>;

    export const METHOD = "GET" as const;
    export const PATH: string = "/filesystem";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(query: Query): string {
        const variables = {
            ...query,
        };
        const search = new URLSearchParams();
        for (const [key, value] of Object.entries(variables))
            if (value === undefined) continue;
            else if (Array.isArray(value))
                value.forEach((elem) => search.append(key, String(elem)));
            else search.set(key, String(value));
        const encoded: string = new URLSearchParams(search).toString();
        return `/filesystem${encoded.length ? `?${encoded}` : ""}`;
    }
}
