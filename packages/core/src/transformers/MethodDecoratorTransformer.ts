import path from "path";
import ts from "typescript";

import { INestiaTransformProject } from "../options/INestiaTransformProject";
import { TypedRouteProgrammer } from "../programmers/TypedRouteProgrammer";

export namespace MethodDecoratorTransformer {
    export function transform(
        project: INestiaTransformProject,
        type: ts.Type,
        decorator: ts.Decorator,
    ): ts.Decorator {
        if (!ts.isCallExpression(decorator.expression)) return decorator;

        // CHECK SIGNATURE
        const signature: ts.Signature | undefined =
            project.checker.getResolvedSignature(decorator.expression);
        if (!signature || !signature.declaration) return decorator;

        // CHECK TO BE TRANSFORMED
        const done: boolean = (() => {
            // CHECK FILENAME
            const location: string = path.resolve(
                signature.declaration.getSourceFile().fileName,
            );
            if (
                LIB_PATHS.every((str) => location.indexOf(str) === -1) &&
                SRC_PATHS.every((str) => location !== str)
            )
                return false;

            // CHECK DUPLICATE BOOSTER
            if (decorator.expression.arguments.length >= 2) return false;
            else if (decorator.expression.arguments.length === 1) {
                const last: ts.Expression =
                    decorator.expression.arguments[
                        decorator.expression.arguments.length - 1
                    ];
                const type: ts.Type = project.checker.getTypeAtLocation(last);
                if (isObject(project.checker, type)) return false;
            }
            return true;
        })();
        if (done === false) return decorator;

        // CHECK TYPE NODE
        const typeNode: ts.TypeNode | undefined =
            project.checker.typeToTypeNode(type, undefined, undefined);
        if (typeNode === undefined) return decorator;

        // DO TRANSFORM
        return ts.factory.createDecorator(
            ts.factory.updateCallExpression(
                decorator.expression,
                decorator.expression.expression,
                decorator.expression.typeArguments,
                [
                    ...decorator.expression.arguments,
                    TypedRouteProgrammer.generate(
                        project,
                        decorator.expression.expression,
                    )(type),
                ],
            ),
        );
    }

    function isObject(checker: ts.TypeChecker, type: ts.Type): boolean {
        return (
            (type.getFlags() & ts.TypeFlags.Object) !== 0 &&
            !(checker as any).isTupleType(type) &&
            !(checker as any).isArrayType(type) &&
            !(checker as any).isArrayLikeType(type)
        );
    }

    const CLASSES = ["EncryptedRoute", "TypedRoute"];
    const LIB_PATHS = CLASSES.map((cla) =>
        path.join(
            "node_modules",
            "@nestia",
            "core",
            "lib",
            "decorators",
            `${cla}.d.ts`,
        ),
    );
    const SRC_PATHS = CLASSES.map((cla) =>
        path.resolve(path.join(__dirname, "..", "decorators", `${cla}.ts`)),
    );
}
