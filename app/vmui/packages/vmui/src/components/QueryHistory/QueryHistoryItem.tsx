import { FC, useMemo } from "preact/compat";
import Button from "../Main/Button/Button";
import { CopyIcon, PlayCircleOutlineIcon, StarBorderIcon, StarIcon } from "../Main/Icons";
import Tooltip from "../Main/Tooltip/Tooltip";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import useI18n from "../../i18n/useI18n";
import "./style.scss";

interface Props {
  query: string;
  favorites: string[];
  onRun: (query: string) => void;
  onToggleFavorite: (query: string, isFavorite: boolean) => void;
}

const QueryHistoryItem: FC<Props> = ({ query, favorites, onRun, onToggleFavorite }) => {
  const copyToClipboard = useCopyToClipboard();
  const isFavorite = useMemo(() => favorites.includes(query), [query, favorites]);
  const { t } = useI18n();

  const handleCopyQuery = async () => {
    await copyToClipboard(query, t("history.copied"));
  };

  const handleRunQuery = () => {
    onRun(query);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite(query, isFavorite);
  };

  return (
    <div className="vm-query-history-item">
      <span className="vm-query-history-item__value">{query}</span>
      <div className="vm-query-history-item__buttons">
        <Tooltip title={t("history.executeQuery")}>
          <Button
            size="small"
            variant="text"
            onClick={handleRunQuery}
            startIcon={<PlayCircleOutlineIcon/>}
          />
        </Tooltip>
        <Tooltip title={t("history.copyQuery")}>
          <Button
            size="small"
            variant="text"
            onClick={handleCopyQuery}
            startIcon={<CopyIcon/>}
          />
        </Tooltip>
        <Tooltip title={isFavorite ? t("history.removeFavorite") : t("history.addFavorite")}>
          <Button
            size="small"
            variant="text"
            color={isFavorite ? "warning" : "primary"}
            onClick={handleToggleFavorite}
            startIcon={isFavorite ? <StarIcon/> : <StarBorderIcon/>}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default QueryHistoryItem;
