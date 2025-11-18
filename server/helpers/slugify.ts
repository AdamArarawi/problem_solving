export function slugify(input: string) {
  return input
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s\_]+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
