import { useEffect, useState, useRef, useCallback } from "preact/compat";
import dayjs from "dayjs";
import { ContextData, ContextType } from "./types";
import { FunctionIcon, LabelIcon, MetricIcon, ValueIcon } from "../../../Main/Icons";
import { AutocompleteOptions } from "../../../Main/Autocomplete/Autocomplete";
import { useAppState } from "../../../../state/common/StateContext";
import { useTimeState } from "../../../../state/time/TimeStateContext";
import { AUTOCOMPLETE_LIMITS } from "../../../../constants/queryAutocomplete";
import { LogsFiledValues } from "../../../../api/types";
import { useLogsDispatch, useLogsState } from "../../../../state/logsPanel/LogsStateContext";
import { useTenant } from "../../../../hooks/useTenant";
import { generateQuery } from "./utils";

type FetchDataArgs = {
  urlSuffix: string;
  setter: (value: LogsFiledValues[]) => void;
  params?: URLSearchParams;
}

const sanitizeAutocompleteQuery = (query?: string): string => {
  if (!query) return "*";
  const trimmed = query.trim();
  if (!trimmed) return "*";
  // Autocomplete requests can be built from an incomplete expression, e.g. `a:* AND`
  // which backend rejects. Remove trailing standalone logical operator.
  const safeQuery = trimmed.replace(/\s+(AND|OR|NOT)\s*$/i, "").trim();
  return safeQuery || "*";
};

const getRequestVariants = (params?: URLSearchParams): URLSearchParams[] => {
  const base = new URLSearchParams(params);
  base.set("query", sanitizeAutocompleteQuery(base.get("query") || undefined));

  const fallback = new URLSearchParams(base);
  fallback.set("query", "*");

  if (fallback.toString() === base.toString()) {
    return [base];
  }

  return [base, fallback];
};

const icons = {
  [ContextType.FilterName]: <MetricIcon/>,
  [ContextType.FilterUnknown]: <MetricIcon/>,
  [ContextType.FilterValue]: <ValueIcon/>,
  [ContextType.PipeName]: <FunctionIcon/>,
  [ContextType.PipeValue]: <LabelIcon/>,
  [ContextType.Unknown]: <ValueIcon/>,
  [ContextType.FilterOrPipeName]: <FunctionIcon/>
};

export const useFetchLogsQLOptions = (contextData?: ContextData) => {
  const { serverUrl } = useAppState();
  const { period: { start, end } } = useTimeState();
  const { autocompleteCache } = useLogsState();
  const dispatch = useLogsDispatch();
  const tenant = useTenant();

  const [loading, setLoading] = useState(false);

  const [fieldNames, setFieldNames] = useState<AutocompleteOptions[]>([]);
  const [fieldValues, setFieldValues] = useState<AutocompleteOptions[]>([]);

  const abortControllerRef = useRef(new AbortController());

  const getQueryParams = useCallback((params?: Record<string, string>) => {
    const startDay = dayjs(start * 1000).startOf("day").valueOf() / 1000;
    const endDay = dayjs(end * 1000).endOf("day").valueOf() / 1000;

    return new URLSearchParams({
      ...(params || {}),
      limit: `${AUTOCOMPLETE_LIMITS.queryLimit}`,
      start: `${startDay}`,
      end: `${endDay}`
    });
  }, [start, end]);

  const processData = (values: LogsFiledValues[], type: ContextType): AutocompleteOptions[] => {
    return values.map(v => ({
      value: v.value,
      type: `${type}`,
      icon: icons[type]
    }));
  };

  const fetchData = async ({ urlSuffix, setter, params }: FetchDataArgs) => {
    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;
    const tenantString = new URLSearchParams(tenant).toString();
    const requestVariants = getRequestVariants(params);
    const originalKey = `${urlSuffix}?${requestVariants[0].toString()}&${tenantString}`;

    setLoading(true);
    try {
      for (const requestParams of requestVariants) {
        const key = `${urlSuffix}?${requestParams.toString()}&${tenantString}`;

        const cachedData = autocompleteCache.get(key);
        if (cachedData) {
          setter(cachedData);
          if (key !== originalKey) {
            dispatch({ type: "SET_AUTOCOMPLETE_CACHE", payload: { key: originalKey, value: cachedData } });
          }
          setLoading(false);
          return;
        }

        const response = await fetch(`${serverUrl}/select/logsql/${urlSuffix}`, {
          signal,
          method: "POST",
          headers: { ...tenant },
          body: requestParams,
        });

        if (!response.ok) {
          continue;
        }

        const data = await response.json();
        const value = (data?.values || []) as LogsFiledValues[];
        setter(value || []);
        dispatch({ type: "SET_AUTOCOMPLETE_CACHE", payload: { key, value } });
        if (key !== originalKey) {
          dispatch({ type: "SET_AUTOCOMPLETE_CACHE", payload: { key: originalKey, value } });
        }
        setLoading(false);
        return;
      }

      setter([]);
      dispatch({ type: "SET_AUTOCOMPLETE_CACHE", payload: { key: originalKey, value: [] } });
      setLoading(false);
    } catch (e) {
      if (e instanceof Error && e.name !== "AbortError") {
        dispatch({ type: "SET_AUTOCOMPLETE_CACHE", payload: { key: originalKey, value: [] } });
        setLoading(false);
        console.error(e);
      }
    }
  };

  // fetch field names
  useEffect(() => {
    const validContexts = [ContextType.FilterName, ContextType.FilterUnknown, ContextType.FilterOrPipeName, ContextType.Unknown];
    const isInvalidContext = !validContexts.includes(contextData?.contextType || ContextType.Unknown);
    if (!serverUrl || isInvalidContext) {
      return;
    }

    setFieldNames([]);

    const setter = (filterNames: LogsFiledValues[]) => {
      setFieldNames(processData(filterNames, ContextType.FilterName));
    };

    fetchData({
      urlSuffix: "field_names",
      setter: setter,
      params: getQueryParams({ query: contextData?.queryBeforeIncompleteFilter || "*" })
    });

    return () => abortControllerRef.current?.abort();
  }, [serverUrl, contextData]);

  // fetch field values
  useEffect(() => {
    const isInvalidContext = contextData?.contextType !== ContextType.FilterValue;
    if (!serverUrl || isInvalidContext || !contextData?.filterName) {
      return;
    }

    setFieldValues([]);

    const setter = (filterValues: LogsFiledValues[]) => {
      setFieldValues(processData(filterValues, ContextType.FilterValue));
    };

    fetchData({
      urlSuffix: "field_values",
      setter: setter,
      params: getQueryParams({ query: generateQuery(contextData), field: contextData.filterName })
    });

    return () => abortControllerRef.current?.abort();
  }, [serverUrl, contextData]);

  return {
    fieldNames,
    fieldValues,
    loading,
  };
};
