import { FC, useEffect, useRef } from "preact/compat";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const { setLocale } = useI18n();
  const queryDispatch = useQueryDispatch();
  const hasLoadedServerSettings = useRef(false);

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
    hasLoadedServerSettings.current = true;

    (async () => {
      const settings = await fetchGlobalSettingsFromServer();
      if (!settings) return;

      if (settings.locale) {
        setLocale(settings.locale);
      }

      if (typeof settings.autocomplete === "boolean") {
        queryDispatch({ type: "SET_AUTOCOMPLETE", payload: settings.autocomplete });
      }

      const next = new URLSearchParams(searchParams);
      let shouldUpdateSearchParams = false;

      if (!next.has("stacked") && settings.stacked) {
        next.set("stacked", "true");
        shouldUpdateSearchParams = true;
      }

      if (!next.has("cumulative") && settings.cumulative) {
        next.set("cumulative", "true");
        shouldUpdateSearchParams = true;
      }

      if (shouldUpdateSearchParams) {
        setSearchParams(next);
      }
    })();
  }, [queryDispatch, searchParams, setLocale, setSearchParams]);

  return <section className="vm-container">
    <Header controlsComponent={ControlsLogsLayout}/>
    <div
      className={classNames({
        "vm-container-body": true,
        "vm-container-body_mobile": isMobile,
        "vm-container-body_app": appModeEnable
      })}
    >
      <Outlet/>
    </div>
    {!appModeEnable && <Footer links={footerLinksToLogs}/>}

    <WebStorageCheck/>
  </section>;
};

export default LogsLayout;
