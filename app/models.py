from mongoengine import (
    Document,
    StringField,
    BooleanField,
    DateField,
)


class Promo(Document):
    # Long term, reccuring, ie weekly promo
    description = StringField(required=True)
    active = BooleanField(required=True, default=True)
    restaurant = StringField(required=True)
    day_of_week = StringField(
        required=True,
        choices=[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ]
    )


class Offer(Document):
    # Short term, one time promo, expires
    description = StringField(required=True)
    active = BooleanField(required=True, default=True)
    expiration_date = DateField(required=True)
    restaurant = StringField(required=True)


# User model
class User(Document):
    username = StringField(required=True, unique=True)
    active = BooleanField(required=True, default=True)
    country = StringField(required=True)
    state = StringField(required=True)