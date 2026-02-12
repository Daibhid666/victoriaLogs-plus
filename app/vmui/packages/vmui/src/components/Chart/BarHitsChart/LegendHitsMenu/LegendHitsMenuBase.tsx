import { FC } from "preact/compat";
import LegendHitsMenuRow from "./LegendHitsMenuRow";
import useCopyToClipboard from "../../../../hooks/useCopyToClipboard";
import { CopyIcon, FilterIcon, FilterOffIcon } from "../../../Main/Icons";
import { LegendLogHits, LegendLogHitsMenu } from "../../../../api/types";
import { ExtraFilter, ExtraFilterOperator } from "../../../../pages/OverviewPage/FiltersBar/types";
import { useHitsChartConfig } from "../../../../pages/QueryPage/HitsChart/hooks/useHitsChartConfig";
import useI18n from "../../../../i18n/useI18n";

interface Props {
  legend: LegendLogHits;
  onApplyFilter: (value: ExtraFilter) => void;
  onClose: () => void;
}

const LegendHitsMenuBase: FC<Props> = ({ legend, onApplyFilter, onClose }) => {
  const { t } = useI18n();
  const copyToClipboard = useCopyToClipboard();
  const {
    groupFieldHits: { value: groupFieldHits },
  } = useHitsChartConfig();

  const handleAddStreamToFilter = (operator: ExtraFilterOperator) => () => {
    onApplyFilter({
      field: groupFieldHits,
      value: legend.label,
      operator,
    });
    onClose();
  };

  const handlerCopyLabel = async () => {
    await copyToClipboard(legend.label, t("common.valueCopied", { value: legend.label }));
    onClose();
  };

  const options: LegendLogHitsMenu[] = [
    {
      title: t("legend.copyName", { field: groupFieldHits }),
      iconStart: <CopyIcon/>,
      handler: handlerCopyLabel,
    },
    {
      title: t("legend.addToFilter", { field: groupFieldHits }),
      iconStart: <FilterIcon/>,
      handler:  handleAddStreamToFilter(ExtraFilterOperator.Equals),
    },
    {
      title: t("legend.excludeFromFilter", { field: groupFieldHits }),
      iconStart: <FilterOffIcon/>,
      handler: handleAddStreamToFilter(ExtraFilterOperator.NotEquals),
    }
  ];

  return (
    <div className="vm-legend-hits-menu-section">
      {options.map(({ ...menuProps }) => (
        <LegendHitsMenuRow
          key={menuProps.title}
          {...menuProps}
        />
      ))}
    </div>
  );
};

export default LegendHitsMenuBase;
