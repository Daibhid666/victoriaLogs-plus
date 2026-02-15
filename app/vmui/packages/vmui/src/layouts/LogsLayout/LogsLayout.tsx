import { FC, useEffect, useRef, useState } from "preact/compat";
import Header from "../Header/Header";
import { matchPath, Outlet, useLocation, useSearchParams } from "react-router-dom";
import "./style.scss";
import { getAppModeEnable } from "../../utils/app-mode";
import classNames from "classnames";
import Footer from "../Footer/Footer";
import { RouterOptions, routerOptions } from "../../router";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import ControlsLogsLayout from "./ControlsLogsLayout";
import { footerLinksToLogs } from "../../constants/footerLinks";
import WebStorageCheck from "../../components/WebStorageCheck/WebStorageCheck";
import { migrateStorageToPrefixedKeys } from "../../utils/storage";
import useI18n from "../../i18n/useI18n";
import { useQueryDispatch } from "../../state/query/QueryStateContext";
import { fetchGlobalSettingsFromServer } from "../../api/globalSettings";

const LogsLayout: FC = () => {
  const appModeEnable = getAppModeEnable();
  const { isMobile } = useDeviceDetect();
  const { pathname } = useLocation();
  const [, setSearchParams] = useSearchParams();
  const { setLocale } = useI18n();
  const queryDispatch = useQueryDispatch();
  const hasLoadedServerSettings = useRef(false);
  const loadSettingsTimerRef = useRef<number>();
  const [settingsInitialized, setSettingsInitialized] = useState(false);

  const setDocumentTitle = () => {
    const matchedEntry = Object.entries(routerOptions).find(([path]) => {
      return matchPath(path, pathname);
    });

    const routeTitle =  (matchedEntry?.[1] as RouterOptions)?.title;
    const defaultTitle = "UI for VictoriaLogs";
    document.title = routeTitle ? `${routeTitle} - ${defaultTitle}` : defaultTitle;
  };

  useEffect(setDocumentTitle, [pathname]);

  useEffect(() => {
    const migrateStorage = migrateStorageToPrefixedKeys();
    if (migrateStorage.removed.length || migrateStorage.migrated.length) {
      console.info(migrateStorage);
    }
  }, []);

  useEffect(() => {
    if (hasLoadedServerSettings.current) return;
    let isCancelled = false;
    let attempts = 0;
    const maxAttempts = 8;
    const retryDelayMs = 500;

    const loadSettings = async () => {
      const settings = await fetchGlobalSettingsFromServer();
      if (isCancelled) return;

      if (!settings) {
        if (attempts < maxAttempts) {
          attempts += 1;
          loadSettingsTimerRef.current = window.setTimeout(() => {
            void loadSettings();
          }, retryDelayMs);
        } else {
          setSettingsInitialized(true);
        }
        return;
      }

      hasLoadedServerSettings.current = true;

      if (settings.locale) {
        setLocale(settings.locale);
      }

      if (typeof settings.autocomplete === "boolean") {
        queryDispatch({ type: "SET_AUTOCOMPLETE", payload: settings.autocomplete });
      }

      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        let changed = false;

        if (!next.has("stacked") && settings.stacked) {
          next.set("stacked", "true");
          changed = true;
        }

        if (!next.has("cumulative") && settings.cumulative) {
          next.set("cumulative", "true");
          changed = true;
        }

        return changed ? next : prev;
      });
      setSettingsInitialized(true);
    };

    void loadSettings();

    return () => {
      isCancelled = true;
      if (loadSettingsTimerRef.current) {
        window.clearTimeout(loadSettingsTimerRef.current);
      }
    };
  }, [queryDispatch, setLocale, setSearchParams]);

  return <section className="vm-container">
    <Header controlsComponent={ControlsLogsLayout}/>
    <div
      className={classNames({
        "vm-container-body": true,
        "vm-container-body_mobile": isMobile,
        "vm-container-body_app": appModeEnable
      })}
    >
      {settingsInitialized && <Outlet/>}
    </div>
    {!appModeEnable && <Footer links={footerLinksToLogs}/>}

    <WebStorageCheck/>
  </section>;
};

export default LogsLayout;
