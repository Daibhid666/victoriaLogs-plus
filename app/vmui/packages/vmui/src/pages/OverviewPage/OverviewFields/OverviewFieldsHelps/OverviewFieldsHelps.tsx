import Button from "../../../../components/Main/Button/Button";
import { QuestionIcon } from "../../../../components/Main/Icons";
import "./style.scss";
import useBoolean from "../../../../hooks/useBoolean";
import Modal from "../../../../components/Main/Modal/Modal";
import OverviewFieldsHelpContent from "./OverviewFieldsHelpContent";
import useI18n from "../../../../i18n/useI18n";

const OverviewFieldsHelps = () => {
  const { t } = useI18n();
  const {
    value: openModal,
    setTrue: handleOpenModal,
    setFalse: handleCloseModal,
  } = useBoolean(false);

  return (
    <>
      <Button
        startIcon={<QuestionIcon/>}
        variant="text"
        onClick={handleOpenModal}
      >
        {t("help.howItWorks")}
      </Button>
      {openModal && (
        <Modal
          title={t("help.modalTitle")}
          onClose={handleCloseModal}
        >
          <div className="vm-overview-fields-tour">
            <OverviewFieldsHelpContent/>
          </div>
        </Modal>
      )}
    </>
  );
};

export default OverviewFieldsHelps;
