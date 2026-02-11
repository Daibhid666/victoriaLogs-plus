import "./style.scss";
import { Theme } from "../../../types";
import Toggle from "../../Main/Toggle/Toggle";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import classNames from "classnames";
import { FC, useMemo } from "preact/compat";
import { useAppDispatch, useAppState } from "../../../state/common/StateContext";
import useI18n from "../../../i18n/useI18n";

const themeKeyMap: Record<Theme, string> = {
  [Theme.system]: "settings.themeSystem",
  [Theme.light]: "settings.themeLight",
  [Theme.dark]: "settings.themeDark",
};

const ThemeControl: FC = () => {
  const { isMobile } = useDeviceDetect();
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const { theme } = useAppState();

  const options = useMemo(() => Object.values(Theme).map(value => ({
    title: t(themeKeyMap[value] as any),
    value,
  })), [t]);

  const handleClickItem = (value: string) => {
    dispatch({ type: "SET_THEME", payload: value as Theme });
  };

  return (
    <div
      className={classNames({
        "vm-theme-control": true,
        "vm-theme-control_mobile": isMobile
      })}
    >
      <div className="vm-server-configurator__title">
        {t("settings.themePreferences")}
      </div>
      <div
        className="vm-theme-control__toggle"
        key={`${isMobile}`}
      >
        <Toggle
          options={options}
          value={theme}
          onChange={handleClickItem}
        />
      </div>
    </div>
  );
};

export default ThemeControl;
