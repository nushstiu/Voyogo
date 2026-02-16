import { useState, useEffect, useCallback } from 'react';

interface GuestSelection {
  destination?: string;
  tourId?: string;
  tourName?: string;
  duration?: string;
}

const STORAGE_KEY = 'voyogo_guest_selection';

export function useGuestSelection() {
  const [selection, setSelection] = useState<GuestSelection | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (selection) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    }
  }, [selection]);

  const saveSelection = useCallback((data: GuestSelection) => {
    setSelection(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const clearSelection = useCallback(() => {
    setSelection(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { selection, saveSelection, clearSelection };
}
