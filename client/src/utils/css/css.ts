export function classes(classes: Record<string, unknown>): string {
  return Object.entries(classes)
    .reduce<string[]>((result, [name, state]) => {
      if (state) result.push(name);
      return result;
    }, [])
    .join(" ");
}
