import { LegendLogHitsMenu } from "../../../../../api/types";
import { useMemo } from "react";
import { FocusIcon, UnfocusIcon, VisibilityIcon, VisibilityOffIcon } from "../../../../Main/Icons";
import { altKeyLabel, ctrlKeyLabel } from "../../../../../utils/keyboard";
import { Series } from "uplot";
import useI18n from "../../../../../i18n/useI18n";

type Props = {
  targetSeries?: Series;
  isOnlyTargetVisible: boolean;
  handleVisibilityToggle: () => void;
  handleFocusToggle: () => void;
}

const useLegendHitsVisibilityMenu = ({
  targetSeries,
  isOnlyTargetVisible,
  handleVisibilityToggle,
  handleFocusToggle
}: Props): LegendLogHitsMenu[] => {
  const { t } = useI18n();
  const isShow = Boolean(targetSeries?.show);

  return useMemo(() => [
    {
      title: isShow ? t("legend.hideSeries") : t("legend.showSeries"),
      iconStart: isShow ? <VisibilityOffIcon/> : <VisibilityIcon/>,
      shortcut: `${altKeyLabel} + Click`, // handled in BarHitsLegendItem.tsx
      handler: handleVisibilityToggle,
    },
    {
      title: isOnlyTargetVisible ? t("legend.showAllSeries") : t("legend.showOnlySeries"),
      iconStart: isOnlyTargetVisible ? <UnfocusIcon/> : <FocusIcon/>,
      shortcut: `${ctrlKeyLabel} + Click`, // handled in BarHitsLegendItem.tsx
      handler: handleFocusToggle,
    },
  ], [isOnlyTargetVisible, isShow, handleVisibilityToggle, handleFocusToggle, t]);
};

export default useLegendHitsVisibilityMenu;
