const API_URL = "/api/query-history";

export interface ServerQueryHistory {
  QUERY_HISTORY: string[][];
  QUERY_FAVORITES: string[][];
}

export const fetchQueryHistoryFromServer = async (): Promise<ServerQueryHistory | null> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) return null;
    const data = await response.json();
    if (!data) return null;
    return data as ServerQueryHistory;
  } catch (e) {
    console.error("Failed to fetch query history from server:", e);
    return null;
  }
};

export const saveQueryHistoryToServer = async (history: ServerQueryHistory): Promise<boolean> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(history),
    });
    return response.ok;
  } catch (e) {
    console.error("Failed to save query history to server:", e);
    return false;
  }
};

export const clearQueryHistoryOnServer = async (): Promise<boolean> => {
  try {
    const response = await fetch(API_URL, { method: "DELETE" });
    return response.ok;
  } catch (e) {
    console.error("Failed to clear query history on server:", e);
    return false;
  }
};
