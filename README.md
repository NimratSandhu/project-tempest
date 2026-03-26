# Project Tempest

A full-stack web application featuring a Django REST API backend and a React frontend with Vite.

## Project Structure

- `backend/` - Django REST API server
- `frontend/` - React application with Vite

## Prerequisites

- Python 3.8+ (Django 4.2 compatible)
- Node.js and npm

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run database migrations:
   ```bash
   python manage.py migrate
   ```

4. (Optional) Seed the database with sample data:
   ```bash
   python manage.py seed_data
   ```

5. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

The API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

The frontend will be available at http://localhost:5173

## Stopping the Servers

To stop the running servers, use these commands from the project root:

- Stop the backend (Django):
  ```bash
  pkill -f "manage.py runserver"
  ```

- Stop the frontend (Vite):
  ```bash
  pkill -f "vite"
  ```

Alternatively, you can press `Ctrl+C` in the respective terminal windows where the servers are running.

## API Endpoints

- GET `/api/restaurants/` - List all restaurants with menus and items
- GET `/api/restaurants/{id}/` - Get details for a specific restaurant
- GET `/api/deals/` - List active deals (with optional `expiring_soon=true` parameter)

## Features

- Restaurant listings with menus and pricing
- Deal system with expiration times
- Location-based restaurant discovery
- Responsive React frontend with Tailwind CSS