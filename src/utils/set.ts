/**
 * set({ foo: 5 }, 'bar.baz', 10); // { foo: 5, bar: { baz: 10 } }
 * set(3, 'foo.bar', 'baz'); // 3
 */

import { merge } from "./merge";

function set(
  object: Indexed | unknown,
  path: string,
  value: unknown,
  rewrite?: boolean
): Indexed | unknown {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  const result = path.split(".").reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc
    }),
    value as any
  );

  return merge(object as Indexed, result, rewrite);
}

export default set;
