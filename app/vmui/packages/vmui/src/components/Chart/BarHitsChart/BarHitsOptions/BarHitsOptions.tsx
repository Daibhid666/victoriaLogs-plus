import { FC, useEffect, useMemo } from "preact/compat";
import { GraphOptions, GRAPH_STYLES, GRAPH_QUERY_MODE } from "../types";
import Switch from "../../../Main/Switch/Switch";
import "./style.scss";
import Button from "../../../Main/Button/Button";
import { MoreIcon, TipIcon, VisibilityIcon, VisibilityOffIcon } from "../../../Main/Icons";
import Tooltip from "../../../Main/Tooltip/Tooltip";
import ShortcutKeys from "../../../Main/ShortcutKeys/ShortcutKeys";
import { useCallback } from "react";
import useDeviceDetect from "../../../../hooks/useDeviceDetect";
import classNames from "classnames";
import Modal from "../../../Main/Modal/Modal";
import useBoolean from "../../../../hooks/useBoolean";
import { useNavigate, useSearchParams } from "react-router-dom";
import SelectLimit from "../../../Main/Pagination/SelectLimit/SelectLimit";
import { LOGS_BAR_COUNTS } from "../../../../constants/logs";
import { useHitsChartConfig } from "../../../../pages/QueryPage/HitsChart/hooks/useHitsChartConfig";
import { useExtraFilters } from "../../../../pages/OverviewPage/hooks/useExtraFilters";
import { useTimeState } from "../../../../state/time/TimeStateContext";
import { useFetchFieldNames } from "../../../../pages/OverviewPage/hooks/useFetchFieldNames";
import useI18n from "../../../../i18n/useI18n";
import { patchGlobalSettingsOnServer } from "../../../../api/globalSettings";

interface Props {
  query?: string;
  isHitsMode?: boolean;
  isOverview?: boolean;
  onChange: (options: GraphOptions) => void;
}

const BarHitsOptions: FC<Props> = ({ query, isHitsMode, isOverview, onChange }) => {
  const { isMobile } = useDeviceDetect();
  const { t } = useI18n();
  const {
    value: openList,
    toggle: handleToggleList,
    setFalse: handleCloseList,
  } = useBoolean(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { topHits, groupFieldHits, barsCount } = useHitsChartConfig();

  const { extraParams } = useExtraFilters();
  const { period: { start, end } } = useTimeState();
  const { fetchFieldNames, fieldNames, loading, error } = useFetchFieldNames();

  const queryMode = searchParams.get("graph_mode") === GRAPH_QUERY_MODE.stats
    ? GRAPH_QUERY_MODE.stats
    : GRAPH_QUERY_MODE.hits;
  const isStatsMode = queryMode === GRAPH_QUERY_MODE.stats;

  const stacked = searchParams.get("stacked") === "true";
  const cumulative = searchParams.get("cumulative") === "true";
  const hideChart = searchParams.get("hide_chart") === "true";

  const options: GraphOptions = useMemo(() => ({
    graphStyle: GRAPH_STYLES.BAR,
    queryMode,
    stacked,
    cumulative,
    fill: true,
    hideChart,
  }), [stacked, cumulative, hideChart, queryMode]);

  const fieldNamesOptions = useMemo(() => {
    return fieldNames.map(v => v.value).sort((a, b) => a.localeCompare(b));
  }, [fieldNames]);

  const handleOpenFields = useCallback(() => {
    fetchFieldNames({ start, end, extraParams, showAllFields: true, query });
  }, [start, end, extraParams.toString(), fetchFieldNames, query]);

  const handleChangeSearchParams = useCallback((key: string, shouldSet: boolean, paramValue?: string) => {
    const hash = window.location.hash || "";
    const questionIndex = hash.indexOf("?");
    const currentSearch = questionIndex >= 0 ? hash.slice(questionIndex) : "";
    const next = new URLSearchParams(currentSearch);
    shouldSet ? next.set(key, paramValue ?? String(shouldSet)) : next.delete(key);
    navigate(`?${next.toString()}`, { replace: true });
  }, [navigate]);

  const handleChangeMode = useCallback((val: boolean) => {
    const mode = val ? GRAPH_QUERY_MODE.stats : GRAPH_QUERY_MODE.hits;
    handleChangeSearchParams("graph_mode", val, mode);
  }, [handleChangeSearchParams]);

  const handleChangeStacked = useCallback((val: boolean) => {
    handleChangeSearchParams("stacked", val);
    void patchGlobalSettingsOnServer({ stacked: val });
  }, [handleChangeSearchParams]);

  const handleChangeCumulative = useCallback((val: boolean) => {
    handleChangeSearchParams("cumulative", val);
    void patchGlobalSettingsOnServer({ cumulative: val });
  }, [handleChangeSearchParams]);

  const toggleHideChart = useCallback(() => {
    handleChangeSearchParams("hide_chart", !hideChart);
  }, [hideChart, handleChangeSearchParams]);

  useEffect(() => {
    onChange(options);
  }, [options]);

  const Controls = () => (
    <>
      <div className="vm-bar-hits-options vm-bar-hits-options_selections">
        <div className="vm-bar-hits-options-item">
          <SelectLimit
            label={t("chart.topHits")}
            options={[5, 10, 25, 50]}
            limit={topHits.value}
            onChange={topHits.set}
          />
        </div>
        <div className="vm-bar-hits-options-item">
          <SelectLimit
            label={t("chart.bars")}
            options={LOGS_BAR_COUNTS}
            limit={barsCount.value}
            onChange={barsCount.set}
          />
        </div>
        {isHitsMode && (
          <>
            <div className="vm-bar-hits-options-item">
              <SelectLimit
                searchable
                label={t("chart.groupBy")}
                limit={groupFieldHits.value}
                options={fieldNamesOptions}
                textNoOptions={t("chart.noFieldsFound")}
                isLoading={loading}
                error={error ? String(error) : ""}
                onOpenSelect={handleOpenFields}
                onChange={groupFieldHits.set}
              />
            </div>
          </>
        )}
      </div>

      <div className="vm-bar-hits-options-item">
        <Switch
          label={t("chart.cumulative")}
          value={cumulative}
          onChange={handleChangeCumulative}
        />
      </div>
      {!isOverview && (
        <div className="vm-bar-hits-options-item">
          <Switch
            label={t("chart.statsView")}
            value={isStatsMode}
            onChange={handleChangeMode}
          />
        </div>
      )}
      <div className="vm-bar-hits-options-item">
        <Switch
          label={t("chart.stacked")}
          value={stacked}
          onChange={handleChangeStacked}
        />
      </div>
    </>
  );

  return (
    <div
      className={classNames({
      "vm-bar-hits-options": true,
      "vm-bar-hits-options_mobile": isMobile,
    })}
    >
      {!isMobile && (
        <>
          <Controls/>
          <ShortcutKeys withHotkey={false}>
            <Button
              variant="text"
              color="gray"
              startIcon={<TipIcon/>}
            />
          </ShortcutKeys>
        </>
      )}
      <Tooltip title={hideChart ? t("chart.showChart") : t("chart.hideChart")}>
        <Button
          variant="text"
          color="primary"
          startIcon={hideChart ? <VisibilityOffIcon/> : <VisibilityIcon/>}
          onClick={toggleHideChart}
          ariaLabel="settings"
        />
      </Tooltip>

      {isMobile && (
        <>
          <Button
            variant="text"
            color="primary"
            startIcon={<MoreIcon/>}
            onClick={handleToggleList}
            ariaLabel="settings"
          />
          <Modal
            title={t("chart.hitsOptions")}
            onClose={handleCloseList}
            isOpen={openList}
            className={classNames({
              "vm-header-controls-modal": true,
              "vm-header-controls-modal_open": openList,
            })}
          >
            <div className="vm-bar-hits-options vm-bar-hits-options_mobile">
              <Controls/>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default BarHitsOptions;
