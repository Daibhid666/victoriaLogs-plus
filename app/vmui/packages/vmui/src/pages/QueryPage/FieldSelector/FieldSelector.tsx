import { FC, useCallback, useEffect, useMemo, useState } from "preact/compat";
import { useFetchQueryFieldNames } from "../hooks/useFetchQueryFieldNames";
import { useFetchQueryFieldValues } from "../hooks/useFetchQueryFieldValues";
import {
  StarIcon,
  StarBorderIcon,
  ArrowDropDownIcon,
  PlusIcon,
  CloseIcon,
  SpinnerIcon,
  ListIcon,
} from "../../../components/Main/Icons";
import {
  FieldSelectorSettings,
  fetchFieldSelectorSettings,
  saveFieldSelectorSettings,
} from "../../../api/fieldSelectorSettings";
import { ExtraFilter, ExtraFilterOperator } from "../../OverviewPage/FiltersBar/types";
import { filterToExpr } from "../../OverviewPage/hooks/useExtraFilters";
import { TimeParams } from "../../../types";
import TextField from "../../../components/Main/TextField/TextField";
import Button from "../../../components/Main/Button/Button";
import Tooltip from "../../../components/Main/Tooltip/Tooltip";
import classNames from "classnames";
import useI18n from "../../../i18n/useI18n";
import "../../OverviewPage/FiltersBar/style.scss";
import "./style.scss";

/** Parse field:="value" patterns from query string */
const parseQueryFilters = (query: string): { field: string; value: string }[] => {
  const regex = /([a-zA-Z_@][a-zA-Z0-9_@.]*):="([^"]*)"/g;
  const filters: { field: string; value: string }[] = [];
  const seen = new Set<string>();
  let match;
  while ((match = regex.exec(query)) !== null) {
    const key = `${match[1]}=${match[2]}`;
    if (!seen.has(key)) {
      seen.add(key);
      filters.push({ field: match[1], value: match[2] });
    }
  }
  return filters;
};

interface Props {
  query: string;
  period: TimeParams;
  onApplyFilter: (filter: ExtraFilter) => void;
  onRemoveFilter: (filter: ExtraFilter) => void;
}

const FieldSelector: FC<Props> = ({ query, period, onApplyFilter, onRemoveFilter }) => {
  const { t } = useI18n();
  const { fieldNames, loading: fieldsLoading, fetchFieldNames } = useFetchQueryFieldNames();
  const { fieldValues, loading: valuesLoading, fetchFieldValues, clear: clearValues } = useFetchQueryFieldValues();

  const [collapsed, setCollapsed] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedField, setExpandedField] = useState<string | null>("appName");
  const [pinnedFields, setPinnedFields] = useState<string[]>([]);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  // Derive active filters from the query string
  const activeFilters = useMemo(() => parseQueryFilters(query), [query]);

  // Load pinned fields from server on mount
  useEffect(() => {
    fetchFieldSelectorSettings().then((s: FieldSelectorSettings) => {
      setPinnedFields(s.pinnedFields);
      setSettingsLoaded(true);
    });
  }, []);

  // Persist pinned fields to server whenever they change
  useEffect(() => {
    if (!settingsLoaded) return;
    saveFieldSelectorSettings({ pinnedFields, savedFilters: [] });
  }, [pinnedFields, settingsLoaded]);

  // Fetch field names when period changes
  useEffect(() => {
    if (!period.start || !period.end) return;
    fetchFieldNames({ start: period.start, end: period.end, query: "*" });
  }, [period.start, period.end]);

  // Fetch values when a field is expanded
  useEffect(() => {
    if (!expandedField) {
      clearValues();
      return;
    }
    fetchFieldValues({
      start: period.start,
      end: period.end,
      field: expandedField,
      query: "*",
      limit: 10,
    });
  }, [expandedField, period.start, period.end]);

  const togglePin = useCallback((fieldName: string, e: Event) => {
    e.stopPropagation();
    setPinnedFields(prev => {
      if (prev.includes(fieldName)) {
        return prev.filter(f => f !== fieldName);
      }
      return [...prev, fieldName];
    });
  }, []);

  const toggleExpand = useCallback((fieldName: string) => {
    setExpandedField(prev => prev === fieldName ? null : fieldName);
  }, []);

  const handleAddFilter = useCallback((field: string, value: string) => {
    const filter: ExtraFilter = {
      field,
      operator: ExtraFilterOperator.Equals,
      value,
    };
    // Check if filter already exists in the query string
    const expr = filterToExpr(filter);
    if (query.includes(expr)) return;
    onApplyFilter(filter);
  }, [onApplyFilter, query]);

  const handleRemoveFilter = useCallback((filter: { field: string; value: string }) => {
    onRemoveFilter({
      field: filter.field,
      operator: ExtraFilterOperator.Equals,
      value: filter.value,
    });
  }, [onRemoveFilter]);

  // Sort fields: pinned first, then alphabetical
  const sortedFields = useMemo(() => {
    const filtered = fieldNames.filter(f =>
      !search || f.value.toLowerCase().includes(search.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      const aPinned = pinnedFields.includes(a.value);
      const bPinned = pinnedFields.includes(b.value);
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      return a.value.localeCompare(b.value);
    });
  }, [fieldNames, search, pinnedFields]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (collapsed) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".vm-field-selector")) return;
      setCollapsed(true);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [collapsed]);

  return (
    <div className="vm-field-selector">
      {/* Toggle button */}
      <Tooltip title={collapsed ? t("fieldSelector.showSelector") : t("fieldSelector.hideSelector")}>
        <div
          className={classNames({
            "vm-field-selector-toggle": true,
            "vm-field-selector-toggle_active": !collapsed,
          })}
          onClick={() => setCollapsed(prev => !prev)}
        >
          <ListIcon />
        </div>
      </Tooltip>

      {/* Dropdown panel */}
      {!collapsed && (
        <div className="vm-field-selector-dropdown">
          <div className="vm-field-selector-header">
            <span className="vm-field-selector-header__title">{t("fieldSelector.fields")}</span>
            <span className="vm-field-selector-header__count">
              {fieldsLoading ? "..." : fieldNames.length}
            </span>
          </div>

          {/* Active filters derived from query */}
          {activeFilters.length > 0 && (
            <div className="vm-field-selector-saved">
              {activeFilters.map((filter) => (
                <div
                  key={`${filter.field}-${filter.value}`}
                  className="vm-filters-bar-item"
                >
                  {filter.field}={filter.value}
                  <div onClick={(e) => e.stopPropagation()}>
                    <Button
                      size="small"
                      color="gray"
                      variant="text"
                      startIcon={<CloseIcon/>}
                      onClick={() => handleRemoveFilter(filter)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Search */}
          <TextField
            label={t("fieldSelector.filterFields")}
            value={search}
            onChange={setSearch}
          />

          {/* Field list */}
          <div className="vm-field-selector-list">
        {sortedFields.map((field) => {
          const isPinned = pinnedFields.includes(field.value);
          const isExpanded = expandedField === field.value;

          return (
            <div key={field.value}>
              <div
                className={classNames({
                  "vm-field-selector-field-row": true,
                  "vm-field-selector-field-row_expanded": isExpanded,
                })}
                onClick={() => toggleExpand(field.value)}
              >
                <Tooltip title={isPinned ? t("fieldSelector.unpinField") : t("fieldSelector.pinToTop")}>
                  <div
                    className={classNames({
                      "vm-field-selector-field-row__pin": true,
                      "vm-field-selector-field-row__pin_active": isPinned,
                    })}
                    onClick={(e) => togglePin(field.value, e)}
                  >
                    {isPinned ? <StarIcon /> : <StarBorderIcon />}
                  </div>
                </Tooltip>
                <span className="vm-field-selector-field-row__name">{field.value}</span>
                <span className="vm-field-selector-field-row__hits">{field.hits}</span>
                <div
                  className={classNames({
                    "vm-field-selector-field-row__arrow": true,
                    "vm-field-selector-field-row__arrow_open": isExpanded,
                  })}
                >
                  <ArrowDropDownIcon />
                </div>
              </div>

              {isExpanded && (
                <div className="vm-field-selector-field-values">
                  {valuesLoading && (
                    <div className="vm-field-selector-field-values__loading">
                      <SpinnerIcon /> {t("common.loading")}
                    </div>
                  )}
                  {!valuesLoading && fieldValues.map((val) => (
                    <div
                      key={val.value}
                      className="vm-field-selector-field-value"
                      onClick={() => handleAddFilter(field.value, val.value)}
                      title={t("fieldSelector.addFilter", { field: field.value, value: val.value })}
                    >
                      <span className="vm-field-selector-field-value__text">{val.value}</span>
                      <span className="vm-field-selector-field-value__hits">{val.hits}</span>
                      <div className="vm-field-selector-field-value__add">
                        <PlusIcon />
                      </div>
                    </div>
                  ))}
                  {!valuesLoading && fieldValues.length === 0 && (
                    <div className="vm-field-selector-field-values__loading">{t("fieldSelector.noValues")}</div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {!fieldsLoading && sortedFields.length === 0 && (
          <div className="vm-field-selector-field-values__loading">
            {search ? t("fieldSelector.noMatchingFields") : t("fieldSelector.noFieldsAvailable")}
          </div>
        )}
      </div>
        </div>
      )}
    </div>
  );
};

export default FieldSelector;
