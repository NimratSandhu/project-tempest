from mongoengine import (
    Document,
    StringField,
    IntField,
    BooleanField,
    ReferenceField,
    DateField,
)


class Restaurant(Document):
    name = StringField(required=True)


class Promo(Document):
    # Long term, reccuring, ie weekly promo
    description = StringField(required=True)
    active = BooleanField(required=True)
    restuarant = ReferenceField(Restaurant)
    day_of_week = StringField(
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
    active = BooleanField(required=True)
    expiration_date = DateField(required=True)
    restuarant = ReferenceField(Restaurant)
