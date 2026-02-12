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

  // Chart Options
  "chart.topHits": "Top hits",
  "chart.bars": "Bars",
  "chart.groupBy": "Group by",
  "chart.noFieldsFound": "No fields found",
  "chart.cumulative": "Cumulative",
  "chart.statsView": "Stats view",
  "chart.stacked": "Stacked",
  "chart.showChart": "Show chart and resume hits updates",
  "chart.hideChart": "Hide chart and pause hits updates",
  "chart.hitsOptions": "Hits Options",

  // Chart Stats
  "chart.total": "Total:",
  "chart.hits": "hits",
  "chart.duration": "Duration:",

  // Chart Messages
  "chart.hidden": "Chart hidden. Hits updates paused.",
  "chart.noLogsVolume": "No logs volume available\nNo volume information available for the current queries and time range.",
  "chart.noTimestamp": "No timestamp information available for the current queries and time range.",
  "chart.noValue": "No value information available for the current queries and time range.",

  // Query Editor Tooltips
  "editor.newLine": "insert a new line",
  "editor.executeQuery": "execute query",
  "editor.toggleComment": "toggle line comment",
  "editor.quickTip": "Quick tip:",

  // Select / Pagination
  "select.rows": "Rows",
  "select.rowsPerPage": "Rows per page",
  "select.loading": "loading...",
  "select.noOptions": "No options available",
  "select.search": "Search",
  "select.all": "All",

  // Additional Settings
  "additionalSettings.autocomplete": "Autocomplete",
  "additionalSettings.querySettings": "Query settings",

  // Common actions
  "common.copied": "Copied",
  "common.copy": "Copy",
  "common.copyToClipboard": "Copy to clipboard",
  "common.loading": "Loading...",
  "common.search": "Search",

  // Field Selector
  "fieldSelector.showSelector": "Show field selector",
  "fieldSelector.hideSelector": "Hide field selector",
  "fieldSelector.fields": "Fields",
  "fieldSelector.filterFields": "Filter fields",
  "fieldSelector.unpinField": "Unpin field",
  "fieldSelector.pinToTop": "Pin to top",
  "fieldSelector.noValues": "No values",
  "fieldSelector.noMatchingFields": "No matching fields",
  "fieldSelector.noFieldsAvailable": "No fields available",
  "fieldSelector.clickToApply": "Click to apply: {field}:=\"{value}\"",
  "fieldSelector.addFilter": "Add filter: {field}:=\"{value}\"",

  // Limit Confirm Modal
  "limitConfirm.title": "Confirm large load",
  "limitConfirm.aboutToLoad": "You're about to load <b>{limit}</b> logs.",
  "limitConfirm.unlimitedLoad": "You're about to load <b>an unlimited number of</b> logs.",
  "limitConfirm.maySlowDown": "This may slow down the app or make the UI unresponsive.",
  "limitConfirm.areYouSure": "Are you sure you want to continue?",
  "limitConfirm.downloadHint": "Click to download all matching logs without a limit.",
  "limitConfirm.dontShowAgain": "Don't show again in this tab",
  "limitConfirm.loadLogs": "Load Logs",

  // Filters Bar
  "filters.globalFilters": "Global filters:",
  "filters.clearGlobalFilters": "Clear global filters",
  "filters.previewFilters": "Preview filters:",
  "filters.focusTooltip": "Focus: preview logs only. Doesn't change Global filters.",
  "filters.streamFocusTooltip": "Stream focus: preview logs only. Doesn't change Global filters.",
  "filters.includeAll": "Include all",
  "filters.excludeAll": "Exclude all",
  "filters.clearFilters": "Clear filters",
  "filters.previewInfo": "These filters affect preview logs only. To apply them to Totals, Hits, and Fields/Streams, use <b>Include All</b> or <b>Exclude All</b>.",

  // Overview Logs
  "overview.query": "Query:",
  "overview.limit": "Limit",
  "overview.copyQuery": "Copy query",
  "overview.openQuery": "Open query",

  // Stream Context
  "context.errorMissing": "Error: Missing stream ID or time.",
  "context.logContext": "Log context",
  "context.showContext": "Show context",
  "context.openInNewPage": "Open in new page",
  "context.wrapLines": "Wrap lines",
  "context.logsPerLoad": "Logs per load",
  "context.loadNewerLogs": "Load newer logs",
  "context.loadOlderLogs": "Load older logs",
  "context.noMoreLogsAfter": "no more logs after",
  "context.noMoreLogsBefore": "no more logs before",

  // Group Logs
  "groupLogs.showField": "Show this field instead of the message",
  "groupLogs.hideField": "Hide this field",
  "groupLogs.groupByField": "Group by this field",
  "groupLogs.ungroupField": "Ungroup this field",
  "groupLogs.timestampMissing": "timestamp missing",

  // Table
  "table.copyRow": "Copy row",

  // Code Example
  "codeExample.copy": "Copy",
  "codeExample.copied": "Copied",

  // JSON View
  "jsonView.copyJson": "Copy JSON",
  "jsonView.copiedJson": "Copied JSON to clipboard",

  // Overview Table
  "overviewTable.search": "Search",
  "overviewTable.searchTooltip": "Filters rows in the current table only. Does not send queries to the server.",

  // Overview Fields
  "overviewFields.focus": "Focus",
  "overviewFields.unfocus": "Unfocus",
  "overviewFields.include": "Include",
  "overviewFields.exclude": "Exclude",
  "overviewFields.fieldNames": "Field names",
  "overviewFields.streamFieldNames": "Stream field names",
  "overviewFields.fieldValues": "Field values:",
  "overviewFields.noFieldNamesFound": "No field names found",
  "overviewFields.noValuesFound": "No values found",
  "overviewFields.selectFieldName": "Select field name to see values",
  "overviewFields.selectStreamFieldName": "Select stream field name to see values",
  "overviewFields.mode": "Mode",
  "overviewFields.topN": "Top N",
  "overviewFields.bottomN": "Bottom N",
  "overviewFields.topDescription": "Most common values (highest hit counts)",
  "overviewFields.bottomDescription": "Least common values (fewest hit counts)",

  // Overview Columns
  "columns.fieldName": "Field name",
  "columns.fieldValue": "Field value",
  "columns.streamFieldName": "Stream field name",
  "columns.streamFieldValue": "Stream field value",
  "columns.hits": "Hits",
  "columns.coverage": "Coverage %",
  "columns.percentOfLogs": "% of logs",

  // Legend Menu
  "legend.copyName": "Copy {field} name",
  "legend.addToFilter": "Add {field} to filter",
  "legend.excludeFromFilter": "Exclude {field} to filter",
  "legend.copyField": "Copy",
  "legend.addFieldToFilter": "Add to filter",
  "legend.excludeFieldFromFilter": "Exclude to filter",

  // Download Logs
  "download.title": "Download logs",
  "download.fileName": "File name",
  "download.description": "This will download all logs for {period} using your current query for tenant {tenant}.",
  "download.download": "Download",

  // Totals
  "totals.totalLogs": "Total logs",
  "totals.totalLogsDesc": "Total number of selected logs on the selected time range",
  "totals.logsPerSec": "Logs/sec (avg)",
  "totals.logsPerSecDesc": "Average logs per second on the selected time range",
  "totals.uniqueStreams": "Unique log streams",
  "totals.uniqueStreamsDesc": "The number of log streams on the selected time range",
  "totals.prevTimeRange": "Change compared to the previous time range:",

  // Help
  "help.howItWorks": "How it works",
  "help.modalTitle": "Fields & Streams Overview",
  "help.intro": "This view helps you spot <strong>noisy</strong> and <strong>rare</strong> fields/streams and their <strong>values</strong>, and quickly filter the rest.",
  "help.namesTableTitle": "Names table",
  "help.namesTableDesc": "Shows field or stream <strong>names</strong> and the number of logs per name.",
  "help.docs": "Docs:",
  "help.docFieldNames": "Querying field names",
  "help.docStreamNames": "Querying stream field names",
  "help.columns": "Columns",
  "help.hitsCol": "<strong>Hits</strong> — number of logs that contain this name (API result).",
  "help.coverageCol": "<strong>Coverage %</strong> — percentage of all logs: <code>hits / total × 100</code>.",
  "help.clickBehavior": "Click behavior",
  "help.clickRowFocus": "Click a row → selects the name and focuses it (adds a blue filter badge).",
  "help.ctrlClickExclude": "<strong>{ctrlKey} + Click</strong> → applies <strong>Exclude</strong> immediately.",
  "help.seeRowActions": "See <strong>Row actions</strong> for more options.",
  "help.valuesTableTitle": "Values table",
  "help.valuesTableDesc": "Shows <strong>Top/Bottom N</strong> <strong>values</strong> for the selected name and the number of logs per value.",
  "help.selectors": "Selectors",
  "help.modeSelector": "<strong>Mode</strong> — <code>Top</code> or <code>Bottom</code>.",
  "help.topNSelector": "<strong>Top N</strong> — how many values to fetch. These controls directly change the query and results.",
  "help.valuesHitsCol": "<strong>Hits</strong> — count for the specific value.",
  "help.valuesPercentCol": "<strong>% of logs</strong> — percentage of all logs: <code>hits / total × 100</code>.",
  "help.valuesClickRowFocus": "Click a row → focuses the value (adds a blue filter badge).",
  "help.valuesSeeRowActions": "See <strong>Row actions</strong>.",
  "help.rowActionsTitle": "Row actions",
  "help.focusAction": "<strong>Focus</strong> — adds a <strong>blue filter badge</strong> and updates <strong>Preview logs</strong>. Does <strong>not</strong> change global filters.",
  "help.includeAction": "<strong>Include</strong> — adds a <strong>global include filter</strong> (gray badge) for the selected item.",
  "help.excludeAction": "<strong>Exclude</strong> — adds a <strong>global exclude filter</strong> (gray badge) for the selected item.",
  "help.copyAction": "<strong>Copy</strong> — copies the selected <strong>name</strong> (from <em>Names</em>) or the <strong>name–value</strong> pair (from <em>Values</em>).",
  "help.note": "<strong>Note:</strong> <strong>Include/Exclude</strong> appear as <strong>gray badges</strong> in <strong>Global filters</strong> and affect <strong>all queries on this page</strong> until removed.",
  "help.footnote": "* Search and sorting are local (client-side) in both <strong>Names</strong> and <strong>Values</strong> tables.",

  // Shortcut Keys
  "shortcuts.title": "Shortcut keys",
  "shortcuts.query": "Query",
  "shortcuts.run": "Run",
  "shortcuts.multiLine": "Multi-line queries",
  "shortcuts.prevCommand": "Previous command from the Query history",
  "shortcuts.nextCommand": "Next command from the Query history",
  "shortcuts.quickAutocomplete": "Show quick autocomplete tips",
  "shortcuts.graph": "Graph",
  "shortcuts.zoomIn": "Zoom in",
  "shortcuts.zoomOut": "Zoom out",
  "shortcuts.moveGraph": "Move the graph left/right",
  "shortcuts.openLegendMenu": "Open the legend item menu",
  "shortcuts.toggleSeries": "Hide or show this series",
  "shortcuts.focusSeries": "Show only this series or show all series",

  // Group Logs Stats
  "groupLogs.totalLogsReturned": "Total logs returned:",
  "groupLogs.totalGroups": "Total groups:",
  "groupLogs.collapseAll": "Collapse All",
  "groupLogs.expandAll": "Expand All",

  // Legend Visibility
  "legend.hideSeries": "Hide this series",
  "legend.showSeries": "Show this series",
  "legend.showAllSeries": "Show all series",
  "legend.showOnlySeries": "Show only this series",

  // Copy toast
  "common.valueCopied": "{value} has been copied",
  "common.queryCopied": "Query has been copied",

  // Language
  "lang.switch": "Language",
  "lang.en": "English",
  "lang.zh": "中文",
} as const;

export type TranslationKeys = keyof typeof en;
export default en;
