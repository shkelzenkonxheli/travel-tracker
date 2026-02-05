const STORAGE_KEY = "travelTracker_v1";
const STATE_VERSION = 1;

export const DEFAULT_STATE = {
  version: STATE_VERSION,
  visited: [],
  wishlist: [],
  selectedContinent: "world",
  showList: false,
  statusMode: "visited",
  listTab: "visited",
};

const sanitizeList = (list) => {
  if (!Array.isArray(list)) return [];
  return Array.from(
    new Set(
      list
        .filter(Boolean)
        .map((code) => String(code).trim().toUpperCase())
        .filter(Boolean)
    )
  );
};

export const normalizeCountryName = (name) => {
  if (!name) return "";
  return String(name).trim().toLowerCase();
};

export const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { ...DEFAULT_STATE };

    return {
      ...DEFAULT_STATE,
      ...parsed,
      visited: sanitizeList(parsed.visited),
      wishlist: sanitizeList(parsed.wishlist),
      selectedContinent:
        typeof parsed.selectedContinent === "string"
          ? parsed.selectedContinent
          : DEFAULT_STATE.selectedContinent,
      showList: Boolean(parsed.showList),
      statusMode:
        parsed.statusMode === "wishlist" ? "wishlist" : DEFAULT_STATE.statusMode,
      listTab: parsed.listTab === "wishlist" ? "wishlist" : DEFAULT_STATE.listTab,
    };
  } catch (error) {
    console.warn("Failed to load state, resetting.", error);
    return { ...DEFAULT_STATE };
  }
};

export const saveState = (state) => {
  try {
    const payload = {
      ...DEFAULT_STATE,
      ...state,
      version: STATE_VERSION,
      visited: sanitizeList(state.visited),
      wishlist: sanitizeList(state.wishlist),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn("Failed to save state.", error);
  }
};

export const mergeState = (existing, incoming) => {
  const visited = sanitizeList([
    ...(existing?.visited || []),
    ...(incoming?.visited || []),
  ]);
  const wishlist = sanitizeList([
    ...(existing?.wishlist || []),
    ...(incoming?.wishlist || []),
  ]).filter((code) => !visited.includes(code));

  return {
    ...existing,
    ...incoming,
    visited,
    wishlist,
    selectedContinent:
      typeof incoming?.selectedContinent === "string"
        ? incoming.selectedContinent
        : existing.selectedContinent,
    showList:
      typeof incoming?.showList === "boolean"
        ? incoming.showList
        : existing.showList,
    statusMode:
      incoming?.statusMode === "wishlist" ? "wishlist" : existing.statusMode,
    listTab: incoming?.listTab === "wishlist" ? "wishlist" : existing.listTab,
  };
};

export const isValidImport = (payload) => {
  if (!payload || typeof payload !== "object") return false;
  const hasArrays =
    Array.isArray(payload.visited) || Array.isArray(payload.wishlist);
  return Boolean(hasArrays);
};
