import { useContext } from "preact/compat";
import { I18nContext, I18nContextType } from "./I18nContext";

const useI18n = (): I18nContextType => {
  return useContext(I18nContext);
};

export default useI18n;
