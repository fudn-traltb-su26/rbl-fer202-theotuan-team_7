# Week08 - API Endpoints

The project domain is TastyHub restaurant, so the app uses `dishes` instead of `books`.

| Method | URL | Request Body | Response | Description |
| --- | --- | --- | --- | --- |
| GET | `/dishes` | - | Array of dishes | Get all menu items. |
| GET | `/dishes/:id` | - | One dish object | Get detail data for one menu item. |
| POST | `/dishes` | Dish object without server id | Created dish object | Create a new menu item. |
| PUT | `/dishes/:id` | Full dish object | Updated dish object | Update an existing menu item. |
| DELETE | `/dishes/:id` | - | `{}` | Delete a menu item. |
| GET | `/categories` | - | Array of categories | Get all menu categories. |

## Run

```powershell
cd Week01
npm run server
```

Then open:

```text
http://localhost:3001/dishes
http://localhost:3001/categories
```
