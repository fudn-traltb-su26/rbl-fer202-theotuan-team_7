# Week05 - React Bootstrap Responsive Test

## Bootstrap Components Used

| Area | React-Bootstrap components | Responsive behavior |
| --- | --- | --- |
| Header | `Navbar`, `Nav`, `Badge`, `Container` | `expand="md"` collapses nav links into a hamburger menu on mobile. |
| Banner | `Container`, `Button` | Text stays centered and constrained by `.app-hero-copy`. |
| Category filter | `Row`, `Col`, `Card`, `Button` | `xs={2}`, `sm={3}`, `md={5}` keeps category cards compact. |
| Dish cards | `Card`, `Card.Img`, `Badge`, `Button`, `Stack` | Cards use fixed image aspect ratio and equal height columns. |
| Dish grid | `Row`, `Col`, `Alert` | `xs={2}`, `sm={3}`, `md={4}`, `lg={5}` matches the required breakpoints. |

## Screenshot Checklist

Save screenshots in this folder with these names:

- `375-mobile.png`: iPhone SE width, navbar collapsed, dish grid has 2 columns, no horizontal overflow.
- `768-tablet.png`: tablet width, grid has 3 to 4 columns, cards remain equal height.
- `1280-desktop.png`: desktop width, grid has 5 columns, header and category filter remain aligned.

## Verification Commands

```powershell
cd Week01
npm run lint
npm run build
npm run dev
```
