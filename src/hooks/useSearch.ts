import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';

export function useSearch<T>(
  items: T[],
  searchKeys: (keyof T)[],
  delay: number = 300
) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<T[]>(items);
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setSearchResults(items);
      return;
    }

    const results = items.filter(item =>
      searchKeys.some(key => {
        const value = item[key];
        return value && 
          String(value)
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase());
      })
    );

    setSearchResults(results);
  }, [debouncedSearchTerm, items, searchKeys]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults
  };
};