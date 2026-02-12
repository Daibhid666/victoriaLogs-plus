import { FC, useEffect, useState } from "preact/compat";
import "./style.scss";
import Tooltip from "../Tooltip/Tooltip";
import Button from "../Button/Button";
import { CopyIcon } from "../Icons";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";
import useI18n from "../../../i18n/useI18n";

const CodeExample: FC<{code: string}> = ({ code }) => {
  const copyToClipboard = useCopyToClipboard();
  const { t } = useI18n();

  const [tooltip, setTooltip] = useState<"copy" | "copied">("copy");
  const handlerCopy = async () => {
    await copyToClipboard(code);
    setTooltip("copied");
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (tooltip === "copied") {
      timeout = setTimeout(() => setTooltip("copy"), 1000);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [tooltip]);

  return (
    <code className="vm-code-example">
      {code}
      <div className="vm-code-example__copy">
        <Tooltip title={tooltip === "copied" ? t("codeExample.copied") : t("codeExample.copy")}>
          <Button
            size="small"
            variant="text"
            onClick={handlerCopy}
            startIcon={<CopyIcon/>}
            ariaLabel="close"
          />
        </Tooltip>
      </div>
    </code>
  );
};

export default CodeExample;
