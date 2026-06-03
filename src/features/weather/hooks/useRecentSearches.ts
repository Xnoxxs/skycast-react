// Hook that manages the recent searches list.
//
// Patterns used (as taught in class):
//   1. Load on mount  — reads the saved list from storage when the hook first runs
//   2. Loading state  — isLoadingRecent is true until the initial read completes
//   3. Save on change — every call to addRecentSearch persists the updated list
//   4. Deduplication  — a city already in the list is moved to the top, not duplicated
//   5. Cap            — the list is trimmed to the 10 most recent entries

import { useCallback, useEffect, useState } from "react"

import {
  getRecentSearches,
  saveRecentSearches,
} from "#features/weather/storage/weatherPreferences"

// Maximum number of recent searches to keep in the list.
const MAX_RECENT_SEARCHES = 10

export function useRecentSearches() {
  // The ordered list of recently searched city names (most recent first)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // True while loading the initial list from storage on mount
  const [isLoadingRecent, setIsLoadingRecent] = useState(true)

  // --- Load on mount ---
  // Runs once when the hook first mounts.
  // Reads the persisted recent searches list from AsyncStorage.
  useEffect(() => {
    async function loadRecentSearches() {
      const saved = await getRecentSearches()
      setRecentSearches(saved)
      setIsLoadingRecent(false)
    }

    void loadRecentSearches()
  }, []) // empty deps = runs only once, on mount

  // --- Add a recent search ---
  // Prepends the city to the list, removes any existing duplicate (case-insensitive),
  // caps the list at MAX_RECENT_SEARCHES, then persists the updated list to storage.
  const addRecentSearch = useCallback(async (cityName: string) => {
    const trimmed = cityName.trim()

    if (trimmed === "") return

    setRecentSearches((prev) => {
      // Remove any existing entry for this city (case-insensitive) to avoid duplicates
      const filtered = prev.filter(
        (c) => c.toLowerCase() !== trimmed.toLowerCase(),
      )

      // Prepend the new city and cap the list length
      const updated = [trimmed, ...filtered].slice(0, MAX_RECENT_SEARCHES)

      // --- Save on change ---
      // Fire-and-forget: persist the new list without blocking the state update
      void saveRecentSearches(updated)

      return updated
    })
  }, [])

  return {
    recentSearches,
    isLoadingRecent,
    addRecentSearch,
  }
}
