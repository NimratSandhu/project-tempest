from flask import Flask, request, jsonify
from mongoengine import connect
from config import Config
from frenchfries.models import Offer, Promo, Restaurant
import datetime


app = Flask(__name__)
app.config.from_object(Config)

connect(**app.config["MONGODB_SETTINGS"])


@app.route("/offers", methods=["POST"])
def create_offer():
    data = request.json
    print("Request received", data)

    # 1. Get or Create Restaurant
    restaurant_name = data.get(
        "restaurant"
    )  # Assuming 'restaurant_name' is sent in the request
    if not restaurant_name:
        return jsonify({"Error": "Restaurant name is required."}), 400

    # Try to find an existing restaurant by name
    # If not found, create a new one.
    try:
        restaurant, created = Restaurant.objects.get_or_create(name=restaurant_name)
        if created:
            print(f"Created new restaurant: {restaurant.name}")
        else:
            print(f"Linked existing restaurant: {restaurant.name}")
    except Exception as e:
        return jsonify({"Error": f"Failed to get or create restaurant: {str(e)}"}), 500

    # Create the Offer
    try:
        expiration_date_str = data.get("expiration_date")
        if not expiration_date_str:
            return jsonify({"Error": "Expiration date is required."}), 400

        expiration_date = datetime.datetime.strptime(
            expiration_date_str, "%Y-%m-%d"
        ).date()

        offer = Offer(
            description=data["description"],
            active=data.get("active", True),
            expiration_date=expiration_date,
            restaurant=restaurant,
        )
        offer.save()
        return (
            jsonify(
                {
                    "Message": f"Created offer '{offer.description}' for restaurant '{offer.restaurant.name}'",
                    "offer_id": str(offer.id),
                }
            ),
            201,
        )
    except Exception as e:
        return jsonify({"Error": f"Failed to create offer: {str(e)}"}), 400


@app.route("/promos", methods=["POST"])
def create_promo():
    data = request.json
    print("Request received", data)

    # 1. Get or Create Restaurant
    restaurant_name = data.get("restaurant_name")
    if not restaurant_name:
        return jsonify({"Error": "Restaurant name is required."}), 400

    try:
        restaurant, created = Restaurant.objects.get_or_create(name=restaurant_name)
        if created:
            print(f"Created new restaurant: {restaurant.name}")
        else:
            print(f"Linked existing restaurant: {restaurant.name}")
    except Exception as e:
        return jsonify({"Error": f"Failed to get or create restaurant: {str(e)}"}), 500

    # 2. Validate and Create the Promo
    try:
        promo_description = data.get("description")
        day_of_week = data.get("day_of_week")
        active_status = data.get("active", True)

        if not promo_description:
            return jsonify({"Error": "Promo description is required."}), 400
        if not day_of_week:
            return jsonify({"Error": "Day of week is required."}), 400
        promo = Promo(
            description=promo_description,
            active=active_status,
            restaurant=restaurant,
            day_of_week=day_of_week,
        )
        promo.save()
        return (
            jsonify(
                {
                    "Message": f"Created promo '{promo.description}' for restaurant '{promo.restaurant.name}' on {promo.day_of_week}",
                    "promo_id": str(promo.id),
                }
            ),
            201,
        )
    except Exception as e:
        return jsonify({"Error": f"Failed to create promo: {str(e)}"}), 400


@app.route("/offers", methods=["GET"])
def list_offers():
    all_offers = Offer.objects()
    offers_list = []
    for offer in all_offers:
        offers_list.append(
            {
                "id": str(offer.id),  # Convert ObjectId to a string
                "description": offer.description,
                "active": offer.active,
                "expiration_date": offer.expiration_date.strftime("%Y-%m-%d"),
                "restaurant_name": offer.restaurant.name,
            }
        )

    return jsonify(offers_list), 200


@app.route("/promos", methods=["GET"])
def list_promos():
    all_promos = Promo.objects()
    promos_list = []
    for promo in all_promos:
        promos_list.append(
            {
                "id": str(promo.id),  # Convert ObjectId to a string
                "description": promo.description,
                "active": promo.active,
                "day_of_week": promo.day_of_week,
                "restaurant": promo.restaurant.name,
            }
        )


if __name__ == "__main__":
    app.run(debug=True)
