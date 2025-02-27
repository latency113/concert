# API Endpoints Summary

## Authentication Clear

| Endpoint                            | Method | Description        | Body                                                 |
|-------------------------------------|--------|--------------------|------------------------------------------------------|
| `/api/login`                        | POST   | Login user         | `{ "email": "test@test.com", "password": "1234" }`         |
| `/api/register`                     | POST   | Register user      | `{ "email": "test@test.com", "password": "1234" }`         |
| `/api/current-user`                 | GET    | Get current user   | None                                                 |
| `/api/current-admin`                | GET    | Get current admin  | None                                                 |

## Concert Management Clear

| Endpoint                            | Method | Description                | Body                                                                                  |
|-------------------------------------|--------|----------------------------|---------------------------------------------------------------------------------------|
| `/api/concert`                      | POST   | Create a concert           | `{ "concertName": "Live Concert", "venue": "Stadium", "concertDate": "2024-12-31T20:00:00Z", "totalSeats": 5000, "availableSeats": 5000,}` |
| `/api/concert`                      | GET    | Get all concerts           | None                                                                                  |
| `/api/concert/:id`                  | GET    | Get concert by ID          | None                                                                                  |
| `/api/concert/:id`                  | PUT    | Update concert by ID       | `{ "concertName": "Updated Concert", "venue": "Updated Venue", "concertDate": "2025-01-01T20:00:00Z", "totalSeats": 6000,}` |
| `/api/concert/:id`                  | DELETE | Delete concert by ID       | None                                                                                  |
| `/api/concert/:id/bookings`         | GET    | Get bookings for concert   | None                                                                                  |



## Booking Management

| Endpoint                            | Method | Description            | Body                        |
|-------------------------------------|--------|------------------------|-----------------------------|
| `/api/booking`                     | GET    | Get all booking         | None                        |
| `/api/booking`                     | POST   | Create booking          | `{ "userId": 1, "concertId": 1, "totalTickets": 2, "totalAmount": 200, "status": "Pending" }` |
| `/api/booking/user/:id`            | GET    | Get booking by UserID   | None                        |
| `/api/booking/:id`                 | PUT    | Update booking by ID    | `{ "status": "Confirmed" }` |
| `/api/booking/:id`                 | DELETE | Delete booking by ID    | None                        |


## User Management Clear

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


