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

  // Language
  "lang.switch": "语言",
  "lang.en": "English",
  "lang.zh": "中文",
};

export default zh;
