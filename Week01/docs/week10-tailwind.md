# Week10 - Bootstrap vs Tailwind

| Criteria | Bootstrap | Tailwind CSS |
| --- | --- | --- |
| Initial speed | Very fast because components are prebuilt | Fast after learning utility classes |
| Customization | Requires overriding component styles | Highly flexible from utility classes |
| JSX length | Usually shorter with React-Bootstrap components | Can become longer because styles live as classes |
| Design consistency | Strong defaults | Depends on team discipline |
| Bundle/CSS size | Ships framework CSS | Production CSS is usually small because unused utilities are removed |

## Recommendation

For this TastyHub project, Bootstrap is the safer main-branch choice because the app already uses React-Bootstrap components consistently. Tailwind is useful for a separate experiment branch when the team wants more custom visual control.

## Tailwind Branch Plan

1. Create `feature/tailwind`.
2. Install `tailwindcss @tailwindcss/vite`.
3. Migrate only `Banner.jsx` and `DishCard.jsx` away from React-Bootstrap in that branch.
4. Compare the UI at 375px, 768px and 1280px with the Bootstrap version.
