import { useEffect, useState } from 'react';

const DELAY = 500;


export default function useDebounce<T>(value: T, delay = DELAY): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// from https://usehooks-ts.com
