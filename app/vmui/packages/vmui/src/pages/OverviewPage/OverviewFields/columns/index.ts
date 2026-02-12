import { Column } from "../../../../components/Table/Table";
import { LogsFiledValues } from "../../../../api/types";
import { getFieldCol, getHitsCol, getPercentCol } from "./utils";
import { I18nContextType } from "../../../../i18n/I18nContext";

export const getFieldNamesCol = (t: I18nContextType["t"]): Column<LogsFiledValues>[] => [
  getFieldCol(t("columns.fieldName")),
  getHitsCol(t),
  getPercentCol(t("columns.coverage")),
];

export const getFieldValuesCol = (t: I18nContextType["t"]): Column<LogsFiledValues>[] => [
  getFieldCol(t("columns.fieldValue")),
  getHitsCol(t),
  getPercentCol(t("columns.percentOfLogs")),
];

export const getStreamFieldNamesCol = (t: I18nContextType["t"]): Column<LogsFiledValues>[] => [
  getFieldCol(t("columns.streamFieldName")),
  getHitsCol(t),
  getPercentCol(t("columns.coverage")),
];

export const getStreamFieldValuesCol = (t: I18nContextType["t"]): Column<LogsFiledValues>[] => [
  getFieldCol(t("columns.streamFieldValue")),
  getHitsCol(t),
  getPercentCol(t("columns.percentOfLogs")),
];
