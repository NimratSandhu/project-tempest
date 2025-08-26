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
```

Send GET Request to view items in db
```bash
curl -X GET http://127.0.0.1:5000/offers
```

To connect to the Mongo Db use
```bash
mongosh
```

