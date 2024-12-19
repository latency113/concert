# API Endpoints Summary

## Authentication

| Endpoint                            | Method | Description        | Body                                                 |
|-------------------------------------|--------|--------------------|------------------------------------------------------|
| `/api/login`                        | POST   | Login user         | `{ "email": "test@test.com", "password": "1234" }`         |
| `/api/register`                     | POST   | Register user      | `{ "email": "test@test.com", "password": "1234" }`         |
| `/api/current-user`                 | GET    | Get current user   | None                                                 |
| `/api/current-admin`                | GET    | Get current admin  | None                                                 |

## Concert Management

| Endpoint                            | Method | Description                | Body                                                                                  |
|-------------------------------------|--------|----------------------------|---------------------------------------------------------------------------------------|
| `/api/concert`                      | POST   | Create a concert           | `{ "concertName": "Live Concert", "venue": "Stadium", "concertDate": "2024-12-31T20:00:00Z", "totalSeats": 5000, "availableSeats": 5000,}` |
| `/api/concert`                      | GET    | Get all concerts           | None                                                                                  |
| `/api/concert/:id`                  | GET    | Get concert by ID          | None                                                                                  |
| `/api/concert/:id`                  | PUT    | Update concert by ID       | `{ "concertName": "Updated Concert", "venue": "Updated Venue", "concertDate": "2025-01-01T20:00:00Z", "totalSeats": 6000,}` |
| `/api/concert/:id`                  | DELETE | Delete concert by ID       | None                                                                                  |
| `/api/concert/:id/bookings`         | GET    | Get bookings for concert   | None                                                                                  |

## Category

| Endpoint                            | Method | Description            | Body                        |
|-------------------------------------|--------|------------------------|-----------------------------|
| `/api/category`                     | POST   | Create category         | `{ "name": "Test1", "description": "Sample description" }` |
| `/api/category`                     | GET    | Get all categories      | None                        |
| `/api/category/:id`                 | GET    | Get category by ID      | None                        |
| `/api/category/:id`                 | PUT    | Update category by ID   | `{ "name": "Updated Name", "description": "Updated description" }` |
| `/api/category/:id`                 | DELETE | Delete category by ID   | None                        |

## Product

| Endpoint                            | Method | Description            | Body                                                                                  |
|-------------------------------------|--------|------------------------|---------------------------------------------------------------------------------------|
| `/api/product`                      | POST   | Create product          | `{ "title": "TEST", "description": "test", "price": 10000, "stock": 20, "categoryId": 2, "images": [] }` |
| `/api/product/:id`                  | GET    | Get product by ID       | None                                                                                  |
| `/api/product/:id`                  | PUT    | Update product by ID    | `{ "title": "Updated", "description": "Updated", "price": 12000, "stock": 15, "categoryId": 1, "images": []` |
| `/api/product/:id`                  | DELETE | Delete product by ID    | None                                                                                  |
| `/api/productby`                    | POST   | Get products by filters | `{ "sort": "price", "order": "asc", "limit": 2 }` or `{ "sort": "stock", "order": "desc", "limit": 2 }` |
| `/api/search/filters`               | POST   | Search with filters     | `{ "query": "polycat" }`, `{ "price": [500, 1000] }`, or `{ "category": [1, 2] }`        |

## User Management

| Endpoint                            | Method | Description               | Body                                                       |
|-------------------------------------|--------|---------------------------|------------------------------------------------------------|
| `/api/users`                        | GET    | Get all users             | None                                                       |
| `/api/user/:id`                     | GET    | Get user by ID            | None                                                       |
| `/api/user/:id`                     | PUT    | Update user               | `{ "fullName": "New Name", "email": "test@test.com", "phoneNumber": "123456789" }` |
| `/api/user/:id`                     | DELETE | Delete user               | None                                                       |
| `/api/change-status`                | POST   | Change user status        | `{ "id": 1, "enabled": false }`                            |
| `/api/change-role`                  | POST   | Change user role          | `{ "id": 1, "role": "user" }`                              |
| `/api/user/cart`                    | POST   | Add to cart               | `{ "cart": [{ "id": 1, "count": 2, "price": 100 }, { "id": 5, "count": 1, "price": 200 }] }` |
| `/api/user/cart`                    | GET    | Get cart                  | None                                                       |
| `/api/user/cart`                    | DELETE | Clear cart                | None                                                       |
| `/api/user/order`                   | POST   | Place an order            | `{ "items": [{ "productId": 1, "quantity": 2 }] }`         |
| `/api/user/order`                   | GET    | Get user orders           | None                                                       |

## Admin

| Endpoint                            | Method | Description               | Body                              |
|-------------------------------------|--------|---------------------------|-----------------------------------|
| `/api/user/order`                   | PUT    | Update order status        | `{ "orderId": 35, "orderStatus": "Completed" }` |
| `/api/admin/orders`                 | GET    | Get all orders             | None                              |
| `/api/admin/user-stats`             | GET    | Get user statistics        | None                              |

