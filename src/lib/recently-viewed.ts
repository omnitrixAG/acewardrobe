const STORAGE_KEY = "ace-recently-viewed";
const MAX_ITEMS = 20;

export const getRecentlyViewed = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addRecentlyViewed = (productId: string) => {
  const ids = getRecentlyViewed().filter((id) => id !== productId);
  ids.unshift(productId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.slice(0, MAX_ITEMS)));
};

export const clearRecentlyViewed = () => {
  localStorage.removeItem(STORAGE_KEY);
};
