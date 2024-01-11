const dictionaries = {
  en: () => import("./src/dictionaries/en.json").then((r) => r.default),
  sp: () => import("./src/dictionaries/sp.json").then((r) => r.default),
};

export const getDictionary = (lang) => {
  return dictionaries[lang]();
};
