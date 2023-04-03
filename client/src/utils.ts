export const uuid = (): string => {
  var i, random;
  var uuid = "";

  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += "-";
    }
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }

  return uuid;
};

export const pluralize = (count: number, word: string): string => {
  return count === 1 ? word : word + "s";
};

export const LocalStore = {
  getItem: (key: string) => {
    return localStorage.getItem(key);
  },

  setItem: (key: string, value: any) => {
    return localStorage.setItem(key, value);
  },

  removeItem: (key: string) => {
    return localStorage.removeItem(key);
  },

  getJson: (key: string) => {
    const value = LocalStore.getItem(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },

  setJson: (key: string, value: any) => {
    return LocalStore.setItem(key, JSON.stringify(value));
  },
};
