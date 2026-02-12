import { FC, useRef } from "preact/compat";
import { useQueryDispatch, useQueryState } from "../../../state/query/QueryStateContext";
import "./style.scss";
import Switch from "../../Main/Switch/Switch";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import Popper from "../../Main/Popper/Popper";
import { TuneIcon } from "../../Main/Icons";
import Button from "../../Main/Button/Button";
import classNames from "classnames";
import useBoolean from "../../../hooks/useBoolean";
import Tooltip from "../../Main/Tooltip/Tooltip";
import { AUTOCOMPLETE_QUICK_KEY } from "../../Main/ShortcutKeys/constants/keyList";
import { useQuickAutocomplete } from "../../../hooks/useQuickAutocomplete";
import useI18n from "../../../i18n/useI18n";

const AdditionalSettingsControls: FC = () => {
  const { isMobile } = useDeviceDetect();
  const { autocomplete } = useQueryState();
  const queryDispatch = useQueryDispatch();
  const { t } = useI18n();
  useQuickAutocomplete();

  const onChangeAutocomplete = () => {
    queryDispatch({ type: "TOGGLE_AUTOCOMPLETE" });
  };

  return (
    <div
      className={classNames({
        "vm-additional-settings": true,
        "vm-additional-settings_mobile": isMobile
      })}
    >
      <Tooltip title={<>{t("editor.quickTip")} {AUTOCOMPLETE_QUICK_KEY}</>}>
        <Switch
          label={t("additionalSettings.autocomplete")}
          value={autocomplete}
          onChange={onChangeAutocomplete}
          fullWidth={isMobile}
        />
      </Tooltip>
    </div>
  );
};

const AdditionalSettings: FC = () => {
  const { isMobile } = useDeviceDetect();
  const { t } = useI18n();
  const targetRef = useRef<HTMLDivElement>(null);

  const {
    value: openList,
    toggle: handleToggleList,
    setFalse: handleCloseList,
  } = useBoolean(false);

  if (isMobile) {
    return (
      <>
        <div ref={targetRef}>
          <Button
            variant="outlined"
            startIcon={<TuneIcon/>}
            onClick={handleToggleList}
            ariaLabel="additional the query settings"
          />
        </div>
        <Popper
          open={openList}
          buttonRef={targetRef}
          placement="bottom-left"
          onClose={handleCloseList}
          title={t("additionalSettings.querySettings")}
        >
          <AdditionalSettingsControls/>
        </Popper>
      </>
    );
  }

  return <AdditionalSettingsControls/>;
};

export default AdditionalSettings;
