# Project Tempest

Project Tempest is a web application that allows users to discover deals, coupons, and offers at restaurants near them. It provides both an API backend and an admin frontend to manage offers, promos, and users.

## Features
- Add and deactivate restaurant offers
- Add and deactivate recurring promos
- Manage users (create and deactivate)
- Admin page with simple UI for managing data

## Tech Stack
- Backend: Python, Flask, MongoEngine (MongoDB)
- Frontend: HTML, CSS, JavaScript
- Deployment: Flask development server (can be extended)

## Getting Started
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/project-tempest.git
   cd project-tempest
   ```
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Run the application:
   ```
   flask run
   ```
4. Visit `http://127.0.0.1:5000/admin` to access the admin panel.

## API Endpoints
- `POST /offers` – Add a new offer
- `POST /promos` – Add a new promo
- `POST /users` – Create a new user
- `POST /deactivate_offer` – Deactivate an offer by ID
- `POST /deactivate_promo` – Deactivate a promo by ID
- `POST /deactivate_user` – Deactivate a user by ID
- `GET /offers` – List offers
- `GET /promos` – List promos

## Frontend
The admin page provides forms to:
- Add offers with restaurant, description, expiration date, and active flag
- Add promos with restaurant, description, day of week, and active flag
- Add users with username, country, state, and active status
- Deactivate existing offers, promos, and users by ID

## Future Improvements
- Add authentication for admin actions
- Geolocation-based search for end users
- Mobile-friendly UI
- Public-facing page for browsing nearby deals