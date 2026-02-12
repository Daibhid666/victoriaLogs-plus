import { FC, ReactNode } from "preact/compat";
import useBoolean from "../../../hooks/useBoolean";
import OverviewTableHeader from "./OverviewTableHeader";
import OverviewTableBody, { OverviewTableProps } from "./OverviewTableBody";
import { useMemo, useState } from "react";
import TextField from "../../../components/Main/TextField/TextField";
import Tooltip from "../../../components/Main/Tooltip/Tooltip";
import { QuestionIcon } from "../../../components/Main/Icons";
import useI18n from "../../../i18n/useI18n";

interface Props extends OverviewTableProps {
  title: ReactNode | string;
  enableSearch?: boolean;
  headerControls?: ReactNode;
}

const OverviewTable: FC<Props> = ({
  title,
  rows,
  enableSearch,
  headerControls,
  ...props
}) => {
  const { t } = useI18n();
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { value: showSearch, toggle: handleToggleShowSearch } = useBoolean(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredRows = useMemo(() => {
    if (!searchValue) return rows;
    return rows.filter(({ value }) => value.includes(searchValue));
  }, [searchValue, rows]);

  return (
    <div className="vm-top-fields">
      <OverviewTableHeader
        title={title}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={setRowsPerPage}
        enableSearch={enableSearch}
        headerControls={headerControls}
        onToggleShowSearch={handleToggleShowSearch}
      />

      {showSearch && (
        <div className="vm-top-fields__search">
          <TextField
            autofocus
            label={t("overviewTable.search")}
            value={searchValue}
            onChange={setSearchValue}
            endIcon={(
              <Tooltip title={t("overviewTable.searchTooltip")}>
                <QuestionIcon/>
              </Tooltip>
            )}
          />
        </div>
      )}

      <OverviewTableBody
        {...props}
        rows={filteredRows}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};

export default OverviewTable;
