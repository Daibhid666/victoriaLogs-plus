import { FC } from "preact/compat";
import Switch from "../../Main/Switch/Switch";
import { useLogsDispatch, useLogsState } from "../../../state/logsPanel/LogsStateContext";
import useI18n from "../../../i18n/useI18n";

const LogParsingSwitches: FC = () => {
  const { markdownParsing, ansiParsing } = useLogsState();
  const dispatch = useLogsDispatch();
  const { t } = useI18n();

  const handleChangeMarkdownParsing = (val: boolean) => {
    dispatch({ type: "SET_MARKDOWN_PARSING", payload: val });

    if (ansiParsing) {
      dispatch({ type: "SET_ANSI_PARSING", payload: false });
    }
  };

  const handleChangeAnsiParsing = (val: boolean) => {
    dispatch({ type: "SET_ANSI_PARSING", payload: val });

    if (markdownParsing) {
      dispatch({ type: "SET_MARKDOWN_PARSING", payload: false });
    }
  };

  return (
    <>
      <div className="vm-group-logs-configurator-item">
        <Switch
          label={t("parsing.enableMarkdown")}
          value={markdownParsing}
          onChange={handleChangeMarkdownParsing}
        />
        <div className="vm-group-logs-configurator-item__info">
          {t("parsing.markdownInfo")}
        </div>
      </div>
      <div className="vm-group-logs-configurator-item">
        <Switch
          label={t("parsing.enableAnsi")}
          value={ansiParsing}
          onChange={handleChangeAnsiParsing}
        />
        <div className="vm-group-logs-configurator-item__info">
          {t("parsing.ansiInfo")}
        </div>
      </div>
    </>
  );
};

export default LogParsingSwitches;
