const en = {
  // Common
  "common.cancel": "Cancel",
  "common.apply": "Apply",
  "common.settings": "Settings",
  "common.controls": "Controls",

  // Navigation
  "nav.query": "Query",
  "nav.overview": "Overview",

  // Query Page Header
  "query.logQuery": "Log query",
  "query.autocomplete": "Autocomplete",
  "query.langDocs": "Query language docs",
  "query.documentation": "Documentation",
  "query.history": "Query history",
  "query.execute": "Execute Query",
  "query.cancel": "Cancel Query",
  "query.logLimits": "Log limits",

  // Query History
  "history.sessionHistory": "Session History",
  "history.savedHistory": "Saved History",
  "history.favoriteQueries": "Favorite Queries",
  "history.title": "Query history",
  "history.clearHistory": "clear history",
  "history.executeQuery": "Execute query",
  "history.copyQuery": "Copy query",
  "history.addFavorite": "Add to Favorites",
  "history.removeFavorite": "Remove Favorite",
  "history.copied": "Query has been copied",
  "history.emptyFavorites": "Favorites queries are empty.\nTo see your favorites, mark a query as a favorite.",
  "history.emptyHistory": "Query history is empty.\nTo see the history, please make a query.",
  "history.queryN": "Query",

  // Group View Settings
  "group.title": "Group view settings",
  "group.groupByField": "Group by field",
  "group.displayFields": "Display fields",
  "group.dateFormat": "Date format",
  "group.singleLineMessage": "Single-line message",
  "group.compactGroupHeader": "Compact group header",
  "group.disableHoverEffects": "Disable hover effects",
  "group.resetGrouping": "Reset grouping",
  "group.clearFields": "Clear fields",
  "group.resetFormat": "Reset format",
  "group.selectGroupBy": "Select a field to group logs by (default: {default}).",
  "group.selectDisplayFields": "Select fields to display instead of the message (default: {default}).",
  "group.dateFormatInfo": "Set the date format (e.g., YYYY-MM-DD HH:mm:ss). Learn more in",
  "group.dateFormatLink": "this documentation",
  "group.currentDateFormat": "Your current date format:",
  "group.singleLineInfo": "Displays message in a single line and truncates it with an ellipsis if it exceeds the available space.",
  "group.compactGroupHeaderInfo": "Shows group headers in one line with a \"+N more\" badge for extra fields.",
  "group.disableHoverInfo": "Disable row highlighting on hover to improve performance with large datasets.",
  "group.groupedBy": "Group by",
  "group.displayFieldsCount": "Display fields:",
  "group.singleLineEnabled": "Single-line text is enabled",
  "group.compactHeaderEnabled": "Compact group header is enabled",
  "group.dateFormatLabel": "Date format:",
  "group.saveToServer": "Save to server",
  "group.loadFromServer": "Load from server",
  "group.savedSuccess": "Settings saved to server",
  "group.loadedSuccess": "Settings loaded from server",
  "group.resetSuccess": "Settings reset",

  // Log Parsing
  "parsing.enableMarkdown": "Enable markdown parsing",
  "parsing.markdownInfo": "Toggle this switch to enable or disable the Markdown formatting for log entries. Enabling this will parse log texts to Markdown.",
  "parsing.enableAnsi": "Enable ANSI parsing",
  "parsing.ansiInfo": "Toggle this switch to enable or disable ANSI escape sequence parsing for log entries. Enabling this will interpret ANSI codes to render colored log output.",

  // Global Settings
  "settings.title": "Settings",
  "settings.timezone": "Time zone",
  "settings.queryTimeOverride": "Query time override",
  "settings.overrideTimeLabel": "Override time picker with query _time filter",
  "settings.themePreferences": "Theme preferences",
  "settings.themeSystem": "System",
  "settings.themeLight": "Light",
  "settings.themeDark": "Dark",

  // Execution Controls
  "execution.refreshDashboard": "Refresh dashboard",
  "execution.autoRefresh": "Auto-refresh",
  "execution.autoRefreshControl": "Auto-refresh control",
  "execution.autoRefreshDuration": "Auto-refresh duration",

  // Time Selector
  "time.range": "Time range",
  "time.rangeControls": "Time range controls",
  "time.from": "From:",
  "time.to": "To:",
  "time.switchToNow": "switch to now",
  "time.dateFrom": "Date From",
  "time.dateTo": "Date To",
  "time.overrideWarning": "Time range is overridden by the query `_time` filter.",
  "time.removeTimeHint": "Remove `_time` from the query to use manual selection.",
  "time.disableOverrideHint": "To disable query time override in settings, click here.",

  // Query Page Body
  "body.group": "Group",
  "body.table": "Table",
  "body.json": "JSON",
  "body.live": "Live",
  "body.downloadLogs": "Download Logs",
  "body.showLogs": "Show Logs",
  "body.hideLogs": "Hide Logs",
  "body.logsHidden": "Logs are hidden. Updates paused.",
  "body.timeOverrideWarning": "Time range is overridden by the query `_time` filter. Remove `_time` from the query to use manual selection. Disable query time override in Settings.",

  // Empty
  "empty.noLogs": "No logs found",

  // Footer
  "footer.createIssue": "Create an issue",
  "footer.documentation": "Documentation",
  "footer.version": "Version:",

  // Logs Limit
  "limit.mustBePositive": "Number must be > 0",
  "limit.maxLimit": "Max limit is {max}",

  // Language
  "lang.switch": "Language",
  "lang.en": "English",
  "lang.zh": "中文",
} as const;

export type TranslationKeys = keyof typeof en;
export default en;
