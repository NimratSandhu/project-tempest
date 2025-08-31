## Tempest DB Steps

Installations
```bash
brew tap mongodb/brew
brew install mongosh
```

Launch DB
```bash
docker run -d -p 27017:27017 --name mongo mongo:latest
```

Launch app
```bash
python app.py
```

Send POST Request to add to db
```bash
curl -X POST http://127.0.0.1:5000/offers -H "Content-Type: application/json" -d '{"restaurant": "Nav’s Noodles","description": "Buy 1 Get 1 Free on all noodles", "active": true, "expiration_date": "2026-01-01"}'

curl -X POST http://127.0.0.1:5000/offers \
-H "Content-Type: application/json" \
-d '{"restaurant": "Taco Twist", "description": "Free chips & salsa with any burrito", "active": true, "expiration_date": "2025-12-15"}'

curl -X POST http://127.0.0.1:5000/offers \
-H "Content-Type: application/json" \
-d '{"restaurant": "Bella’s Bistro", "description": "20% off all pasta dishes", "active": true, "expiration_date": "2025-11-30"}'

curl -X POST http://127.0.0.1:5000/offers \
-H "Content-Type: application/json" \
-d '{"restaurant": "Burger Bay", "description": "Free fries with every double cheeseburger", "active": true, "expiration_date": "2026-02-10"}'

curl -X POST http://127.0.0.1:5000/offers \
-H "Content-Type: application/json" \
-d '{"restaurant": "Curry Corner", "description": "Buy 2 curries, get 1 naan free", "active": true, "expiration_date": "2025-12-25"}'

curl -X POST http://127.0.0.1:5000/offers \
-H "Content-Type: application/json" \
-d '{"restaurant": "Sushi Express", "description": "50% off all rolls after 8 PM", "active": true, "expiration_date": "2026-03-01"}'

```

Send GET Request to view items in db
```bash
curl -X GET http://127.0.0.1:5000/offers
```

To connect to the Mongo Db use
```bash
mongosh
```

