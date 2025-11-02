import { type RouteObject } from "react-router";
type WithPath<P extends string> = Omit<RouteObject, "path"> & { path: P };

export function nest<P extends string, C extends readonly WithPath<string>[]>(
  parent: WithPath<P>,
  children: C,
): {
  [K in keyof C]: C[K] extends WithPath<infer CP>
    ? WithPath<`${P}${CP}`>
    : never;
} {
  return children.map((child) => ({
    ...child,
    path: parent.path + child.path,
  })) as any;
}

const parent = { path: "/api" } as const;

const children = [{ path: "/users" }, { path: "/posts" }] as const;

const result = nest(parent, children);

// IntelliSense types:
console.log(result[0].path); // "/api/users"
console.log(result[0].id); // 1

console.log(result[1].path); // "/api/posts"
console.log(result[1].id); // 2
