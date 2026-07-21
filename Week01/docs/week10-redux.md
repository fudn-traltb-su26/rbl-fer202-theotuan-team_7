# Week10 - Redux Toolkit Notes

## Context vs Redux

| Criteria | Context | Redux Toolkit |
| --- | --- | --- |
| Best use | Small shared state such as theme | App state with many actions and consumers |
| Debugging | Browser React DevTools only | Redux DevTools action timeline and state diff |
| Update logic | Often lives inside Provider components | Centralized reducers in slices |
| Re-render control | Consumers update when context value changes | Selectors read only the needed state |
| Boilerplate | Low for small apps | Slightly higher, reduced by RTK |

## Immer

`cartSlice.js` uses code like `existing.quantity += 1`. This does not violate the Week04 immutable update rule because Redux Toolkit uses Immer internally. Immer records the draft mutation and returns a new immutable state object.

## RTK Query Note

RTK Query could replace the Week09 `useFetch` + Axios pattern by generating cached query hooks, handling loading/error states, deduping requests, and invalidating cached data after mutations.
