# Week03 - Props & Component Communication

## Main Data Flow

```text
App.jsx
  |-- categories={CATEGORIES}
  |     `-- HomePage / MenuPage
  |          `-- CategoryList
  |               `-- category card
  |
  |-- dishes={DISHES or featuredDishes}
  |     `-- HomePage / MenuPage
  |          `-- DishGrid
  |               `-- DishCard
  |
  `-- onAddToCart={handleAddToCart}
        `-- HomePage / MenuPage
             `-- DishGrid
                  `-- DishCard
                       `-- Button onClick={() => onAddToCart(dish)}
```

## Week03 Completion Notes

| Component | Props | Week03 requirement |
| --- | --- | --- |
| `DishCard` | `dish`, `onAddToCart` | Renders data from a reusable object and calls the parent callback. |
| `DishGrid` | `dishes`, `onAddToCart` | Maps the array from props, passes each item down, and shows an empty state. |
| `CategoryList` | `categories` | Maps categories from props instead of using hardcoded local data. |
| `SectionWrapper` | `title`, `subtitle`, `backgroundColor`, `children` | Reusable layout wrapper using `props.children`. |
| `HomePage` / `MenuPage` | `categories`, `dishes`, `onAddToCart` | Receives route-level props and forwards them to child components. |
| `App.jsx` | local data constants and callback | Owns `DISHES`, `CATEGORIES`, and `handleAddToCart`, then passes data down one way. |

## Verification

- Data is declared in `App.jsx`.
- `HomePage` and `MenuPage` receive data from `App.jsx`.
- `CategoryList`, `DishGrid`, and `DishCard` render from props.
- `SectionWrapper` wraps multiple sections and renders `children`.
- `docs/week03-dataflow.png` contains the required visual diagram.
