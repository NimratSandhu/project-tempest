from flask import Flask, request, jsonify
from mongoengine import connect
from config import Config
from frenchfries.models import Deal


app = Flask(__name__)
app.config.from_object(Config)

connect(**app.config["MONGODB_SETTINGS"])

@app.route("/deals", methods=["POST"])
def create_deal():
    data = request.json
    print("Request received", data)
    deal = Deal(
        restuarant=data["restuarant"],
        description=data["description"],
        active=data["active"],
    )
    deal.save()
    return jsonify({"Message": f"Created deal {deal.description}"}), 200


@app.route("/deals", methods=["GET"])
def list_deals():
    print("get request received")
    deals = Deal.objects()
    return jsonify(
        [
            {
                "restuarant": d.restuarant,
                "description": d.description,
                "active": d.active,
            }
            for d in deals
        ]
    )

if __name__ == "__main__":
    app.run(debug=True)
