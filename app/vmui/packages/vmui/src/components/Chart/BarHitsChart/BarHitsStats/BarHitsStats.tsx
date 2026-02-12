import { FC } from "preact/compat";
import "uplot/dist/uPlot.min.css";
import useDeviceDetect from "../../../../hooks/useDeviceDetect";
import { formatNumberShort } from "../../../../utils/math";
import { getDurationFromMilliseconds } from "../../../../utils/time";
import useI18n from "../../../../i18n/useI18n";
import "./style.scss";

interface Props {
  totalHits: number;
  isHitsMode: boolean
  durationMs?: number;
}

const BarHitsStats: FC<Props> = ({ totalHits, isHitsMode, durationMs }) => {
  const { isMobile } = useDeviceDetect();
  const { t } = useI18n();

  const totalHitsFormat = isMobile ? formatNumberShort(totalHits) : totalHits.toLocaleString("en-US");
  const durationFormat = durationMs ? getDurationFromMilliseconds(durationMs) : null;

  return (
    <div className="vm-bar-hits-stats">
      {isHitsMode && (
        <p className="vm-bar-hits-stats__item">
          {t("chart.total")} <b>{totalHitsFormat}</b> {t("chart.hits")}
        </p>
      )}
      {durationFormat && (
      <p className="vm-bar-hits-stats__item">
        {t("chart.duration")} <b>{durationFormat}</b>
      </p>
      )}
    </div>
  );
};

export default BarHitsStats;
