import { FC, useRef } from "preact/compat";
import classNames from "classnames";
import GlobalSettings, { GlobalSettingsHandle } from "../../components/Configurators/GlobalSettings/GlobalSettings";
import { ControlsProps } from "../Header/HeaderControls/HeaderControls";
import { TimeSelector } from "../../components/Configurators/TimeRangeSettings/TimeSelector/TimeSelector";
import Tenants from "../../components/Configurators/GlobalSettings/TenantsConfiguration/Tenants";
import { ExecutionControls } from "../../components/Configurators/TimeRangeSettings/ExecutionControls/ExecutionControls";
import ShortcutKeys from "../../components/Main/ShortcutKeys/ShortcutKeys";
import { getAppModeEnable } from "../../utils/app-mode";
import Button from "../../components/Main/Button/Button";
import { KeyboardIcon, LanguageIcon } from "../../components/Main/Icons";
import Tooltip from "../../components/Main/Tooltip/Tooltip";
import useI18n from "../../i18n/useI18n";
import type { Locale } from "../../i18n/I18nContext";

const ControlsLogsLayout: FC<ControlsProps> = ({ isMobile, headerSetup }) => {
  const appModeEnable = getAppModeEnable();
  const settingsRef = useRef<GlobalSettingsHandle>(null);
  const { locale, setLocale, t } = useI18n();

  const toggleLocale = () => {
    const next: Locale = locale === "en" ? "zh" : "en";
    setLocale(next);
  };

  return (
    <div
      className={classNames({
        "vm-header-controls": true,
        "vm-header-controls_mobile": isMobile,
      })}
    >

      {headerSetup?.tenant && <Tenants/>}
      {headerSetup?.timeSelector && <TimeSelector onOpenSettings={settingsRef?.current?.open}/>}
      {headerSetup?.executionControls &&  <ExecutionControls/>}
      <GlobalSettings ref={settingsRef}/>
      <Tooltip title={`${t("lang.switch")}: ${locale === "en" ? t("lang.zh") : t("lang.en")}`}>
        <Button
          className={appModeEnable ? "" : "vm-header-button"}
          variant="contained"
          color="primary"
          startIcon={<LanguageIcon/>}
          onClick={toggleLocale}
          ariaLabel="switch language"
        >
          {!isMobile && (locale === "en" ? "EN" : "中")}
        </Button>
      </Tooltip>
      {!isMobile && (
        <ShortcutKeys>
          <Button
            className={appModeEnable ? "" : "vm-header-button"}
            variant="contained"
            color="primary"
            startIcon={<KeyboardIcon/>}
          />
        </ShortcutKeys>
      )}
    </div>
  );
};

export default ControlsLogsLayout;
