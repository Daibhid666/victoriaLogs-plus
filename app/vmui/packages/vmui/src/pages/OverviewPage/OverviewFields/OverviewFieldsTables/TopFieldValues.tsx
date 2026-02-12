import { FC, useEffect, useMemo } from "preact/compat";
import { useTimeState } from "../../../../state/time/TimeStateContext";
import { useExtraFilters } from "../../hooks/useExtraFilters";
import { useState } from "react";
import { useFieldFilter, useStreamFieldFilter } from "../../hooks/useFieldFilter";
import { useFetchLogs } from "../../../QueryPage/hooks/useFetchLogs";
import { LogsFiledValues } from "../../../../api/types";
import { ExtraFilterOperator } from "../../FiltersBar/types";
import { getFieldValuesCol, getStreamFieldValuesCol } from "../columns";
import OverviewTable from "../../OverviewTable/OverviewTable";
import "../../OverviewTable/style.scss";
import SelectLimit from "../../../../components/Main/Pagination/SelectLimit/SelectLimit";
import { buildFieldValuesQuery } from "./topFieldValuesUtils";
import { useOverviewState } from "../../../../state/overview/OverviewStateContext";
import useCopyToClipboard from "../../../../hooks/useCopyToClipboard";
import { CopyIcon, FilterIcon, FilterOffIcon, FocusIcon, UnfocusIcon } from "../../../../components/Main/Icons";
import TopRowMenu from "../FieldRowMenu/TopRowMenu";
import { altKeyLabel, ctrlKeyLabel } from "../../../../utils/keyboard";
import useI18n from "../../../../i18n/useI18n";

const MODE_KEYS = {
  top: {
    titleKey: "overviewFields.topN" as const,
    descKey: "overviewFields.topDescription" as const,
  },
  bottom: {
    titleKey: "overviewFields.bottomN" as const,
    descKey: "overviewFields.bottomDescription" as const,
  }
};

export type ValuesMode = keyof typeof MODE_KEYS; // "top" | "bottom"
const MODE_OPTIONS = Object.keys(MODE_KEYS) as ValuesMode[]; // ["top","bottom"]

type Props = {
  scope: "field" | "stream";
}

const TopFieldValues: FC<Props> = ({ scope }) => {
  const { t } = useI18n();
  const { period } = useTimeState();
  const { logs, isLoading, error, fetchLogs, abortController } = useFetchLogs();
  const { extraParams, addNewFilter } = useExtraFilters();
  const { fieldFilter, fieldValueFilters, toggleFieldValueFilter } = useFieldFilter();
  const { streamFieldFilter, streamFieldValueFilters, toggleStreamFieldValueFilter } = useStreamFieldFilter();
  const { totalLogs } = useOverviewState();
  const copyToClipboard = useCopyToClipboard();

  const selectedKey = scope === "field" ? fieldFilter : streamFieldFilter;
  const selectedValue = scope === "field" ? fieldValueFilters : streamFieldValueFilters;
  const setterFilter = scope === "field" ? toggleFieldValueFilter : toggleStreamFieldValueFilter;

  const [mode, setMode] = useState(MODE_OPTIONS[0]);
  const [limit, setLimit] = useState(10);

  const rows: LogsFiledValues[] = useMemo(() => {
    return logs.map(l => {
      const hits = Number(l.hits) || 0;
      return {
        hits,
        value: l[selectedKey],
        percent: totalLogs > 0 ? (hits / totalLogs) * 100 : 0
      };
    });
  }, [selectedKey, logs, totalLogs]);

  const isEmptyList = (!isLoading && !error && (rows.length === 0)) || !selectedKey;
  const emptyText = selectedKey ? t("overviewFields.noValuesFound") : t(scope === "field" ? "overviewFields.selectFieldName" : "overviewFields.selectStreamFieldName");

  const handleAddFilter = (row: LogsFiledValues, operator: ExtraFilterOperator) => {
    addNewFilter({ field: selectedKey, value: row.value, operator });
  };

  const selectFieldValue = (row: LogsFiledValues) => {
    setterFilter(row.value);
  };

  const handleCopy = async (row: LogsFiledValues) => {
    const copyValue = `${selectedKey}:${row.value}`;
    await copyToClipboard(copyValue, t("common.valueCopied", { value: `\`${copyValue}\`` }));
  };

  const handleClickRow = (row: LogsFiledValues, e: MouseEvent) => {
    const { ctrlKey, metaKey, altKey } = e;
    const ctrlMetaKey = ctrlKey || metaKey;

    if (ctrlMetaKey) {
      handleAddFilter(row, ExtraFilterOperator.NotEquals);
    } else if (altKey) {
      handleAddFilter(row, ExtraFilterOperator.Equals);
    } else {
      selectFieldValue(row);
    }
  };

  const detectActiveRow = (row: LogsFiledValues) => {
    return selectedValue.includes(row.value);
  };

  useEffect(() => {
    if (!selectedKey) return;
    const query = buildFieldValuesQuery(selectedKey, mode, limit);
    fetchLogs({ period, extraParams, limit, query });

    return () => abortController.abort();
  }, [period, extraParams.toString(), selectedKey, limit, mode]);

  const TableAction = (row: LogsFiledValues) => {
    const menu = [
      [{
        label: selectedValue.includes(row.value) ? t("overviewFields.unfocus") : t("overviewFields.focus"),
        icon: selectedValue.includes(row.value) ? <UnfocusIcon/> : <FocusIcon/>,
        shortcut: "Click",
        onClick: () => selectFieldValue(row)
      }],
      [
        {
          label: t("overviewFields.include"),
          icon: <FilterIcon/>,
          shortcut: `${altKeyLabel} + Click`,
          onClick: () => handleAddFilter(row, ExtraFilterOperator.Equals)
        },
        {
          label: t("overviewFields.exclude"),
          icon: <FilterOffIcon/>,
          shortcut: `${ctrlKeyLabel} + Click`,
          onClick: () => handleAddFilter(row, ExtraFilterOperator.NotEquals)
        }
      ],
      [{
        label: t("common.copy"),
        icon: <CopyIcon/>,
        onClick: () => handleCopy(row)
      }],
    ];
    return <TopRowMenu sections={menu}/>;
  };

  const TopFieldValuesHeaderControls = (
    <>
      <SelectLimit<ValuesMode>
        label={t("overviewFields.mode")}
        limit={mode}
        options={MODE_OPTIONS}
        onChange={(val) => setMode(val as ValuesMode)}
        renderOptionLabel={(v, isLabel) => (
          isLabel
            ? <span className="vm-top-fields-option__label">{t(MODE_KEYS[v].titleKey)}</span>
            : (
              <div className="vm-top-fields-option">
                <span className="vm-top-fields-option__label">{t(MODE_KEYS[v].titleKey)}</span>
                <span className="vm-top-fields-option__info">{t(MODE_KEYS[v].descKey)}</span>
              </div>
            )
        )}
      />
      <SelectLimit
        label={t(MODE_KEYS[mode].titleKey)}
        limit={limit}
        onChange={setLimit}
      />
    </>
  );

  return (
    <OverviewTable
      enableSearch
      title={<>{t("overviewFields.fieldValues")} <b>`{selectedKey}`</b></>}
      rows={rows}
      columns={scope === "field" ? getFieldValuesCol(t) : getStreamFieldValuesCol(t)}
      isLoading={isLoading}
      error={error}
      isEmptyList={isEmptyList}
      emptyListText={emptyText}
      onClickRow={handleClickRow}
      headerControls={TopFieldValuesHeaderControls}
      actionsRender={TableAction}
      detectActiveRow={detectActiveRow}
    />
  );
};

export default TopFieldValues;
