import { FC, useCallback, useEffect, useState } from "preact/compat";
import TextField from "../../../Main/TextField/TextField";
import { getFromStorage, saveToStorage } from "../../../../utils/storage";
import { LOGS_DEFAULT_LIMIT, LOGS_MAX_LIMIT } from "../../../../constants/logs";
import useI18n from "../../../../i18n/useI18n";
import { fetchGlobalSettingsFromServer, patchGlobalSettingsOnServer } from "../../../../api/globalSettings";

const getStoredLimit = (): number => {
  const stored = Number(getFromStorage("LOGS_LIMIT"));
  return isNaN(stored) || stored <= 0 ? LOGS_DEFAULT_LIMIT : stored;
};

const LogsLimitSettings: FC = () => {
  const { t } = useI18n();
  const [value, setValue] = useState<number>(getStoredLimit);
  const [error, setError] = useState("");

  // Auto-load from server on mount
  useEffect(() => {
    (async () => {
      const settings = await fetchGlobalSettingsFromServer();
      if (settings?.logLimit && settings.logLimit > 0) {
        setValue(settings.logLimit);
        saveToStorage("LOGS_LIMIT", `${settings.logLimit}`);
      }
    })();
  }, []);

  const handleChange = useCallback((val: string) => {
    const num = +val;
    setValue(num);

    if (isNaN(num) || num <= 0) {
      setError(t("limit.mustBePositive"));
      return;
    }
    if (num > LOGS_MAX_LIMIT) {
      setError(t("limit.maxLimit", { max: LOGS_MAX_LIMIT.toLocaleString("en-US") }));
      return;
    }

    setError("");
    saveToStorage("LOGS_LIMIT", `${num}`);
    // Patch only logLimit to avoid overwriting other global settings.
    void patchGlobalSettingsOnServer({ logLimit: num });
  }, [t]);

  return (
    <div>
      <div className="vm-server-configurator__title">
        {t("settings.logLimit")}
      </div>
      <div className="vm-server-configurator__description">
        {t("settings.logLimitDescription")}
      </div>
      <TextField
        label={t("query.logLimits")}
        type="number"
        value={value}
        error={error}
        onChange={handleChange}
      />
    </div>
  );
};

export default LogsLimitSettings;
