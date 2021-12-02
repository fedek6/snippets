// eslint-disable-next-line import/prefer-default-export
export const urlParser = (pathname, keys = ["category", "slug"]) => {
  const parts = pathname.split("/").filter((el) => el !== null && el !== "");

  return Object.fromEntries(keys.map((_, i) => [keys[i], parts[i] ?? null]));
};
