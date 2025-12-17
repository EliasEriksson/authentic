import React from "react";

export function css(
  ...classes: (Record<string, unknown> | string | undefined)[]
): Pick<React.HTMLAttributes<any>, "className"> {
  function* generator() {
    for (const name of classes) {
      if (typeof name === "object") {
        for (const [key, value] of Object.entries(name)) if (value) yield key;
      } else if (name) yield name;
    }
  }
  const result = [...generator()].join(" ") || undefined;
  return !result ? {} : { className: result };
}
