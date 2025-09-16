
from flask import Blueprint, jsonify, request
import datetime
from app.models import Offer, Promo, User

api_bp = Blueprint('api', __name__)

@api_bp.route("/users", methods=["POST"])
def create_user():
    data = request.json
    try:
        username = data.get("username")
        country = data.get("country")
        state = data.get("state")
        active_status = data.get("active", True)

        if not username or not country or not state:
            return jsonify({"Error": "username, country, and state are required."}), 400

        user = User(
            username=username,
            active=active_status,
            country=country,
            state=state
        )
        user.save()
        return jsonify({
            "Message": f"User '{user.username}' created successfully.",
            "user_id": str(user.id)
        }), 201
    except Exception as e:
        return jsonify({"Error": f"Failed to create user: {str(e)}"}), 400


@api_bp.route("/deactivate_user", methods=["POST"])
def deactivate_user():
    data = request.json
    user_id = data.get("id")
    if not user_id:
        return jsonify({"Error": "User ID is required."}), 400

    try:
        user = User.objects.get(id=user_id)
        user.active = False
        user.save()
        return jsonify({"Message": f"User '{user.username}' has been deactivated."}), 200
    except Exception as e:
        return jsonify({"Error": f"Failed to deactivate user: {str(e)}"}), 400


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
        if offer.active:
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

@api_bp.route("/deactivate_offer", methods=["POST"])
def deactivate_offer():
    data = request.json
    offer_id = data.get("id")
    if not offer_id:
        return jsonify({"Error": "Offer ID is required."}), 400

    try:
        offer = Offer.objects.get(id=offer_id)
        offer.active = False
        offer.save()
        return jsonify({"Message": f"Offer '{offer.description}' has been deactivated."}), 200
    except Exception as e:
        return jsonify({"Error": f"Failed to deactivate offer: {str(e)}"}), 400


@api_bp.route("/deactivate_promo", methods=["POST"])
def deactivate_promo():
    data = request.json
    promo_id = data.get("id")
    if not promo_id:
        return jsonify({"Error": "Promo ID is required."}), 400

    try:
        promo = Promo.objects.get(id=promo_id)
        promo.active = False
        promo.save()
        return jsonify({"Message": f"Promo '{promo.description}' has been deactivated."}), 200
    except Exception as e:
        return jsonify({"Error": f"Failed to deactivate promo: {str(e)}"}), 400
