import { useState, useCallback, useRef } from "preact/hooks";
import { useAppState } from "../../../state/common/StateContext";
import { LogsFiledValues } from "../../../api/types";
import { useTenant } from "../../../hooks/useTenant";

interface FetchOptions {
  start: number;
  end: number;
  query?: string;
}

const NOISE_FIELDS = ["_msg", "_time", "_stream", "_stream_id"];

export const useFetchQueryFieldNames = () => {
  const { serverUrl } = useAppState();
  const tenant = useTenant();

  const [fieldNames, setFieldNames] = useState<LogsFiledValues[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | string>("");
  const abortRef = useRef(new AbortController());

  const fetchFieldNames = useCallback(async (options: FetchOptions): Promise<void> => {
    abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        start: options.start.toString(),
        end: options.end.toString(),
        query: options.query || "*",
      });

      const url = `${serverUrl}/select/logsql/field_names`;
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
      const filtered = (data.values || []).filter(v => !NOISE_FIELDS.includes(v.value));
      setFieldNames(filtered);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error(err);
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [serverUrl, tenant]);

  return { fieldNames, loading, error, fetchFieldNames };
};
