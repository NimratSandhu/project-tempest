
from flask import Blueprint, jsonify, request
import datetime
from app.models import Offer, Promo

api_bp = Blueprint('api', __name__)


@api_bp.route("/offers", methods=["POST"])
def create_offer():
    data = request.json
    print("Request received", data)
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
            restaurant=data.get("restaurant")
        )
        offer.save()
        return (
            jsonify(
                {
                    "Message": f"Created offer '{offer.description}' for restaurant '{offer.restaurant}'",
                    "offer_id": str(offer.id),
                }
            ),
            201,
        )
    except Exception as e:
        return jsonify({"Error": f"Failed to create offer: {str(e)}"}), 400


@api_bp.route("/promos", methods=["POST"])
def create_promo():
    data = request.json
    print("Request received", data)

    try:
        promo_description = data.get("description")
        day_of_week = data.get("day_of_week")
        active_status = data.get("active", True)
        restaurant = data.get("restaurant")

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
                    "Message": f"Created promo '{promo.description}' for restaurant '{promo.restaurant}' on {promo.day_of_week}",
                    "promo_id": str(promo.id),
                }
            ),
            201,
        )
    except Exception as e:
        return jsonify({"Error": f"Failed to create promo: {str(e)}"}), 400


@api_bp.route("/offers", methods=["GET"])
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
                "restaurant_name": offer.restaurant,
            }
        )

    return jsonify(offers_list), 200


@api_bp.route("/promos", methods=["GET"])
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
                "restaurant": promo.restaurant,
            }
        )

    return jsonify(promos_list), 200

