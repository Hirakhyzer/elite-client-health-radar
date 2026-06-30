import { cloneInitialState } from "./data";

export const STORAGE_KEY = "elite-client-health-radar-v1";

export function loadWorkspace() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    const fresh = cloneInitialState();
    if (!saved) return fresh;
    return {
      ...fresh,
      ...saved,
      clients: Array.isArray(saved.clients) ? saved.clients : fresh.clients,
      savedReports: Array.isArray(saved.savedReports) ? saved.savedReports : [],
    };
  } catch {
    return cloneInitialState();
  }
}

export function saveWorkspace(state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
