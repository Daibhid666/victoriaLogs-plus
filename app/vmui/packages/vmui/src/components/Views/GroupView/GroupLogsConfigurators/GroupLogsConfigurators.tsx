import { FC, useCallback, useEffect, useMemo, useState } from "preact/compat";
import useBoolean from "../../../../hooks/useBoolean";
import { RestartIcon, SettingsIcon } from "../../../Main/Icons";
import Button from "../../../Main/Button/Button";
import Modal from "../../../Main/Modal/Modal";
import Tooltip from "../../../Main/Tooltip/Tooltip";
import { Logs } from "../../../../api/types";
import Select from "../../../Main/Select/Select";
import { useSearchParams } from "react-router-dom";
import "./style.scss";
import Switch from "../../../Main/Switch/Switch";
import TextField from "../../../Main/TextField/TextField";
import dayjs from "dayjs";
import Hyperlink from "../../../Main/Hyperlink/Hyperlink";
import {
  LOGS_DISPLAY_FIELDS,
  LOGS_GROUP_BY,
  LOGS_DATE_FORMAT,
  LOGS_URL_PARAMS,
  WITHOUT_GROUPING
} from "../../../../constants/logs";
import LogParsingSwitches from "../../../Configurators/LogsSettings/LogParsingSwitches";
import { useLocalStorageBoolean } from "../../../../hooks/useLocalStorageBoolean";
import useI18n from "../../../../i18n/useI18n";
import { useLogsDispatch, useLogsState } from "../../../../state/logsPanel/LogsStateContext";
import {
  fetchGroupSettingsFromServer,
  saveGroupSettingsToServer,
  ServerGroupSettings
} from "../../../../api/groupSettings";

const {
  GROUP_BY,
  NO_WRAP_LINES,
  COMPACT_GROUP_HEADER,
  DISPLAY_FIELDS,
  DATE_FORMAT
} = LOGS_URL_PARAMS;

interface Props {
  logs: Logs[];
}

const GroupLogsConfigurators: FC<Props> = ({ logs }) => {
  const { t } = useI18n();
  const { markdownParsing, ansiParsing } = useLogsState();
  const logsDispatch = useLogsDispatch();
  const title = t("group.title");
  const [searchParams, setSearchParams] = useSearchParams();

  const groupBy = searchParams.get(GROUP_BY) || LOGS_GROUP_BY;
  const noWrapLines = searchParams.get(NO_WRAP_LINES) === "true";
  const compactGroupHeader = searchParams.get(COMPACT_GROUP_HEADER) === "true";
  const displayFieldsString = searchParams.get(DISPLAY_FIELDS) || "";
  const displayFields = displayFieldsString ? displayFieldsString.split(",") : [LOGS_DISPLAY_FIELDS];

  const [dateFormat, setDateFormat] = useState(searchParams.get(DATE_FORMAT) || LOGS_DATE_FORMAT);
  const [errorFormat, setErrorFormat] = useState("");

  const [disabledHovers, handleSetDisabledHovers] = useLocalStorageBoolean("LOGS_DISABLED_HOVERS");

  const isGroupChanged = groupBy !== LOGS_GROUP_BY;
  const isDisplayFieldsChanged = displayFields.length !== 1 || displayFields[0] !== LOGS_DISPLAY_FIELDS;
  const isTimeChanged = dateFormat !== LOGS_DATE_FORMAT;
  const hasChanges = [
    isGroupChanged,
    isDisplayFieldsChanged,
    noWrapLines,
    compactGroupHeader,
    isTimeChanged
  ].some(Boolean);

  const logsKeys = useMemo(() => {
    const uniqueKeys = new Set(logs.map(l => Object.keys(l)).flat());
    return Array.from(uniqueKeys).sort((a, b) => a.localeCompare(b));
  }, [logs]);

  const {
    value: openModal,
    toggle: toggleOpen,
    setFalse: handleClose,
  } = useBoolean(false);

  const updateSearchParams = useCallback((updater: (next: URLSearchParams) => void) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      updater(next);
      return next;
    });
  }, [setSearchParams]);

  const handleSelectGroupBy = (key: string) => {
    updateSearchParams(next => {
      next.set(GROUP_BY, key);
    });
  };

  const handleSelectDisplayField = (value: string) => {
    const prev = displayFields;
    const newDisplayFields = prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value];
    updateSearchParams(next => {
      next.set(DISPLAY_FIELDS, newDisplayFields.join(","));
    });
  };

  const handleResetDisplayFields = () => {
    updateSearchParams(next => {
      next.delete(DISPLAY_FIELDS);
    });
  };

  const toggleWrapLines = () => {
    updateSearchParams(next => {
      next.set(NO_WRAP_LINES, String(!noWrapLines));
    });
  };

  const toggleCompactGroupHeader = () => {
    updateSearchParams(next => {
      next.set(COMPACT_GROUP_HEADER, String(!compactGroupHeader));
    });
  };

  const handleChangeDateFormat = (format: string) => {
    const date = new Date();
    if (!dayjs(date, format, true).isValid()) {
      setErrorFormat("Invalid date format");
    }
    setDateFormat(format);
  };

  const handleSaveAndClose = () => {
    updateSearchParams(next => {
      if (dateFormat === LOGS_DATE_FORMAT) {
        next.delete(DATE_FORMAT);
      } else {
        next.set(DATE_FORMAT, dateFormat);
      }
    });
    handleClose();
  };

  const [serverMsg, setServerMsg] = useState("");

  // Apply fetched settings to local state
  const applySettings = useCallback((settings: ServerGroupSettings) => {
    updateSearchParams(next => {
      if (settings.groupBy) next.set(GROUP_BY, settings.groupBy);
      if (settings.displayFields) next.set(DISPLAY_FIELDS, settings.displayFields);
      if (settings.noWrapLines !== undefined) next.set(NO_WRAP_LINES, String(settings.noWrapLines));
      if (settings.compactGroupHeader !== undefined) next.set(COMPACT_GROUP_HEADER, String(settings.compactGroupHeader));
      if (settings.dateFormat) {
        setDateFormat(settings.dateFormat);
        next.set(DATE_FORMAT, settings.dateFormat);
      }
    });
    if (settings.markdownParsing !== undefined) {
      logsDispatch({ type: "SET_MARKDOWN_PARSING", payload: settings.markdownParsing });
    }
    if (settings.ansiParsing !== undefined) {
      logsDispatch({ type: "SET_ANSI_PARSING", payload: settings.ansiParsing });
    }
    if (settings.disabledHovers !== undefined) {
      handleSetDisabledHovers(settings.disabledHovers);
    }
  }, [updateSearchParams, logsDispatch, handleSetDisabledHovers]);

  // Auto-load settings from server on component mount (page visit)
  useEffect(() => {
    (async () => {
      const settings = await fetchGroupSettingsFromServer();
      if (settings) applySettings(settings);
    })();
  }, []);

  const handleSaveToServer = useCallback(async () => {
    const settings: ServerGroupSettings = {
      groupBy,
      displayFields: displayFieldsString || LOGS_DISPLAY_FIELDS,
      noWrapLines,
      compactGroupHeader,
      dateFormat,
      markdownParsing,
      ansiParsing,
      disabledHovers,
    };
    const ok = await saveGroupSettingsToServer(settings);
    setServerMsg(ok ? t("group.savedSuccess") : "Error");
    setTimeout(() => setServerMsg(""), 3000);
  }, [groupBy, displayFieldsString, noWrapLines, compactGroupHeader, dateFormat, markdownParsing, ansiParsing, disabledHovers, t]);

  const handleLoadFromServer = useCallback(async () => {
    const settings = await fetchGroupSettingsFromServer();
    if (!settings) {
      setServerMsg("Error");
      setTimeout(() => setServerMsg(""), 3000);
      return;
    }
    applySettings(settings);
    setServerMsg(t("group.loadedSuccess"));
    setTimeout(() => setServerMsg(""), 3000);
  }, [applySettings, t]);

  const tooltipContent = () => {
    if (!hasChanges) return title;
    return (
      <div className="vm-group-logs-configurator__tooltip">
        <p>{title}</p>
        <hr />
        <ul>
          {isGroupChanged && <li>{t("group.groupedBy")} <code>{`"${groupBy}"`}</code></li>}
          {isDisplayFieldsChanged && <li>{t("group.displayFieldsCount")} {displayFields.length || 1}</li>}
          {noWrapLines && <li>{t("group.singleLineEnabled")}</li>}
          {compactGroupHeader && <li>{t("group.compactHeaderEnabled")}</li>}
          {isTimeChanged && <li>{t("group.dateFormatLabel")} <code>{dateFormat}</code></li>}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className="vm-group-logs-configurator-button">
        <Tooltip title={tooltipContent()}>
          <Button
            variant="text"
            startIcon={<SettingsIcon />}
            onClick={toggleOpen}
            ariaLabel={title}
          />
        </Tooltip>
        {hasChanges && <span className="vm-group-logs-configurator-button__marker" />}
      </div>
      {openModal && (
        <Modal
          title={title}
          onClose={handleSaveAndClose}
        >
          <div className="vm-group-logs-configurator">
            <div className="vm-group-logs-configurator-item">
              <Select
                value={groupBy}
                list={[WITHOUT_GROUPING, ...logsKeys]}
                label={t("group.groupByField")}
                placeholder={t("group.groupByField")}
                onChange={handleSelectGroupBy}
                searchable
              />
              <Tooltip title={t("group.resetGrouping")}>
                <Button
                  variant="text"
                  color="primary"
                  startIcon={<RestartIcon />}
                  onClick={() => handleSelectGroupBy(LOGS_GROUP_BY)}
                />
              </Tooltip>
              <span className="vm-group-logs-configurator-item__info">
                {t("group.selectGroupBy", { default: LOGS_GROUP_BY })}
              </span>
            </div>

            <div className="vm-group-logs-configurator-item">
              <Select
                value={displayFields}
                list={logsKeys}
                label={t("group.displayFields")}
                placeholder={t("group.displayFields")}
                onChange={handleSelectDisplayField}
                searchable
              />
              <Tooltip title={t("group.clearFields")}>
                <Button
                  variant="text"
                  color="primary"
                  startIcon={<RestartIcon />}
                  onClick={handleResetDisplayFields}
                />
              </Tooltip>
              <span className="vm-group-logs-configurator-item__info">
                {t("group.selectDisplayFields", { default: LOGS_DISPLAY_FIELDS })}
              </span>
            </div>

            <div className="vm-group-logs-configurator-item">
              <TextField
                autofocus
                label={t("group.dateFormat")}
                value={dateFormat}
                onChange={handleChangeDateFormat}
                error={errorFormat}
              />
              <Tooltip title={t("group.resetFormat")}>
                <Button
                  variant="text"
                  color="primary"
                  startIcon={<RestartIcon />}
                  onClick={() => setDateFormat(LOGS_DATE_FORMAT)}
                />
              </Tooltip>
              <span className="vm-group-logs-configurator-item__info vm-group-logs-configurator-item__info_input">
                {t("group.dateFormatInfo")} <Hyperlink
                  href="https://day.js.org/docs/en/display/format"
                >{t("group.dateFormatLink")}</Hyperlink>. <br />
                {t("group.currentDateFormat")} <code>{dayjs().format(dateFormat || LOGS_DATE_FORMAT)}</code>
              </span>
            </div>

            <LogParsingSwitches />

            <div className="vm-group-logs-configurator-item">
              <Switch
                value={noWrapLines}
                onChange={toggleWrapLines}
                label={t("group.singleLineMessage")}
              />
              <span className="vm-group-logs-configurator-item__info">
                {t("group.singleLineInfo")}
              </span>
            </div>

            <div className="vm-group-logs-configurator-item">
              <Switch
                value={compactGroupHeader}
                onChange={toggleCompactGroupHeader}
                label={t("group.compactGroupHeader")}
              />
              <span className="vm-group-logs-configurator-item__info">
                {t("group.compactGroupHeaderInfo")}
              </span>
            </div>

            <div className="vm-group-logs-configurator-item">
              <Switch
                value={disabledHovers}
                onChange={handleSetDisabledHovers}
                label={t("group.disableHoverEffects")}
              />
              <span className="vm-group-logs-configurator-item__info">
                {t("group.disableHoverInfo")}
              </span>
            </div>

            <div className="vm-group-logs-configurator-item">
              <div style={{ display: "flex", gap: "8px" }}>
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  onClick={handleSaveToServer}
                >
                  {t("group.saveToServer")}
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  onClick={handleLoadFromServer}
                >
                  {t("group.loadFromServer")}
                </Button>
              </div>
              {serverMsg && (
                <span className="vm-group-logs-configurator-item__info">
                  {serverMsg}
                </span>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default GroupLogsConfigurators;
