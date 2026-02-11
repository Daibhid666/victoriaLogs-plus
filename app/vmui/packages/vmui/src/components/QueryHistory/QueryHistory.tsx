import { FC, useCallback, useEffect, useMemo, useRef, useState } from "preact/compat";
import Button from "../Main/Button/Button";
import { ClockIcon, DeleteIcon } from "../Main/Icons";
import useBoolean from "../../hooks/useBoolean";
import Modal from "../Main/Modal/Modal";
import Tabs from "../Main/Tabs/Tabs";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import useEventListener from "../../hooks/useEventListener";
import { useQueryState } from "../../state/query/QueryStateContext";
import { clearQueryHistoryStorage, getQueriesFromStorage, setFavoriteQueriesToStorage } from "./utils";
import QueryHistoryItem from "./QueryHistoryItem";
import classNames from "classnames";
import "./style.scss";
import { StorageKeys } from "../../utils/storage";
import { arrayEquals } from "../../utils/array";
import useI18n from "../../i18n/useI18n";
import {
  fetchQueryHistoryFromServer,
  saveQueryHistoryToServer,
  clearQueryHistoryOnServer,
  ServerQueryHistory
} from "../../api/queryHistory";

interface Props {
  handleSelectQuery: (query: string, index: number) => void
  historyKey: Extract<StorageKeys, "LOGS_QUERY_HISTORY">;
}

export const HistoryTabTypes = {
  session: "session",
  storage: "saved",
  favorite: "favorite",
};

const QueryHistory: FC<Props> = ({ handleSelectQuery, historyKey }) => {
  const { queryHistory: historyState } = useQueryState();
  const { isMobile } = useDeviceDetect();
  const { t } = useI18n();

  const historyTabs = useMemo(() => [
    { label: t("history.sessionHistory"), value: HistoryTabTypes.session },
    { label: t("history.savedHistory"), value: HistoryTabTypes.storage },
    { label: t("history.favoriteQueries"), value: HistoryTabTypes.favorite },
  ], [t]);

  const {
    value: openModal,
    setTrue: handleOpenModal,
    setFalse: handleCloseModal,
  } = useBoolean(false);

  const [activeTab, setActiveTab] = useState(historyTabs[0].value);
  const [historyStorage, setHistoryStorage] = useState(getQueriesFromStorage(historyKey, "QUERY_HISTORY"));
  const [historyFavorites, setHistoryFavorites] = useState(getQueriesFromStorage(historyKey, "QUERY_FAVORITES"));

  const historySession = useMemo(() => {
    return historyState.map((h) => h.values.filter(q => q).reverse());
  }, [historyState]);

  const list = useMemo(() => {
    switch (activeTab) {
      case HistoryTabTypes.favorite:
        return historyFavorites;
      case HistoryTabTypes.storage:
        return historyStorage;
      default:
        return historySession;
    }
  }, [activeTab, historyFavorites, historyStorage, historySession]);

  const isNoData = list?.every(s => !s.length);

  const noDataText = useMemo(() => {
    switch (activeTab) {
      case HistoryTabTypes.favorite:
        return t("history.emptyFavorites");
      default:
        return t("history.emptyHistory");
    }
  }, [activeTab, t]);

  const handleRunQuery = (group: number) => (value: string) => {
    handleSelectQuery(value, group);
    handleCloseModal();
  };

  const handleToggleFavorite = (value: string, isFavorite: boolean) => {
    setHistoryFavorites((prev) => {
      const values = prev[0] || [];
      if (isFavorite) return [values.filter(v => v !== value)];
      if (!isFavorite && !values.includes(value)) return [[...values, value]];
      return prev;
    });
  };

  // Guard to prevent syncing back to server while loading from server
  const isLoadingFromServer = useRef(false);

  // Sync saved history and favorites with server
  const loadFromServer = useCallback(async () => {
    isLoadingFromServer.current = true;
    const serverData = await fetchQueryHistoryFromServer();
    if (serverData) {
      if (serverData.QUERY_FAVORITES) setHistoryFavorites(serverData.QUERY_FAVORITES);
      if (serverData.QUERY_HISTORY) setHistoryStorage(serverData.QUERY_HISTORY);
    }
    // Allow effects to settle before re-enabling sync
    setTimeout(() => { isLoadingFromServer.current = false; }, 100);
  }, []);

  const syncToServer = useCallback(async (history: string[][], favorites: string[][]) => {
    const payload: ServerQueryHistory = {
      QUERY_HISTORY: history,
      QUERY_FAVORITES: favorites,
    };
    await saveQueryHistoryToServer(payload);
  }, []);

  const updateStageHistory = () => {
    setHistoryStorage(getQueriesFromStorage(historyKey, "QUERY_HISTORY"));
    setHistoryFavorites(getQueriesFromStorage(historyKey, "QUERY_FAVORITES"));
  };

  const handleClearStorage = async () => {
    clearQueryHistoryStorage(historyKey, "QUERY_HISTORY");
    await clearQueryHistoryOnServer();
    setHistoryStorage([]);
  };

  useEffect(() => {
    if (isLoadingFromServer.current) return;
    const nextValue = historyFavorites[0] || [];
    const prevValue = getQueriesFromStorage(historyKey, "QUERY_FAVORITES")[0] || [];
    const isEqual = arrayEquals(nextValue, prevValue);
    if (isEqual) return;
    setFavoriteQueriesToStorage(historyKey, historyFavorites);
    // Also sync favorites to server
    syncToServer(historyStorage, historyFavorites);
  }, [historyFavorites]);

  // Load from server when modal opens
  useEffect(() => {
    if (openModal) {
      loadFromServer();
    }
  }, [openModal, loadFromServer]);

  useEventListener("storage", updateStageHistory);

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        onClick={handleOpenModal}
        startIcon={<ClockIcon/>}
        ariaLabel={t("history.title")}
      >
        {!isMobile && t("history.title")}
      </Button>

      {openModal && (
        <Modal
          title={t("history.title")}
          onClose={handleCloseModal}
        >
          <div
            className={classNames({
              "vm-query-history": true,
              "vm-query-history_mobile": isMobile,
            })}
          >
            <div
              className={classNames({
                "vm-query-history__tabs": true,
                "vm-section-header__tabs": true,
                "vm-query-history__tabs_mobile": isMobile,
              })}
            >
              <Tabs
                activeItem={activeTab}
                items={historyTabs}
                onChange={setActiveTab}
              />
            </div>
            <div className="vm-query-history-list">
              {isNoData && <div className="vm-query-history-list__no-data">{noDataText}</div>}
              {list.map((queries, group) => (
                <div key={group}>
                  {list.length > 1 && (
                    <div
                      className={classNames({
                        "vm-query-history-list__group-title": true,
                        "vm-query-history-list__group-title_first": group === 0,
                      })}
                    >
                      {t("history.queryN")} {group + 1}
                    </div>
                  )}
                  {queries.map((query, index) => (
                    <QueryHistoryItem
                      key={index}
                      query={query}
                      favorites={historyFavorites.flat()}
                      onRun={handleRunQuery(group)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              ))}
              {(activeTab === HistoryTabTypes.storage) && !isNoData && (
                <div className="vm-query-history-footer">
                  <Button
                    color="error"
                    variant="outlined"
                    size="small"
                    startIcon={<DeleteIcon/>}
                    onClick={handleClearStorage}
                  >
                    {t("history.clearHistory")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default QueryHistory;
