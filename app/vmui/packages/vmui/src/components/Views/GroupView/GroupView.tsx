import { FC, memo } from "preact/compat";
import GroupLogs from "./GroupLogs";
import { ViewProps } from "../../../pages/QueryPage/QueryPageBody/types";

const MemoizedGroupLogs = memo(GroupLogs);

const GroupView: FC<ViewProps> = ({ data, settingsRef }) => {
  return (
    <>
      <MemoizedGroupLogs
        logs={data}
        settingsRef={settingsRef}
      />
    </>
  );
};

export default GroupView;
