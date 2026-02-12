const API_URL = "/api/field-selector-settings";

export interface FieldSelectorSettings {
  pinnedFields: string[];
  savedFilters: SavedFieldFilter[];
}

export interface SavedFieldFilter {
  field: string;
  value: string;
}

const defaultSettings: FieldSelectorSettings = {
  pinnedFields: [],
  savedFilters: [],
};

export const fetchFieldSelectorSettings = async (): Promise<FieldSelectorSettings> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) return { ...defaultSettings };
    const data = await response.json();
    if (!data) return { ...defaultSettings };
    return {
      pinnedFields: data.pinnedFields || [],
      savedFilters: data.savedFilters || [],
    };
  } catch (e) {
    console.error("Failed to fetch field selector settings:", e);
    return { ...defaultSettings };
  }
};

export const saveFieldSelectorSettings = async (settings: FieldSelectorSettings): Promise<boolean> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    return response.ok;
  } catch (e) {
    console.error("Failed to save field selector settings:", e);
    return false;
  }
};
