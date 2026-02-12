import { FC, useEffect, useMemo } from "preact/compat";
import { useTimeState } from "../../../../state/time/TimeStateContext";
import { useExtraFilters } from "../../hooks/useExtraFilters";
import { LogsFiledValues } from "../../../../api/types";
import { useStreamFieldFilter } from "../../hooks/useFieldFilter";
import { useFetchStreamFieldNames } from "../../hooks/useFetchStreamNames";
import { getStreamFieldNamesCol } from "../columns";
import "../../OverviewTable/style.scss";
import OverviewTable from "../../OverviewTable/OverviewTable";
import { useOverviewState } from "../../../../state/overview/OverviewStateContext";
import { ExtraFilterOperator } from "../../FiltersBar/types";
import useCopyToClipboard from "../../../../hooks/useCopyToClipboard";
import { CopyIcon, FilterIcon, FilterOffIcon, FocusIcon, UnfocusIcon } from "../../../../components/Main/Icons";
import TopRowMenu from "../FieldRowMenu/TopRowMenu";
import { altKeyLabel, ctrlKeyLabel } from "../../../../utils/keyboard";
import useI18n from "../../../../i18n/useI18n";

const TopStreamNames: FC = () => {
  const { t } = useI18n();
  const { period: { start, end } } = useTimeState();
  const { fetchStreamFieldNames, streamFieldNames, loading, error } = useFetchStreamFieldNames();
  const { extraParams, addNewFilter } = useExtraFilters();
  const { streamFieldFilter, setStreamFieldFilter } = useStreamFieldFilter();
  const { totalLogs } = useOverviewState();
  const copyToClipboard = useCopyToClipboard();

  const rows = useMemo(() => {
    return streamFieldNames.map((r) => {
      const percent = totalLogs > 0 ? (r.hits / totalLogs) * 100 : 0;
      return { ...r, percent };
    });
  }, [streamFieldNames, totalLogs]);

  const isEmptyList = !loading && !error && streamFieldNames.length === 0;

  const handleAddExcludeFilter = (row: LogsFiledValues) => {
    addNewFilter({ field: row.value, value: "*", operator: ExtraFilterOperator.NotEquals });
  };

  const handleAddIncludeFilter = (row: LogsFiledValues) => {
    addNewFilter({ field: row.value, value: "*", operator: ExtraFilterOperator.Equals });
  };

  const selectField = (row: LogsFiledValues) => {
    setStreamFieldFilter(row.value);
  };

  const handleCopy = async (row: LogsFiledValues) => {
    const copyValue = row.value;
    await copyToClipboard(copyValue, t("common.valueCopied", { value: `\`${copyValue}\`` }));
  };

  const handleClickRow = (row: LogsFiledValues, e: MouseEvent) => {
    const { ctrlKey, metaKey, altKey } = e;
    const ctrlMetaKey = ctrlKey || metaKey;

    if (ctrlMetaKey) {
      handleAddExcludeFilter(row);
    } else if (altKey) {
      handleAddIncludeFilter(row);
    } else {
      selectField(row);
    }
  };

  const detectActiveRow = (row: LogsFiledValues) => {
    return row.value === streamFieldFilter;
  };

  useEffect(() => {
    fetchStreamFieldNames({ start, end, extraParams });
  }, [start, end, extraParams.toString(), fetchStreamFieldNames]);

  const TableAction = (row: LogsFiledValues) => {
    const menu = [
      [{
        label: streamFieldFilter === row.value ? t("overviewFields.unfocus") : t("overviewFields.focus"),
        icon: streamFieldFilter === row.value ? <UnfocusIcon/> : <FocusIcon/>,
        shortcut: "Click",
        onClick: () => selectField(row)
      }],
      [
        {
          label: t("overviewFields.include"),
          icon: <FilterIcon/>,
          shortcut: `${altKeyLabel} + Click`,
          onClick: () => handleAddIncludeFilter(row)
        },
        {
          label: t("overviewFields.exclude"),
          icon: <FilterOffIcon/>,
          shortcut: `${ctrlKeyLabel} + Click`,
          onClick: () => handleAddExcludeFilter(row)
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

  return (
    <OverviewTable
      enableSearch
      title={t("overviewFields.streamFieldNames")}
      rows={rows}
      columns={getStreamFieldNamesCol(t)}
      isLoading={loading}
      error={error}
      isEmptyList={isEmptyList}
      emptyListText={t("overviewFields.noFieldNamesFound")}
      onClickRow={handleClickRow}
      detectActiveRow={detectActiveRow}
      actionsRender={TableAction}
    />
  );
};

export default TopStreamNames;
