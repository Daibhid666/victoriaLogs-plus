import { FC } from "preact/compat";
import Switch from "../../../Main/Switch/Switch";
import { getFromStorage, saveToStorage } from "../../../../utils/storage";
import { useLocalStorageBoolean } from "../../../../hooks/useLocalStorageBoolean";
import useI18n from "../../../../i18n/useI18n";

const key = "LOGS_OVERRIDE_TIME";
const defaultValue = true;

export const getOverrideValue = () => {
  const value = getFromStorage(key);
  if (!value) return defaultValue;
  return value === "true";
};

const QueryTimeOverride: FC = () => {
  const { t } = useI18n();
  const [overrideTime, setOverrideTime] = useLocalStorageBoolean(key, getOverrideValue);

  const handleUpdateValue = (value: boolean) => {
    setOverrideTime(value);
    saveToStorage(key, String(value));
  };

  return (
    <div>
      <div className="vm-server-configurator__title">
        {t("settings.queryTimeOverride")}
      </div>
      <Switch
        label={t("settings.overrideTimeLabel")}
        value={overrideTime}
        onChange={handleUpdateValue}
      />
    </div>
  );
};

export default QueryTimeOverride;
