# Week10 - Performance Checklist

## Implemented

- Route components are loaded with `React.lazy`.
- Routes are wrapped with `Suspense`.
- Header prefetches menu, cart and admin page chunks on hover.
- Dish images use `loading="lazy"`.
- `vercel.json` rewrites all SPA refreshes to `index.html`.

## Screenshots To Capture

- `before-lighthouse.png`
- `after-lighthouse.png`
- `network-lazy-route.png`
- `network-lazy-images.png`

## Bundle Notes

The heaviest expected dependencies are React/React DOM, React-Bootstrap/Bootstrap, and Axios/Redux-related packages. A full visualizer report can be added with `rollup-plugin-visualizer` if the team wants a `stats.html` artifact.
