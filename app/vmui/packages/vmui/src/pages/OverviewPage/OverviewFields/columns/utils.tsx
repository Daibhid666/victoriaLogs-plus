import { Column } from "../../../../components/Table/Table";
import { LogsFiledValues } from "../../../../api/types";

export const getFieldCol = (title: string): Column<LogsFiledValues> => ({
  title,
  className: "vm-top-fields__cell-name",
  key: "value" as keyof LogsFiledValues,
});

export const getHitsCol = (t?: (key: any) => string) => ({
  title: t ? t("columns.hits") : "Hits",
  isNum: true,
  className: "vm-top-fields__cell-value",
  key: "hits" as keyof LogsFiledValues,
  render: (n: LogsFiledValues) => Number(n.hits).toLocaleString("en-US")
});

export const getPercentCol = (title: string) => ({
  title,
  isNum: true,
  className: "vm-top-fields__cell-percent",
  key: "percent" as keyof LogsFiledValues,
  render: (n: LogsFiledValues) => {
    const p = n.percent ?? 0;
    const text = p.toFixed(2);
    return `${text}%`;
  },
});
