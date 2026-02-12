import { FC, ReactNode, useCallback, useMemo } from "preact/compat";
import Modal from "../Modal/Modal";
import "./style.scss";
import Tooltip from "../Tooltip/Tooltip";
import getKeyList from "./constants/keyList";
import useBoolean from "../../../hooks/useBoolean";
import useEventListener from "../../../hooks/useEventListener";
import useI18n from "../../../i18n/useI18n";

const keyOpenHelp = "F1";

type Props = {
  children?: ReactNode
  withHotkey?: boolean
}

const ShortcutKeys: FC<Props> = ({ children, withHotkey = true }) => {
  const { t } = useI18n();
  const keyList = useMemo(() => getKeyList(t), [t]);
  const title = t("shortcuts.title");

  const {
    value: openList,
    setTrue: handleOpen,
    setFalse: handleClose,
  } = useBoolean(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!withHotkey) return;
    const openOnOther = e.key === "F1";
    if (openOnOther) handleOpen();
  }, [handleOpen, withHotkey]);

  useEventListener("keydown", handleKeyDown);

  return <>
    <Tooltip
      title={`${title} (${keyOpenHelp})`}
      placement="bottom-center"
    >
      <div onClick={handleOpen}>
        {children}
      </div>
    </Tooltip>

    {openList && (
      <Modal
        title={title}
        onClose={handleClose}
      >
        <div className="vm-shortcuts">
          {keyList.map(section => (
            <div
              className="vm-shortcuts-section"
              key={section.title}
            >
              <h3 className="vm-shortcuts-section__title">
                {section.title}
              </h3>
              <div className="vm-shortcuts-section-list">
                {section.list.map((l, i) => (
                  <div
                    className="vm-shortcuts-section-list-item"
                    key={`${section.title}_${i}`}
                  >
                    <div className="vm-shortcuts-section-list-item__key">
                      {l.keys}
                    </div>
                    <p className="vm-shortcuts-section-list-item__description">
                      {l.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    )}
  </>;
};

export default ShortcutKeys;
