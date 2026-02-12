import type { TranslationKeys } from "./en";

const zh: Record<TranslationKeys, string> = {
  // Common
  "common.cancel": "取消",
  "common.apply": "应用",
  "common.settings": "设置",
  "common.controls": "控制面板",

  // Navigation
  "nav.query": "查询",
  "nav.overview": "概览",

  // Query Page Header
  "query.logQuery": "日志查询",
  "query.autocomplete": "自动补全",
  "query.langDocs": "查询语言文档",
  "query.documentation": "文档",
  "query.history": "查询历史",
  "query.execute": "执行查询",
  "query.cancel": "取消查询",
  "query.logLimits": "日志限制",

  // Query History
  "history.sessionHistory": "会话历史",
  "history.savedHistory": "已保存历史",
  "history.favoriteQueries": "收藏查询",
  "history.title": "查询历史",
  "history.clearHistory": "清除历史",
  "history.executeQuery": "执行查询",
  "history.copyQuery": "复制查询",
  "history.addFavorite": "添加收藏",
  "history.removeFavorite": "取消收藏",
  "history.copied": "查询已复制",
  "history.emptyFavorites": "收藏为空。\n请标记一个查询为收藏。",
  "history.emptyHistory": "查询历史为空。\n请先执行一次查询。",
  "history.queryN": "查询",

  // Group View Settings
  "group.title": "分组视图设置",
  "group.groupByField": "分组字段",
  "group.displayFields": "显示字段",
  "group.dateFormat": "日期格式",
  "group.singleLineMessage": "单行消息",
  "group.compactGroupHeader": "紧凑分组头",
  "group.disableHoverEffects": "禁用悬停效果",
  "group.resetGrouping": "重置分组",
  "group.clearFields": "清除字段",
  "group.resetFormat": "重置格式",
  "group.selectGroupBy": "选择一个字段来分组日志（默认：{default}）。",
  "group.selectDisplayFields": "选择要显示的字段以替代消息（默认：{default}）。",
  "group.dateFormatInfo": "设置日期格式（例如 YYYY-MM-DD HH:mm:ss）。详细信息请参阅",
  "group.dateFormatLink": "此文档",
  "group.currentDateFormat": "当前日期格式：",
  "group.singleLineInfo": "将消息显示为单行，超出可用空间时以省略号截断。",
  "group.compactGroupHeaderInfo": "将分组头显示为一行，额外字段用 \"+N 更多\" 徽章标记。",
  "group.disableHoverInfo": "禁用悬停高亮以提高大数据集的性能。",
  "group.groupedBy": "分组依据",
  "group.displayFieldsCount": "显示字段：",
  "group.singleLineEnabled": "已启用单行文本",
  "group.compactHeaderEnabled": "已启用紧凑分组头",
  "group.dateFormatLabel": "日期格式：",
  "group.saveToServer": "保存到服务器",
  "group.loadFromServer": "从服务器加载",
  "group.savedSuccess": "设置已保存到服务器",
  "group.loadedSuccess": "设置已从服务器加载",
  "group.resetSuccess": "设置已重置",

  // Log Parsing
  "parsing.enableMarkdown": "启用 Markdown 解析",
  "parsing.markdownInfo": "切换此开关以启用或禁用日志条目的 Markdown 格式。启用后将解析日志文本为 Markdown。",
  "parsing.enableAnsi": "启用 ANSI 解析",
  "parsing.ansiInfo": "切换此开关以启用或禁用日志条目的 ANSI 转义序列解析。启用后将解释 ANSI 代码以呈现彩色日志输出。",

  // Global Settings
  "settings.title": "设置",
  "settings.timezone": "时区",
  "settings.queryTimeOverride": "查询时间覆盖",
  "settings.overrideTimeLabel": "使用查询 _time 过滤器覆盖时间选择器",
  "settings.themePreferences": "主题偏好",
  "settings.themeSystem": "跟随系统",
  "settings.themeLight": "浅色",
  "settings.themeDark": "深色",

  // Execution Controls
  "execution.refreshDashboard": "刷新仪表板",
  "execution.autoRefresh": "自动刷新",
  "execution.autoRefreshControl": "自动刷新控制",
  "execution.autoRefreshDuration": "自动刷新间隔",

  // Time Selector
  "time.range": "时间范围",
  "time.rangeControls": "时间范围控制",
  "time.from": "起始：",
  "time.to": "结束：",
  "time.switchToNow": "切换到当前时间",
  "time.dateFrom": "起始日期",
  "time.dateTo": "结束日期",
  "time.overrideWarning": "时间范围已被查询中的 `_time` 过滤器覆盖。",
  "time.removeTimeHint": "从查询中移除 `_time` 以使用手动选择。",
  "time.disableOverrideHint": "要在设置中禁用查询时间覆盖，请点击此处。",

  // Query Page Body
  "body.group": "分组",
  "body.table": "表格",
  "body.json": "JSON",
  "body.live": "实时",
  "body.downloadLogs": "下载日志",
  "body.showLogs": "显示日志",
  "body.hideLogs": "隐藏日志",
  "body.logsHidden": "日志已隐藏，更新已暂停。",
  "body.timeOverrideWarning": "时间范围已被查询中的 `_time` 过滤器覆盖。从查询中移除 `_time` 以使用手动选择。在设置中禁用查询时间覆盖。",

  // Empty
  "empty.noLogs": "未找到日志",

  // Footer
  "footer.createIssue": "提交问题",
  "footer.documentation": "文档",
  "footer.version": "版本：",

  // Logs Limit
  "limit.mustBePositive": "数字必须大于 0",
  "limit.maxLimit": "最大限制为 {max}",

  // Chart Options
  "chart.topHits": "热门命中",
  "chart.bars": "柱数",
  "chart.groupBy": "分组依据",
  "chart.noFieldsFound": "未找到字段",
  "chart.cumulative": "累积",
  "chart.statsView": "统计视图",
  "chart.stacked": "堆叠",
  "chart.showChart": "显示图表并恢复命中更新",
  "chart.hideChart": "隐藏图表并暂停命中更新",
  "chart.hitsOptions": "命中选项",

  // Chart Stats
  "chart.total": "总计：",
  "chart.hits": "条",
  "chart.duration": "耗时：",

  // Chart Messages
  "chart.hidden": "图表已隐藏，命中更新已暂停。",
  "chart.noLogsVolume": "无日志量数据\n当前查询和时间范围内无可用的日志量信息。",
  "chart.noTimestamp": "当前查询和时间范围内无可用的时间戳信息。",
  "chart.noValue": "当前查询和时间范围内无可用的值信息。",

  // Query Editor Tooltips
  "editor.newLine": "插入新行",
  "editor.executeQuery": "执行查询",
  "editor.toggleComment": "切换行注释",
  "editor.quickTip": "快捷提示：",

  // Select / Pagination
  "select.rows": "行",
  "select.rowsPerPage": "每页行数",
  "select.loading": "加载中...",
  "select.noOptions": "无可用选项",
  "select.search": "搜索",
  "select.all": "全部",

  // Additional Settings
  "additionalSettings.autocomplete": "自动补全",
  "additionalSettings.querySettings": "查询设置",

  // Common actions
  "common.copied": "已复制",
  "common.copy": "复制",
  "common.copyToClipboard": "复制到剪贴板",
  "common.loading": "加载中...",
  "common.search": "搜索",

  // Field Selector
  "fieldSelector.showSelector": "显示字段选择器",
  "fieldSelector.hideSelector": "隐藏字段选择器",
  "fieldSelector.fields": "字段",
  "fieldSelector.filterFields": "筛选字段",
  "fieldSelector.unpinField": "取消置顶",
  "fieldSelector.pinToTop": "置顶",
  "fieldSelector.noValues": "无值",
  "fieldSelector.noMatchingFields": "无匹配字段",
  "fieldSelector.noFieldsAvailable": "无可用字段",
  "fieldSelector.clickToApply": "点击应用：{field}:=\"{value}\"",
  "fieldSelector.addFilter": "添加过滤：{field}:=\"{value}\"",

  // Limit Confirm Modal
  "limitConfirm.title": "确认大量加载",
  "limitConfirm.aboutToLoad": "您即将加载 <b>{limit}</b> 条日志。",
  "limitConfirm.unlimitedLoad": "您即将加载<b>无限数量的</b>日志。",
  "limitConfirm.maySlowDown": "这可能会导致应用变慢或界面无响应。",
  "limitConfirm.areYouSure": "确定要继续吗？",
  "limitConfirm.downloadHint": "点击此处下载所有匹配的日志（无数量限制）。",
  "limitConfirm.dontShowAgain": "此标签页不再显示",
  "limitConfirm.loadLogs": "加载日志",

  // Filters Bar
  "filters.globalFilters": "全局过滤：",
  "filters.clearGlobalFilters": "清除全局过滤",
  "filters.previewFilters": "预览过滤：",
  "filters.focusTooltip": "聚焦：仅预览日志，不改变全局过滤。",
  "filters.streamFocusTooltip": "流聚焦：仅预览日志，不改变全局过滤。",
  "filters.includeAll": "全部包含",
  "filters.excludeAll": "全部排除",
  "filters.clearFilters": "清除过滤",
  "filters.previewInfo": "这些过滤仅影响预览日志。要将它们应用到总计、命中和字段/流，请使用<b>全部包含</b>或<b>全部排除</b>。",

  // Overview Logs
  "overview.query": "查询：",
  "overview.limit": "限制",
  "overview.copyQuery": "复制查询",
  "overview.openQuery": "打开查询",

  // Stream Context
  "context.errorMissing": "错误：缺少流 ID 或时间。",
  "context.logContext": "日志上下文",
  "context.showContext": "显示上下文",
  "context.openInNewPage": "在新页面打开",
  "context.wrapLines": "自动换行",
  "context.logsPerLoad": "每次加载日志数",
  "context.loadNewerLogs": "加载更新的日志",
  "context.loadOlderLogs": "加载更旧的日志",
  "context.noMoreLogsAfter": "没有更新的日志",
  "context.noMoreLogsBefore": "没有更旧的日志",

  // Group Logs
  "groupLogs.showField": "显示此字段以替代消息",
  "groupLogs.hideField": "隐藏此字段",
  "groupLogs.groupByField": "按此字段分组",
  "groupLogs.ungroupField": "取消此字段分组",
  "groupLogs.timestampMissing": "缺少时间戳",

  // Table
  "table.copyRow": "复制行",

  // Code Example
  "codeExample.copy": "复制",
  "codeExample.copied": "已复制",

  // JSON View
  "jsonView.copyJson": "复制 JSON",
  "jsonView.copiedJson": "已复制 JSON 到剪贴板",

  // Overview Table
  "overviewTable.search": "搜索",
  "overviewTable.searchTooltip": "仅过滤当前表格中的行，不会向服务器发送查询。",

  // Overview Fields
  "overviewFields.focus": "聚焦",
  "overviewFields.unfocus": "取消聚焦",
  "overviewFields.include": "包含",
  "overviewFields.exclude": "排除",
  "overviewFields.fieldNames": "字段名称",
  "overviewFields.streamFieldNames": "流字段名称",
  "overviewFields.fieldValues": "字段值：",
  "overviewFields.noFieldNamesFound": "未找到字段名称",
  "overviewFields.noValuesFound": "未找到值",
  "overviewFields.selectFieldName": "选择字段名称以查看值",
  "overviewFields.selectStreamFieldName": "选择流字段名称以查看值",
  "overviewFields.mode": "模式",
  "overviewFields.topN": "Top N",
  "overviewFields.bottomN": "Bottom N",
  "overviewFields.topDescription": "最常见的值（命中数最高）",
  "overviewFields.bottomDescription": "最不常见的值（命中数最低）",

  // Overview Columns
  "columns.fieldName": "字段名",
  "columns.fieldValue": "字段值",
  "columns.streamFieldName": "流字段名",
  "columns.streamFieldValue": "流字段值",
  "columns.hits": "命中数",
  "columns.coverage": "覆盖率 %",
  "columns.percentOfLogs": "日志占比 %",

  // Legend Menu
  "legend.copyName": "复制 {field} 名称",
  "legend.addToFilter": "添加 {field} 到过滤",
  "legend.excludeFromFilter": "从过滤排除 {field}",
  "legend.copyField": "复制",
  "legend.addFieldToFilter": "添加到过滤",
  "legend.excludeFieldFromFilter": "从过滤排除",

  // Download Logs
  "download.title": "下载日志",
  "download.fileName": "文件名",
  "download.description": "这将下载 {period} 内使用当前查询为租户 {tenant} 的所有日志。",
  "download.download": "下载",

  // Totals
  "totals.totalLogs": "日志总数",
  "totals.totalLogsDesc": "所选时间范围内的日志总数",
  "totals.logsPerSec": "日志/秒（平均）",
  "totals.logsPerSecDesc": "所选时间范围内每秒平均日志数",
  "totals.uniqueStreams": "唯一日志流",
  "totals.uniqueStreamsDesc": "所选时间范围内的日志流数量",
  "totals.prevTimeRange": "与前一时间范围相比的变化：",

  // Help
  "help.howItWorks": "工作原理",
  "help.modalTitle": "字段与流概览",
  "help.intro": "此视图帮助您发现<strong>高频</strong>和<strong>低频</strong>字段/流及其<strong>值</strong>，并快速过滤。",
  "help.namesTableTitle": "名称表",
  "help.namesTableDesc": "显示字段或流的<strong>名称</strong>以及每个名称的日志数量。",
  "help.docs": "文档：",
  "help.docFieldNames": "查询字段名称",
  "help.docStreamNames": "查询流字段名称",
  "help.columns": "列",
  "help.hitsCol": "<strong>命中数</strong> — 包含此名称的日志数量（API 结果）。",
  "help.coverageCol": "<strong>覆盖率 %</strong> — 占所有日志的百分比：<code>命中数 / 总数 × 100</code>。",
  "help.clickBehavior": "点击行为",
  "help.clickRowFocus": "点击行 → 选中名称并聚焦（添加蓝色过滤标记）。",
  "help.ctrlClickExclude": "<strong>{ctrlKey} + 点击</strong> → 立即应用<strong>排除</strong>。",
  "help.seeRowActions": "查看<strong>行操作</strong>了解更多选项。",
  "help.valuesTableTitle": "值表",
  "help.valuesTableDesc": "显示所选名称的 <strong>Top/Bottom N</strong> <strong>值</strong>以及每个值的日志数量。",
  "help.selectors": "选择器",
  "help.modeSelector": "<strong>模式</strong> — <code>Top</code> 或 <code>Bottom</code>。",
  "help.topNSelector": "<strong>Top N</strong> — 获取多少个值。这些控件直接改变查询和结果。",
  "help.valuesHitsCol": "<strong>命中数</strong> — 特定值的计数。",
  "help.valuesPercentCol": "<strong>日志占比 %</strong> — 占所有日志的百分比：<code>命中数 / 总数 × 100</code>。",
  "help.valuesClickRowFocus": "点击行 → 聚焦该值（添加蓝色过滤标记）。",
  "help.valuesSeeRowActions": "查看<strong>行操作</strong>。",
  "help.rowActionsTitle": "行操作",
  "help.focusAction": "<strong>聚焦</strong> — 添加<strong>蓝色过滤标记</strong>并更新<strong>预览日志</strong>。<strong>不会</strong>改变全局过滤。",
  "help.includeAction": "<strong>包含</strong> — 为所选项添加<strong>全局包含过滤</strong>（灰色标记）。",
  "help.excludeAction": "<strong>排除</strong> — 为所选项添加<strong>全局排除过滤</strong>（灰色标记）。",
  "help.copyAction": "<strong>复制</strong> — 复制所选<strong>名称</strong>（来自<em>名称表</em>）或<strong>名称–值</strong>对（来自<em>值表</em>）。",
  "help.note": "<strong>注意：</strong><strong>包含/排除</strong>会作为<strong>灰色标记</strong>显示在<strong>全局过滤</strong>中，并影响<strong>此页面上的所有查询</strong>，直到移除。",
  "help.footnote": "* 搜索和排序在<strong>名称表</strong>和<strong>值表</strong>中均为本地（客户端）操作。",

  // Shortcut Keys
  "shortcuts.title": "快捷键",
  "shortcuts.query": "查询",
  "shortcuts.run": "运行",
  "shortcuts.multiLine": "多行查询",
  "shortcuts.prevCommand": "查询历史中的上一条命令",
  "shortcuts.nextCommand": "查询历史中的下一条命令",
  "shortcuts.quickAutocomplete": "显示快速自动补全提示",
  "shortcuts.graph": "图表",
  "shortcuts.zoomIn": "放大",
  "shortcuts.zoomOut": "缩小",
  "shortcuts.moveGraph": "左右移动图表",
  "shortcuts.openLegendMenu": "打开图例项菜单",
  "shortcuts.toggleSeries": "隐藏或显示此系列",
  "shortcuts.focusSeries": "仅显示此系列或显示所有系列",

  // Group Logs Stats
  "groupLogs.totalLogsReturned": "返回日志总数：",
  "groupLogs.totalGroups": "分组总数：",
  "groupLogs.collapseAll": "全部折叠",
  "groupLogs.expandAll": "全部展开",

  // Legend Visibility
  "legend.hideSeries": "隐藏此系列",
  "legend.showSeries": "显示此系列",
  "legend.showAllSeries": "显示所有系列",
  "legend.showOnlySeries": "仅显示此系列",

  // Copy toast
  "common.valueCopied": "{value} 已复制",
  "common.queryCopied": "查询已复制",

  // Language
  "lang.switch": "语言",
  "lang.en": "English",
  "lang.zh": "中文",
};

export default zh;
