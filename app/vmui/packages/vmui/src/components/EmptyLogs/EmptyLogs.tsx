import { FC } from "preact/compat";
import useI18n from "../../i18n/useI18n";
import "./style.scss";

const EmptyLogs: FC = () => {
  const { t } = useI18n();
  return (
    <div className="vm-empty">{t("empty.noLogs")}</div>
  );
};

export default EmptyLogs;
