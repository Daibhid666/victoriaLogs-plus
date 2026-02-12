import { useState, useCallback, useRef } from "preact/hooks";
import { useAppState } from "../../../state/common/StateContext";
import { LogsFiledValues } from "../../../api/types";
import { useTenant } from "../../../hooks/useTenant";

interface FetchOptions {
  start: number;
  end: number;
  field: string;
  query?: string;
  limit?: number;
}

export const useFetchQueryFieldValues = () => {
  const { serverUrl } = useAppState();
  const tenant = useTenant();

  const [fieldValues, setFieldValues] = useState<LogsFiledValues[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | string>("");
  const abortRef = useRef(new AbortController());

  const fetchFieldValues = useCallback(async (options: FetchOptions): Promise<void> => {
    abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        start: options.start.toString(),
        end: options.end.toString(),
        query: options.query || "*",
        field: options.field,
        limit: String(options.limit || 10),
      });

      const url = `${serverUrl}/select/logsql/field_values`;
      const response = await fetch(url, {
        method: "POST",
        headers: { ...tenant },
        body: params,
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        setError(`${response.status} ${response.statusText}: ${errorResponse}`);
        return;
      }

      const data: { values: LogsFiledValues[] } = await response.json();
      setFieldValues(data.values || []);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error(err);
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [serverUrl, tenant]);

  const clear = useCallback(() => {
    setFieldValues([]);
  }, []);

  return { fieldValues, loading, error, fetchFieldValues, clear };
};
