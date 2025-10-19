export function css(
  ...classes: (Record<string, unknown> | string | undefined)[]
): string | undefined {
  function* generator() {
    for (const name of classes) {
      if (typeof name === "object") {
        for (const [key, value] of Object.entries(name)) {
          console.log("class", key, value);
          if (value) {
            yield key;
          }
        }
      } else if (name) yield name;
    }
  }
  return [...generator()].join(" ") || undefined;
}
