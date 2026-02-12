import { FC, useEffect, useState } from "preact/compat";
import Modal from "../../../components/Main/Modal/Modal";
import Button from "../../../components/Main/Button/Button";
import LogsLimitInput from "./LogsLimitInput";
import "./style.scss";
import Checkbox from "../../../components/Main/Checkbox/Checkbox";
import DownloadLogsModal from "../../../components/DownloadLogs/DownloadLogsModal";
import useI18n from "../../../i18n/useI18n";

type Props = {
  isOpen: boolean;
  initialLimit: number;
  limitDraft: number;
  setLimitDraft: (limit: number) => void;
  suppressWarning: boolean;
  queryParams?: Record<string, string>;
  onChangeSuppressWarning: (value: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const LimitConfirmModal: FC<Props> = ({
  initialLimit,
  limitDraft,
  setLimitDraft,
  isOpen,
  suppressWarning,
  queryParams,
  onChangeSuppressWarning,
  onConfirm,
  onCancel
}) => {
  const { t } = useI18n();
  const [error, setError] = useState(false);

  useEffect(() => () => onCancel(), [onCancel]);

  if (!isOpen) return null;

  return (
    <Modal
      title={t("limitConfirm.title")}
      isOpen={isOpen}
      onClose={onCancel}
    >
      <div className="vm-logs-limit-modal">
        <div className="vm-logs-limit-modal-text">
          <p dangerouslySetInnerHTML={{ __html: !initialLimit ? t("limitConfirm.unlimitedLoad") : t("limitConfirm.aboutToLoad", { limit: initialLimit.toLocaleString("en-US") }) }} />
          <p>{t("limitConfirm.maySlowDown")}</p>
          <p>{t("limitConfirm.areYouSure")}</p>
        </div>

        <div className="vm-logs-limit-modal-input">
          <LogsLimitInput
            limit={limitDraft}
            onChangeLimit={setLimitDraft}
            onPressEnter={onConfirm}
            onError={setError}
          />
        </div>

        <DownloadLogsModal queryParams={queryParams}>
          <p className="vm-logs-limit-modal-download vm-link vm-link_colored vm-link_underlined">
            {t("limitConfirm.downloadHint")}
          </p>
        </DownloadLogsModal>

        <div className="vm-logs-limit-modal-footer">
          <div>
            <Checkbox
              color="primary"
              label={t("limitConfirm.dontShowAgain")}
              checked={suppressWarning}
              onChange={onChangeSuppressWarning}
            />

          </div>

          <div className="vm-logs-limit-modal-footer__actions">
            <Button
              color="error"
              variant="outlined"
              onClick={onCancel}
            >
              {t("common.cancel")}
            </Button>
            <Button
              onClick={onConfirm}
              disabled={error}
            >
              {t("limitConfirm.loadLogs")}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LimitConfirmModal;
