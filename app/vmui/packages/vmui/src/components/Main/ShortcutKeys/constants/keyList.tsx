import { isMacOs } from "../../../../utils/detect-device";
import { altKeyLabel, ctrlKeyLabel } from "../../../../utils/keyboard";

const ctrlMeta = <code>{ctrlKeyLabel}</code>;

export const AUTOCOMPLETE_QUICK_KEY = <>{<code>{isMacOs() ? altKeyLabel : "Ctrl"}</code>} + <code>Space</code></>;

const getKeyList = (t: (key: any) => string) => [
  {
    title: t("shortcuts.query"),
    list: [
      {
        keys: <code>Enter</code>,
        description: t("shortcuts.run")
      },
      {
        keys: <><code>Shift</code> + <code>Enter</code></>,
        description: t("shortcuts.multiLine")
      },
      {
        keys: <>{ctrlMeta} + <code>Arrow Up</code></>,
        description: t("shortcuts.prevCommand")
      },
      {
        keys: <>{ctrlMeta} + <code>Arrow Down</code></>,
        description: t("shortcuts.nextCommand")
      },
      {
        keys: AUTOCOMPLETE_QUICK_KEY,
        description: t("shortcuts.quickAutocomplete")
      }
    ]
  },
  {
    title: t("shortcuts.graph"),
    list: [
      {
        keys: <>{ctrlMeta} + <code>scroll Up</code> or <code>+</code></>,
        description: t("shortcuts.zoomIn")
      },
      {
        keys: <>{ctrlMeta} + <code>scroll Down</code> or <code>-</code></>,
        description: t("shortcuts.zoomOut")
      },
      {
        keys: <>{ctrlMeta} + <code>drag</code></>,
        description: t("shortcuts.moveGraph")
      },
      {
        keys: <><code>click</code> on legend item</>,
        description: t("shortcuts.openLegendMenu")
      },
      {
        keys: <><code>{altKeyLabel}</code> + <code>click</code> on legend item</>,
        description: t("shortcuts.toggleSeries")
      },
      {
        keys: <>{ctrlMeta} + <code>click</code> on legend item</>,
        description: t("shortcuts.focusSeries")
      }
    ]
  },
];

export default getKeyList;
