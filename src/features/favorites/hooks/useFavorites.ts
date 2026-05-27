// Reusable hook that manages the favorites list.
//
// Patterns used (as taught in class):
//   1. Load on mount  — reads from storage when the hook first runs
//   2. Loading state  — isLoading is true until the initial read is done
//   3. Optimistic updates — state is updated immediately before awaiting storage
//   4. Save on change — every mutation persists the updated list to storage

import { useCallback, useEffect, useState } from "react"

import type { Favorite } from "#features/favorites/types"
import {
  getFavorites,
  saveFavorites,
} from "#features/favorites/storage/favoritesStorage"

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])

  // True while the initial load from storage is in progress.
  // Screens should show a loading indicator when this is true.
  const [isLoading, setIsLoading] = useState(true)

  // --- Load on mount ---
  // Runs once when the hook first mounts.
  // Reads the saved favorites from AsyncStorage and puts them in state.
  useEffect(() => {
    async function loadFavorites() {
      const saved = await getFavorites()
      setFavorites(saved)
      setIsLoading(false) // loading is done
    }

    void loadFavorites()
  }, []) // empty deps = runs only once, on mount

  // --- Add a favorite ---
  // Optimistic update: state changes right away.
  // Then we persist the new list to storage.
  const addFavorite = useCallback(async (favorite: Favorite) => {
    setFavorites((prev) => {
      const updated = [...prev, favorite]
      // Save the updated list to storage (fire-and-forget here)
      void saveFavorites(updated)
      return updated
    })
  }, [])

  // --- Remove a favorite ---
  // Filters out the item by id, then persists the new list.
  const removeFavorite = useCallback(async (id: string) => {
    setFavorites((prev) => {
      const updated = prev.filter((f) => f.id !== id)
      void saveFavorites(updated)
      return updated
    })
  }, [])

  // --- Toggle a favorite ---
  // Adds if not already saved, removes if it is.
  // Convenient for a single "heart" or "star" button.
  const toggleFavorite = useCallback(
    async (favorite: Favorite) => {
      const exists = favorites.some((f) => f.id === favorite.id)
      if (exists) {
        await removeFavorite(favorite.id)
      } else {
        await addFavorite(favorite)
      }
    },
    [favorites, addFavorite, removeFavorite],
  )

  // --- Helper to check if a city is already saved ---
  const isFavorite = useCallback(
    (id: string): boolean => {
      return favorites.some((f) => f.id === id)
    },
    [favorites],
  )

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  }
}
