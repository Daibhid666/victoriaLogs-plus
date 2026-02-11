const API_URL = "/api/group-settings";

export interface ServerGroupSettings {
  groupBy?: string;
  displayFields?: string;
  noWrapLines?: boolean;
  compactGroupHeader?: boolean;
  dateFormat?: string;
  markdownParsing?: boolean;
  ansiParsing?: boolean;
  disabledHovers?: boolean;
}

export const fetchGroupSettingsFromServer = async (): Promise<ServerGroupSettings | null> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) return null;
    const data = await response.json();
    if (!data) return null;
    return data as ServerGroupSettings;
  } catch (e) {
    console.error("Failed to fetch group settings from server:", e);
    return null;
  }
};

export const saveGroupSettingsToServer = async (settings: ServerGroupSettings): Promise<boolean> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    return response.ok;
  } catch (e) {
    console.error("Failed to save group settings to server:", e);
    return false;
  }
};

export const resetGroupSettingsOnServer = async (): Promise<boolean> => {
  try {
    const response = await fetch(API_URL, { method: "DELETE" });
    return response.ok;
  } catch (e) {
    console.error("Failed to reset group settings on server:", e);
    return false;
  }
};
