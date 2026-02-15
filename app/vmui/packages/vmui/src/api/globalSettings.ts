import type { Locale } from "../i18n/I18nContext";

const API_URL = "/api/global-settings";

export interface ServerGlobalSettings {
  locale?: Locale;
  autocomplete?: boolean;
  stacked?: boolean;
  cumulative?: boolean;
  logLimit?: number;
}

type RawGlobalSettings = Record<string, unknown>;

const isObjectRecord = (value: unknown): value is RawGlobalSettings => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const normalizeGlobalSettings = (value: unknown): ServerGlobalSettings | null => {
  if (!isObjectRecord(value)) return null;

  const next: ServerGlobalSettings = {};

  if (value.locale === "en" || value.locale === "zh") next.locale = value.locale;
  if (typeof value.autocomplete === "boolean") next.autocomplete = value.autocomplete;
  if (typeof value.stacked === "boolean") next.stacked = value.stacked;
  if (typeof value.cumulative === "boolean") next.cumulative = value.cumulative;
  if (typeof value.logLimit === "number" && Number.isFinite(value.logLimit) && value.logLimit > 0) {
    next.logLimit = value.logLimit;
  }

  return next;
};

const fetchRawGlobalSettingsFromServer = async (): Promise<RawGlobalSettings | null> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) return null;
    const data = await response.json();
    if (!isObjectRecord(data)) return null;
    return data;
  } catch (e) {
    console.error("Failed to fetch global settings from server:", e);
    return null;
  }
};

export const fetchGlobalSettingsFromServer = async (): Promise<ServerGlobalSettings | null> => {
  const data = await fetchRawGlobalSettingsFromServer();
  return normalizeGlobalSettings(data);
};

export const saveGlobalSettingsToServer = async (settings: RawGlobalSettings): Promise<boolean> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    return response.ok;
  } catch (e) {
    console.error("Failed to save global settings to server:", e);
    return false;
  }
};

let patchQueue = Promise.resolve();

export const patchGlobalSettingsOnServer = async (patch: ServerGlobalSettings): Promise<boolean> => {
  let result = false;

  patchQueue = patchQueue
    .catch(() => undefined)
    .then(async () => {
      const current = await fetchRawGlobalSettingsFromServer();
      const merged: RawGlobalSettings = { ...(current || {}), ...patch };
      result = await saveGlobalSettingsToServer(merged);
    });

  await patchQueue;
  return result;
};

// Backward-compatible aliases used by local extensions.
export const fetchGlobalSettings = fetchGlobalSettingsFromServer;
export const saveGlobalSettings = patchGlobalSettingsOnServer;
