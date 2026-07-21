# Week09 - Custom Hooks Refactor

| Hook | File | Used in | Purpose |
| --- | --- | --- | --- |
| `useFetch(url, params)` | `src/hooks/useFetch.js` | `App.jsx`, `MenuPage.jsx` | Shared API fetch logic with loading, error and refetch. |
| `useDebounce(value, delay)` | `src/hooks/useDebounce.js` | `MenuPage.jsx` | Waits 400ms after search input stops changing before API params update. |
| `useLocalStorage(key, initialValue)` | `src/hooks/useLocalStorage.js` | `DishCard.jsx` | Persists wishlist dish ids after reload. |

## Before / After

Before Week09, `App.jsx` and `MenuPage.jsx` used page-level `useEffect` logic for data loading and mock loading state. After Week09, API fetching is centralized in `useFetch`, search delay is isolated in `useDebounce`, and wishlist persistence is isolated in `useLocalStorage`.

## Rules of Hooks Check

- Hooks are called at the top level of React components or custom hooks.
- No hook is called inside loops, conditions, or ordinary event handlers.
- Custom hook names start with `use`.
