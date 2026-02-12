import { useParams, useSearchParams } from "react-router-dom";
import StreamContextList from "./StreamContextList";
import { Logs } from "../../api/types";
import { LOGS_DISPLAY_FIELDS, LOGS_URL_PARAMS } from "../../constants/logs";
import { useMemo } from "react";
import useI18n from "../../i18n/useI18n";
import "./style.scss";

const StreamContext = () => {
  const { _stream_id, _time } = useParams();

  const [searchParams] = useSearchParams();
  const displayFieldsString = searchParams.get(LOGS_URL_PARAMS.DISPLAY_FIELDS) || LOGS_DISPLAY_FIELDS;
  const displayFields = useMemo(() => displayFieldsString.split(","), [displayFieldsString]);

  const { t } = useI18n();

  if (!_stream_id || !_time) {
    return <div>{t("context.errorMissing")}</div>;
  }

  const log: Logs = { _stream_id, _time, _msg: "", _stream: "" };

  return (
    <div className="vm-stream-context-page">
      <StreamContextList
        log={log}
        displayFields={displayFields}
      />
    </div>
  );
};

export default StreamContext;
