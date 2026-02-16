import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseFiltersConfig {
  keys: string[];
  defaults?: Record<string, string>;
}

export function useFilters({ keys, defaults = {} }: UseFiltersConfig) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const result: Record<string, string> = {};
    keys.forEach((key) => {
      result[key] = searchParams.get(key) || defaults[key] || '';
    });
    return result;
  }, [searchParams, keys, defaults]);

  const setFilter = useCallback(
    (key: string, value: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value && value !== 'all' && value !== '') {
          next.set(key, value);
        } else {
          next.delete(key);
        }
        next.delete('page');
        return next;
      });
    },
    [setSearchParams]
  );

  const resetFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return { filters, setFilter, resetFilters };
}
