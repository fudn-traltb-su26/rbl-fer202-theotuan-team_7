# Week07 - Built-in Hooks Notes

| Hook | Used in project | Purpose |
| --- | --- | --- |
| `useContext` | `useCart`, `useTheme`, `Header`, `DishCard`, `CartPage` | Share cart and theme state without prop drilling through `App -> Header -> DishCard`. |
| `useEffect` | `CartContext`, `ThemeContext`, `MenuPage` | Sync document title, persist theme to localStorage, simulate loading with cleanup. |
| `useRef` | `MenuPage` + `SearchBar` | Focus the search input after the mock menu load completes without causing re-render. |

## Cleanup Evidence

`MenuPage.jsx` starts a `setTimeout` to simulate loading menu data and returns `clearTimeout(timer)` from the effect. This prevents stale timers from updating state after the component unmounts or the filtered list changes quickly.

## Context Evidence

`Header.jsx` reads `totalItems` from `useCart()` and `DishCard.jsx` calls `addToCart()` from `useCart()`. The cart count no longer travels through props from `App.jsx`.
