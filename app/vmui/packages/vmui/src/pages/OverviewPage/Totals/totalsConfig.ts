import type { TranslationKeys } from "../../../i18n/locales/en";

export type TotalsConfig = {
  titleKey: TranslationKeys;
  descKey: TranslationKeys;
  alias: string;
  stats: string;
  statsExpr: string;
  formatter?: (value: number) => string;
}

const defaultFormatNumber = (n: number) => n.toLocaleString("en-US");

const explorerTotalsRaw = [
  {
    titleKey: "totals.totalLogs" as const,
    descKey: "totals.totalLogsDesc" as const,
    alias: "totalLogs",
    stats: "count()",
    formatter: defaultFormatNumber,
  },
  {
    titleKey: "totals.logsPerSec" as const,
    descKey: "totals.logsPerSecDesc" as const,
    alias: "logsPerSec",
    stats: "rate()",
    formatter: defaultFormatNumber,
  },
  {
    titleKey: "totals.uniqueStreams" as const,
    descKey: "totals.uniqueStreamsDesc" as const,
    alias: "uniqueStreams",
    stats: "count_uniq(_stream_id)",
    formatter: (n: number) => `${defaultFormatNumber(n)}`,
  },
];

export const explorerTotals: TotalsConfig[] = explorerTotalsRaw.map(t => ({
  ...t,
  statsExpr: `${t.stats} as ${t.alias}`,
}));
